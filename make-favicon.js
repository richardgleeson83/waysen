#!/usr/bin/env node
// Generates favicon.svg, favicon-32.png, and favicon.ico for Waysen
// Uses only Node.js built-ins (zlib, fs)

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const GREEN = [0x3D, 0x8C, 0x27, 0xFF];
const WHITE = [0xFF, 0xFF, 0xFF, 0xFF];

// CRC32 table (PNG requires it)
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c;
}
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(pixels, width, height) {
  // Raw image data: filter byte (0 = None) + RGBA per row
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0;
    for (let x = 0; x < width; x++) {
      const p = pixels[y * width + x];
      const o = y * (1 + width * 4) + 1 + x * 4;
      raw[o] = p[0]; raw[o+1] = p[1]; raw[o+2] = p[2]; raw[o+3] = p[3];
    }
  }
  const compressed = zlib.deflateSync(raw, { level: 9 });

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

function setPixel(pixels, size, x, y, color) {
  x = Math.round(x); y = Math.round(y);
  if (x >= 0 && x < size && y >= 0 && y < size) pixels[y * size + x] = color;
}

function drawLine(pixels, size, x0, y0, x1, y1, color, radius) {
  const dx = x1 - x0, dy = y1 - y0;
  const steps = Math.ceil(Math.sqrt(dx*dx + dy*dy) * 2);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const cx = x0 + dx * t, cy = y0 + dy * t;
    for (let tx = -Math.ceil(radius); tx <= Math.ceil(radius); tx++) {
      for (let ty = -Math.ceil(radius); ty <= Math.ceil(radius); ty++) {
        if (tx*tx + ty*ty <= radius*radius) setPixel(pixels, size, cx + tx, cy + ty, color);
      }
    }
  }
}

function drawRoundedRect(pixels, size, x, y, w, h, r, color) {
  // Fill main body
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      // Check corners
      const inCornerTL = px < x + r && py < y + r && Math.pow(px - (x+r), 2) + Math.pow(py - (y+r), 2) > r*r;
      const inCornerTR = px >= x + w - r && py < y + r && Math.pow(px - (x+w-r-1), 2) + Math.pow(py - (y+r), 2) > r*r;
      const inCornerBL = px < x + r && py >= y + h - r && Math.pow(px - (x+r), 2) + Math.pow(py - (y+h-r-1), 2) > r*r;
      const inCornerBR = px >= x + w - r && py >= y + h - r && Math.pow(px - (x+w-r-1), 2) + Math.pow(py - (y+h-r-1), 2) > r*r;
      if (!inCornerTL && !inCornerTR && !inCornerBL && !inCornerBR) {
        setPixel(pixels, size, px, py, color);
      }
    }
  }
}

function createFaviconPixels(size) {
  const pixels = new Array(size * size).fill(null).map(() => [0, 0, 0, 0]); // transparent bg

  const pad = Math.floor(size * 0.04);
  const radius = Math.floor(size * 0.18);
  drawRoundedRect(pixels, size, pad, pad, size - pad*2, size - pad*2, radius, GREEN);

  // W proportions
  const thick = Math.max(1.5, size * 0.10);
  const top   = size * 0.20;
  const bot   = size * 0.82;
  const lx    = size * 0.16;
  const rx    = size * 0.84;
  const mlx   = size * 0.37;
  const mrx   = size * 0.63;
  const mid   = size * 0.57;

  drawLine(pixels, size, lx, top, mlx, bot, WHITE, thick);
  drawLine(pixels, size, mlx, bot, size/2, mid, WHITE, thick);
  drawLine(pixels, size, size/2, mid, mrx, bot, WHITE, thick);
  drawLine(pixels, size, mrx, bot, rx, top, WHITE, thick);

  return pixels;
}

// Generate 32x32 and 16x16 PNGs
const p32 = createFaviconPixels(32);
const p16 = createFaviconPixels(16);
const png32 = encodePNG(p32, 32, 32);
const png16 = encodePNG(p16, 16, 16);

// Write standalone 32x32 PNG (for og:image / apple-touch reference)
const outDir = path.join(__dirname, 'site');
fs.writeFileSync(path.join(outDir, 'favicon-32.png'), png32);
console.log('Written: site/favicon-32.png');

// Build ICO: two images (32x32 and 16x16)
function makeIco(pngs, sizes) {
  const count = pngs.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;

  const entries = pngs.map((png, i) => {
    const entry = Buffer.alloc(16);
    entry[0] = sizes[i]; // width (0 = 256)
    entry[1] = sizes[i]; // height
    entry[2] = 0;        // color count
    entry[3] = 0;        // reserved
    entry.writeUInt16LE(1, 4);  // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(count, 4);

  return Buffer.concat([header, ...entries, ...pngs]);
}

const ico = makeIco([png32, png16], [32, 16]);
fs.writeFileSync(path.join(outDir, 'favicon.ico'), ico);
console.log('Written: site/favicon.ico');

// SVG favicon (scalable, used by modern browsers)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" ry="18" fill="#3D8C27"/>
  <text x="50" y="78" font-family="Arial Black, Arial, sans-serif" font-weight="900"
        font-size="68" text-anchor="middle" fill="white">W</text>
</svg>`;
fs.writeFileSync(path.join(outDir, 'favicon.svg'), svg);
console.log('Written: site/favicon.svg');

console.log('Favicon generation complete.');
