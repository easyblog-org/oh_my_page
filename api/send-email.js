import axios from 'axios';

const SEND_CLOUD_API_URL = 'https://api.sendcloud.net/apiv2/mail/send';
const API_USER = process.env.API_USER;
const API_KEY = process.env.API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

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
    if (axios.isAxiosError && axios.isAxiosError(error) && error.response) {
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
}
