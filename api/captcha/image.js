import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const CAPTCHA_BG_WIDTH = 320;
const CAPTCHA_BG_HEIGHT = 160;
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'captcha-secret-change-in-prod';

function signData(data) {
  const hmac = crypto.createHmac('sha256', TOKEN_SECRET);
  hmac.update(data);
  return hmac.digest('hex');
}

function createSignedToken(payload) {
  const data = JSON.stringify(payload);
  const signature = signData(data);
  return Buffer.from(`${signature}:${data}`).toString('base64');
}

function verifySignedToken(token, maxAge) {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const colonIndex = decoded.indexOf(':');
    if (colonIndex === -1) {
      console.log('[captcha/image] verifySignedToken: no colon found in decoded token');
      return null;
    }

    const signature = decoded.slice(0, colonIndex);
    const data = decoded.slice(colonIndex + 1);

    const expectedSignature = signData(data);
    if (signature !== expectedSignature) {
      console.log('[captcha/image] verifySignedToken: signature mismatch');
      return null;
    }

    const payload = JSON.parse(data);
    if (Date.now() - payload.createdAt > maxAge) {
      console.log('[captcha/image] verifySignedToken: token expired');
      return null;
    }

    return payload;
  } catch (e) {
    console.log('[captcha/image] verifySignedToken error:', e.message);
    return null;
  }
}

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

export default async function handler(req, res) {
  console.log('[captcha/image] request method:', req.method);

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const captchaId = crypto.randomUUID();
    let bgBase64, puzzleBase64, targetX;
    let usedPuzzleMode = false;

    let createPuzzle = null;
    try {
      const nodePuzzle = await import('node-puzzle');
      createPuzzle = nodePuzzle.default || nodePuzzle;
      console.log('[captcha/image] node-puzzle loaded successfully');
    } catch (e) {
      console.log('[captcha/image] node-puzzle import failed:', e.message);
    }

    const captchaDir = path.join(process.cwd(), 'public', 'captcha');
    console.log('[captcha/image] looking for images in:', captchaDir);
    let imagePaths = [];
    try {
      const files = fs.readdirSync(captchaDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
      imagePaths = files.map(f => path.join(captchaDir, f));
      console.log('[captcha/image] found images:', files);
    } catch (e) {
      console.log('[captcha/image] read captcha dir failed:', e.message);
    }

    if (createPuzzle && imagePaths.length > 0) {
      const randomImage = imagePaths[Math.floor(Math.random() * imagePaths.length)];
      console.log('[captcha/image] using image:', randomImage);
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

      bgBase64 = `data:image/jpeg;base64,${result.bg.toString('base64')}`;
      puzzleBase64 = `data:image/png;base64,${result.puzzle.toString('base64')}`;
      targetX = result.x;
      usedPuzzleMode = true;
      console.log('[captcha/image] node-puzzle mode, targetX:', targetX);
    } else {
      targetX = Math.floor(Math.random() * (CAPTCHA_BG_WIDTH - 80)) + 40;
      const bgSvg = generateFallbackBg(targetX);
      const puzzleSvg = generateFallbackPuzzle();
      bgBase64 = `data:image/svg+xml;base64,${Buffer.from(bgSvg).toString('base64')}`;
      puzzleBase64 = `data:image/svg+xml;base64,${Buffer.from(puzzleSvg).toString('base64')}`;
      console.log('[captcha/image] fallback SVG mode, targetX:', targetX);
    }

    const captchaToken = createSignedToken({
      captchaId,
      x: targetX,
      createdAt: Date.now(),
    });

    console.log('[captcha/image] generated captcha:', {
      captchaId,
      targetX,
      usedPuzzleMode,
      tokenLength: captchaToken.length,
      TOKEN_SECRET_prefix: TOKEN_SECRET.slice(0, 8) + '...',
    });

    return res.status(200).json({
      success: true,
      data: {
        captchaId,
        bgUrl: bgBase64,
        puzzleUrl: puzzleBase64,
        captchaToken,
      },
    });
  } catch (error) {
    console.error('[captcha/image] generation error:', error);
    return res.status(500).json({
      success: false,
      message: '验证码生成失败',
      debug: error instanceof Error ? error.message : String(error),
    });
  }
}
