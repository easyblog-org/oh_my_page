import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/captcha/image', async (req, res) => {
  try {
    const handler = await import('./api/captcha/image.js');
    await handler.default({ method: 'GET', body: null }, res);
  } catch (e) {
    console.error('[proxy] /api/captcha/image error:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

app.post('/api/captcha/verify', async (req, res) => {
  try {
    const handler = await import('./api/captcha/verify.js');
    await handler.default({ method: 'POST', body: req.body }, res);
  } catch (e) {
    console.error('[proxy] /api/captcha/verify error:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const handler = await import('./api/contact.js');
    await handler.default({ method: 'POST', body: req.body }, res);
  } catch (e) {
    console.error('[proxy] /api/contact error:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

app.post('/api/send-email', async (req, res) => {
  try {
    const handler = await import('./api/send-email.js');
    await handler.default({ method: 'POST', body: req.body }, res);
  } catch (e) {
    console.error('[proxy] /api/send-email error:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🚀 Production server running at http://localhost:${PORT}`);
  console.log(`   API routes: /api/captcha/*, /api/contact`);
  console.log(`   Frontend:   http://localhost:${PORT}\n`);
});
