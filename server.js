import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

const SEND_CLOUD_API_URL = 'https://api.sendcloud.net/apiv2/mail/send';

app.use(express.static(path.join(__dirname, 'dist')));
const API_USER = process.env.API_USER;
const API_KEY = process.env.API_KEY;

const captchaStore = new Map();
const TOKEN_TTL = 5 * 60 * 1000;
const businessTokenStore = new Map();

const CAPTCHA_BG_WIDTH = 320;
const CAPTCHA_BG_HEIGHT = 160;

function cleanupExpired() {
  const now = Date.now();
  for (const [id, entry] of captchaStore) {
    if (now - entry.createdAt > TOKEN_TTL) captchaStore.delete(id);
  }
  for (const [token, entry] of businessTokenStore) {
    if (now - entry.createdAt > TOKEN_TTL) businessTokenStore.delete(token);
  }
}

setInterval(cleanupExpired, 60 * 1000);

let createPuzzle = null;
let puzzleAvailable = false;

try {
  const nodePuzzle = await import('node-puzzle');
  createPuzzle = nodePuzzle.default || nodePuzzle;
  puzzleAvailable = true;
} catch {
  console.warn('node-puzzle not available, using fallback captcha mode');
}

const captchaImagesDir = path.join(__dirname, 'public', 'captcha');

function getCaptchaImagePaths() {
  try {
    const files = fs.readdirSync(captchaImagesDir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    return files.map(f => path.join(captchaImagesDir, f));
  } catch {
    return [];
  }
}

app.get('/api/captcha/image', async (req, res) => {
  try {
    const captchaId = crypto.randomUUID();
    const imagePaths = getCaptchaImagePaths();

    if (puzzleAvailable && imagePaths.length > 0) {
      const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
      const imageBuffer = fs.readFileSync(randomImage);

      const result = await createPuzzle(imageBuffer, {
        width: 44,
        height: 44,
        bgWidth: CAPTCHA_BG_WIDTH,
        bgHeight: CAPTCHA_BG_HEIGHT,
        format: 'png',
        bgFormat: 'jpeg',
        bgQuality: 80,
      });

      const bgBase64 = `data:image/jpeg;base64,${result.bg.toString('base64')}`;
      const puzzleBase64 = `data:image/png;base64,${result.puzzle.toString('base64')}`;

      captchaStore.set(captchaId, {
        x: result.x,
        createdAt: Date.now(),
      });

      return res.json({
        success: true,
        data: {
          captchaId,
          bgUrl: bgBase64,
          puzzleUrl: puzzleBase64,
        },
      });
    }

    const targetX = Math.floor(Math.random() * (CAPTCHA_BG_WIDTH - 80)) + 40;
    captchaStore.set(captchaId, {
      x: targetX,
      createdAt: Date.now(),
    });

    const bgSvg = generateFallbackBg(targetX);
    const puzzleSvg = generateFallbackPuzzle();

    return res.json({
      success: true,
      data: {
        captchaId,
        bgUrl: `data:image/svg+xml;base64,${Buffer.from(bgSvg).toString('base64')}`,
        puzzleUrl: `data:image/svg+xml;base64,${Buffer.from(puzzleSvg).toString('base64')}`,
      },
    });
  } catch (error) {
    console.error('Captcha image generation error:', error);
    return res.status(500).json({
      success: false,
      message: '验证码生成失败',
    });
  }
});

function generateFallbackBg(targetX) {
  const hue = Math.floor(Math.random() * 360);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CAPTCHA_BG_WIDTH}" height="${CAPTCHA_BG_HEIGHT}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:hsl(${hue},70%,30%)"/>
        <stop offset="50%" style="stop-color:hsl(${(hue + 60) % 360},60%,40%)"/>
        <stop offset="100%" style="stop-color:hsl(${(hue + 120) % 360},50%,25%)"/>
      </linearGradient>
    </defs>
    <rect width="${CAPTCHA_BG_WIDTH}" height="${CAPTCHA_BG_HEIGHT}" fill="url(#bg)"/>
    <circle cx="${Math.random() * CAPTCHA_BG_WIDTH}" cy="${Math.random() * CAPTCHA_BG_HEIGHT}" r="30" fill="rgba(255,255,255,0.1)"/>
    <circle cx="${Math.random() * CAPTCHA_BG_WIDTH}" cy="${Math.random() * CAPTCHA_BG_HEIGHT}" r="20" fill="rgba(255,255,255,0.08)"/>
    <rect x="${targetX}" y="${CAPTCHA_BG_HEIGHT / 2 - 22}" width="44" height="44" rx="4" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
  </svg>`;
}

function generateFallbackPuzzle() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44">
    <rect width="44" height="44" rx="4" fill="rgba(255,255,255,0.6)" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>
  </svg>`;
}

app.post('/api/captcha/verify', async (req, res) => {
  try {
    const { captchaId, x, y, duration, trail } = req.body;

    if (!captchaId || x === undefined) {
      return res.status(400).json({
        success: false,
        message: '缺少验证参数',
      });
    }

    const stored = captchaStore.get(captchaId);
    if (!stored) {
      return res.status(400).json({
        success: false,
        message: '验证码已过期，请刷新重试',
      });
    }

    const tolerance = 10;
    const diff = Math.abs(x - stored.x);

    captchaStore.delete(captchaId);

    if (diff > tolerance) {
      return res.json({
        success: false,
        message: '验证失败，请重试',
      });
    }

    if (duration < 200) {
      return res.json({
        success: false,
        message: '验证失败，请重试',
      });
    }

    const businessToken = crypto.randomBytes(32).toString('hex');
    businessTokenStore.set(businessToken, {
      createdAt: Date.now(),
      used: false,
    });

    return res.json({
      success: true,
      token: businessToken,
    });
  } catch (error) {
    console.error('Captcha verify error:', error);
    return res.status(500).json({
      success: false,
      message: '验证服务异常',
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, captchaToken } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: '缺少必填字段：name, email, message',
      });
    }

    if (!captchaToken) {
      return res.status(400).json({
        success: false,
        message: '缺少验证令牌，请完成滑动验证',
      });
    }

    const tokenEntry = businessTokenStore.get(captchaToken);
    if (!tokenEntry) {
      return res.status(400).json({
        success: false,
        message: '验证令牌无效或已过期，请重新验证',
      });
    }

    if (tokenEntry.used) {
      businessTokenStore.delete(captchaToken);
      return res.status(400).json({
        success: false,
        message: '验证令牌已使用，请重新验证',
      });
    }

    if (Date.now() - tokenEntry.createdAt > TOKEN_TTL) {
      businessTokenStore.delete(captchaToken);
      return res.status(400).json({
        success: false,
        message: '验证令牌已过期，请重新验证',
      });
    }

    tokenEntry.used = true;
    businessTokenStore.delete(captchaToken);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '邮箱格式不正确',
      });
    }

    const params = new URLSearchParams({
      apiUser: API_USER,
      apiKey: API_KEY,
      to: req.body.to || 'noreply@example.com',
      from: email || 'noreply@example.com',
      fromName: name || 'Website Visitor',
      subject: `新的合作咨询：${name}`,
      html: `<p><strong>姓名：</strong>${name}</p>
             <p><strong>邮箱：</strong>${email}</p>
             <p><strong>留言内容：</strong></p>
             <p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    const response = await axios.post(SEND_CLOUD_API_URL, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      timeout: 30000,
    });

    if (response.data && response.data.result === true) {
      return res.json({
        success: true,
        message: '邮件发送成功',
      });
    } else {
      return res.json({
        success: false,
        message: response.data?.message || '邮件发送失败',
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data?.message || 'SendCloud API 错误',
      });
    }
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : '服务器内部错误',
    });
  }
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, html, from, fromName } = req.body;

  if (!to || !subject || !html) {
    return res.status(400).json({
      success: false,
      message: '缺少必填字段：to, subject, html',
    });
  }

  try {
    const params = new URLSearchParams({
      apiUser: API_USER,
      apiKey: API_KEY,
      to,
      from: from || 'noreply@example.com',
      fromName: fromName || 'Frank.dev',
      subject,
      html,
    });

    const response = await axios.post(SEND_CLOUD_API_URL, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      timeout: 30000,
    });

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json({
        success: false,
        message: error.response.data?.message || 'SendCloud API 错误',
      });
    } else {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : '服务器内部错误',
      });
    }
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Captcha mode: ${puzzleAvailable ? 'node-puzzle (full)' : 'fallback (SVG)'}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please kill the process on port ${PORT} first:\n  lsof -ti:${PORT} | xargs kill -9`);
    process.exit(1);
  } else {
    throw err;
  }
});
