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
    if (colonIndex === -1) {
      console.log('[captcha/verify] verifySignedToken: no colon found');
      return null;
    }

    const signature = decoded.slice(0, colonIndex);
    const data = decoded.slice(colonIndex + 1);

    const expectedSignature = signData(data);
    if (signature !== expectedSignature) {
      console.log('[captcha/verify] verifySignedToken: signature mismatch', {
        got: signature.slice(0, 16) + '...',
        expected: expectedSignature.slice(0, 16) + '...',
      });
      return null;
    }

    const payload = JSON.parse(data);
    if (Date.now() - payload.createdAt > maxAge) {
      console.log('[captcha/verify] verifySignedToken: token expired', {
        age: Date.now() - payload.createdAt,
        maxAge,
      });
      return null;
    }

    return payload;
  } catch (e) {
    console.log('[captcha/verify] verifySignedToken error:', e.message);
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

export default async function handler(req, res) {
  console.log('[captcha/verify] request method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { captchaId, captchaToken, x, y, duration, trail } = req.body;

    console.log('[captcha/verify] request body:', {
      captchaId,
      captchaToken: captchaToken ? `${captchaToken.slice(0, 20)}...(${captchaToken.length}chars)` : 'MISSING',
      x,
      y,
      duration,
      trailLength: trail?.length,
      TOKEN_SECRET_prefix: TOKEN_SECRET.slice(0, 8) + '...',
    });

    if (!captchaToken || x === undefined) {
      console.log('[captcha/verify] MISSING params:', { hasCaptchaToken: !!captchaToken, hasX: x !== undefined });
      return res.status(400).json({
        success: false,
        message: '缺少验证参数',
        debug: { hasCaptchaToken: !!captchaToken, hasX: x !== undefined },
      });
    }

    const stored = verifySignedToken(captchaToken, TOKEN_TTL);
    if (!stored) {
      console.log('[captcha/verify] token verification FAILED - token invalid or expired');
      return res.status(400).json({
        success: false,
        message: '验证码已过期，请刷新重试',
        debug: { reason: 'token_invalid_or_expired' },
      });
    }

    console.log('[captcha/verify] token decoded successfully:', {
      storedCaptchaId: stored.captchaId,
      requestCaptchaId: captchaId,
      storedX: stored.x,
      requestX: x,
      idMatch: stored.captchaId === captchaId,
    });

    if (stored.captchaId !== captchaId) {
      console.log('[captcha/verify] captchaId MISMATCH');
      return res.status(400).json({
        success: false,
        message: '验证码已过期，请刷新重试',
        debug: { reason: 'captcha_id_mismatch' },
      });
    }

    const tolerance = 10;
    const diff = Math.abs(x - stored.x);

    console.log('[captcha/verify] position check:', {
      storedX: stored.x,
      requestX: x,
      diff,
      tolerance,
      passed: diff <= tolerance,
    });

    if (diff > tolerance) {
      return res.json({
        success: false,
        message: '验证失败，请重试',
        debug: { storedX: stored.x, requestX: x, diff, tolerance },
      });
    }

    if (duration < 200) {
      console.log('[captcha/verify] duration too short:', duration);
      return res.json({
        success: false,
        message: '验证失败，请重试',
        debug: { reason: 'duration_too_short', duration },
      });
    }

    const businessToken = createBusinessToken();

    console.log('[captcha/verify] SUCCESS - business token created');

    return res.json({
      success: true,
      token: businessToken,
    });
  } catch (error) {
    console.error('[captcha/verify] error:', error);
    return res.status(500).json({
      success: false,
      message: '验证服务异常',
      debug: error instanceof Error ? error.message : String(error),
    });
  }
}
