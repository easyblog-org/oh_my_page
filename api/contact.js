import crypto from 'crypto';
import axios from 'axios';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'captcha-secret-change-in-prod';
const TOKEN_TTL = 5 * 60 * 1000;
const SEND_CLOUD_API_URL = 'https://api.sendcloud.net/apiv2/mail/send';
const API_USER = process.env.API_USER;
const API_KEY = process.env.API_KEY;

function signData(data) {
  const hmac = crypto.createHmac('sha256', TOKEN_SECRET);
  hmac.update(data);
  return hmac.digest('hex');
}

function verifySignedToken(token, maxAge) {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const colonIndex = decoded.indexOf(':');
    if (colonIndex === -1) return null;

    const signature = decoded.slice(0, colonIndex);
    const data = decoded.slice(colonIndex + 1);

    const expectedSignature = signData(data);
    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(data);
    if (Date.now() - payload.createdAt > maxAge) return null;

    return payload;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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

    const tokenPayload = verifySignedToken(captchaToken, TOKEN_TTL);
    if (!tokenPayload) {
      return res.status(400).json({
        success: false,
        message: '验证令牌无效或已过期，请重新验证',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '邮箱格式不正确',
      });
    }

    const to = req.body.to || 'noreply@example.com';

    const params = new URLSearchParams({
      apiUser: API_USER,
      apiKey: API_KEY,
      to,
      from: email,
      fromName: name,
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
    if (axios.isAxiosError && axios.isAxiosError(error) && error.response) {
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
}
