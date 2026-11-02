import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets with html extension support
app.use(express.static(__dirname, { extensions: ['html'] }));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Clean URL routing fallback
app.get('*', (req, res, next) => {
  if (req.path.includes('.')) {
    return next();
  }
  const htmlPath = path.join(__dirname, `${req.path}.html`);
  if (fs.existsSync(htmlPath)) {
    return res.sendFile(htmlPath);
  }
  const indexInSubdir = path.join(__dirname, req.path, 'index.html');
  if (fs.existsSync(indexInSubdir)) {
    return res.sendFile(indexInSubdir);
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Only bind port if not running in a serverless environment like Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Seven Stars Indian Takeaway running on http://0.0.0.0:${PORT}`);
  });
}

export default app;
