import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Files and directories to deploy
const assets = [
  'index.html',
  'about.html',
  'cart.html',
  'checkout.html',
  'contact.html',
  'food-details.html',
  'menu.html',
  'order-confirmation.html',
  'track-order.html',
  'admin',
  'css',
  'js',
  'public'
];

for (const item of assets) {
  const src = path.join(__dirname, item);
  const dest = path.join(distDir, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
  }
}

console.log('Successfully built static site to dist/');
