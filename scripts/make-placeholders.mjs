// Generates neutral SVG placeholders for each product image filename.
// These will be visually replaced by the real /public/uploads/*.jpg files when uploaded.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../public/uploads/', import.meta.url).pathname;
if (!existsSync(root)) mkdirSync(root, { recursive: true });

const files = [
  // T-Shirts
  { name: 'national1.jpg', label: 'National Red',     bg: '#7E1F2A', fg: '#F7F5F0' },
  { name: 'national2.jpg', label: 'National White',   bg: '#EDEAE2', fg: '#0E1E45' },
  { name: 'national3.jpg', label: 'National Yellow',  bg: '#C9A227', fg: '#0E1E45' },
  { name: 'monclertshirts.jpg', label: 'Moncler',     bg: '#0E1E45', fg: '#F7F5F0' },
  { name: 'calvinklein.jpg',    label: 'Calvin Klein', bg: '#1C1C1C', fg: '#F7F5F0' },
  { name: 'lordpiana.jpg',      label: 'Loro Piana',  bg: '#2A2A2A', fg: '#F7F5F0' },
  { name: 'lacoste.jpg',        label: 'Lacoste',     bg: '#0A3A22', fg: '#F7F5F0' },
  { name: 'indigotshirtwhite.jpg',   label: 'Indigo White',   bg: '#EDEAE2', fg: '#0E1E45' },
  { name: 'indigotshirtblack.jpg',   label: 'Indigo Black',   bg: '#111111', fg: '#F7F5F0' },
  { name: 'indigotshirtgreen.jpg',   label: 'Indigo Green',   bg: '#1F3A2B', fg: '#F7F5F0' },
  { name: 'indigotshirtpink.jpg',    label: 'Indigo Pink',    bg: '#D9A6A6', fg: '#0E1E45' },
  { name: 'indigotshirtburgendy.jpg',label: 'Indigo Burgundy',bg: '#5C1A24', fg: '#F7F5F0' },
  // Sets
  { name: 'blackset.jpg',  label: 'Black Set',  bg: '#141414', fg: '#F7F5F0' },
  { name: 'brownset.jpg',  label: 'Brown Set',  bg: '#5A3A24', fg: '#F7F5F0' },
  { name: 'greenset.jpg',  label: 'Green Set',  bg: '#2D4A37', fg: '#F7F5F0' },
  { name: 'blueset.jpg',   label: 'Blue Set',   bg: '#0E1E45', fg: '#F7F5F0' },
  // Shorts
  { name: 'shorts1.jpg', label: 'Light Blue Shorts', bg: '#7E9BC4', fg: '#0E1E45' },
  { name: 'shorts2.jpg', label: 'Black Shorts',      bg: '#141414', fg: '#F7F5F0' },
  { name: 'shorts3.jpg', label: 'Dark Blue Shorts',  bg: '#0A1736', fg: '#F7F5F0' },
];

function svg({ label, bg, fg }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="100%" height="100%" fill="${bg}"/>
  <g fill="${fg}" font-family="Georgia, 'Cormorant Garamond', serif">
    <text x="400" y="470" text-anchor="middle" font-size="56" letter-spacing="6">INDIGO</text>
    <text x="400" y="520" text-anchor="middle" font-size="20" letter-spacing="8">JEANS</text>
    <line x1="300" y1="555" x2="500" y2="555" stroke="${fg}" stroke-width="1.5"/>
    <text x="400" y="600" text-anchor="middle" font-size="22" letter-spacing="3">${label}</text>
    <text x="400" y="950" text-anchor="middle" font-size="14" letter-spacing="4" opacity="0.6">REPLACE WITH /public/uploads/${label.toLowerCase()}.jpg</text>
  </g>
</svg>`;
}

for (const f of files) {
  const svgPath = join(root, f.name.replace(/\.jpg$/, '.svg'));
  writeFileSync(svgPath, svg(f));
}
console.log('Placeholders created:', files.length);
