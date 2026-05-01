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
    if (colonIndex === -1) {
      console.log('[contact] verifySignedToken: no colon found');
      return null;
    }

    const signature = decoded.slice(0, colonIndex);
    const data = decoded.slice(colonIndex + 1);

    const expectedSignature = signData(data);
    if (signature !== expectedSignature) {
      console.log('[contact] verifySignedToken: signature mismatch');
      return null;
    }

    const payload = JSON.parse(data);
    if (Date.now() - payload.createdAt > maxAge) {
      console.log('[contact] verifySignedToken: token expired');
      return null;
    }

    return payload;
  } catch (e) {
    console.log('[contact] verifySignedToken error:', e.message);
    return null;
  }
}

export default async function handler(req, res) {
  console.log('[contact] request method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, message, captchaToken } = req.body;

    console.log('[contact] request body:', {
      name,
      email,
      messageLength: message?.length,
      captchaToken: captchaToken ? `${captchaToken.slice(0, 20)}...(${captchaToken.length}chars)` : 'MISSING',
      hasAPI_USER: !!API_USER,
      hasAPI_KEY: !!API_KEY,
      TOKEN_SECRET_prefix: TOKEN_SECRET.slice(0, 8) + '...',
    });

    if (!name || !email || !message) {
      console.log('[contact] missing required fields');
      return res.status(400).json({
        success: false,
        message: '缺少必填字段：name, email, message',
        debug: { hasName: !!name, hasEmail: !!email, hasMessage: !!message },
      });
    }

    if (!captchaToken) {
      console.log('[contact] missing captchaToken');
      return res.status(400).json({
        success: false,
        message: '缺少验证令牌，请完成滑动验证',
        debug: { reason: 'missing_captcha_token' },
      });
    }

    const tokenPayload = verifySignedToken(captchaToken, TOKEN_TTL);
    if (!tokenPayload) {
      console.log('[contact] captchaToken invalid or expired');
      return res.status(400).json({
        success: false,
        message: '验证令牌无效或已过期，请重新验证',
        debug: { reason: 'captcha_token_invalid' },
      });
    }

    console.log('[contact] captchaToken verified:', {
      tokenId: tokenPayload.id,
      tokenAge: Date.now() - tokenPayload.createdAt,
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '邮箱格式不正确',
      });
    }

    const to = req.body.to || 'noreply@example.com';

    if (!API_USER || !API_KEY) {
      console.log('[contact] missing SendCloud credentials');
      return res.status(500).json({
        success: false,
        message: '邮件服务未配置',
        debug: { hasAPI_USER: !!API_USER, hasAPI_KEY: !!API_KEY },
      });
    }

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

    console.log('[contact] sending email via SendCloud, to:', to);

    const response = await axios.post(SEND_CLOUD_API_URL, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      timeout: 30000,
    });

    console.log('[contact] SendCloud response:', {
      status: response.status,
      result: response.data?.result,
      message: response.data?.message,
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
        debug: response.data,
      });
    }
  } catch (error) {
    console.error('[contact] error:', error.message);
    if (axios.isAxiosError && axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data?.message || 'SendCloud API 错误',
        debug: { sendcloudError: error.response.data },
      });
    }
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : '服务器内部错误',
      debug: error instanceof Error ? error.message : String(error),
    });
  }
}
