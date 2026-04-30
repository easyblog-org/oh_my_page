import crypto from 'crypto';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'captcha-secret-change-in-prod';
const TOKEN_TTL = 5 * 60 * 1000;

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

function createBusinessToken() {
  const payload = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const data = JSON.stringify(payload);
  const signature = signData(data);
  return Buffer.from(`${signature}:${data}`).toString('base64');
}

function verifyBusinessToken(token) {
  return verifySignedToken(token, TOKEN_TTL);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { captchaId, captchaToken, x, y, duration, trail } = req.body;

    if (!captchaToken || x === undefined) {
      return res.status(400).json({
        success: false,
        message: '缺少验证参数',
      });
    }

    const stored = verifySignedToken(captchaToken, TOKEN_TTL);
    if (!stored || stored.captchaId !== captchaId) {
      return res.status(400).json({
        success: false,
        message: '验证码已过期，请刷新重试',
      });
    }

    const tolerance = 10;
    const diff = Math.abs(x - stored.x);

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

    const businessToken = createBusinessToken();

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
}
