function createSvgDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createPlaceholder(text, bgColor, textColor) {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">',
    `<rect width="240" height="240" rx="28" fill="${bgColor}"/>`,
    `<text x="120" y="128" text-anchor="middle" font-size="30" fill="${textColor}" font-family="Arial, sans-serif">${text}</text>`,
    '</svg>'
  ].join('');

  return createSvgDataUri(svg);
}

function createMenuIllustration(options) {
  const {
    title,
    bgTop,
    bgBottom,
    accent,
    accentSoft,
    icon,
    deco
  } = options;

  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">',
    '<defs>',
    '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">',
    `<stop offset="0%" stop-color="${bgTop}"/>`,
    `<stop offset="100%" stop-color="${bgBottom}"/>`,
    '</linearGradient>',
    '</defs>',
    '<rect width="240" height="240" rx="32" fill="url(#bg)"/>',
    `<circle cx="58" cy="58" r="18" fill="${accentSoft}" opacity="0.95"/>`,
    `<circle cx="192" cy="52" r="12" fill="${accent}" opacity="0.28"/>`,
    `<circle cx="178" cy="190" r="18" fill="${accentSoft}" opacity="0.7"/>`,
    `<path d="${deco}" fill="${accent}" opacity="0.16"/>`,
    '<rect x="34" y="34" width="172" height="172" rx="28" fill="#ffffff" opacity="0.78"/>',
    `<circle cx="120" cy="100" r="42" fill="${accentSoft}"/>`,
    `<text x="120" y="114" text-anchor="middle" font-size="46" fill="${accent}" font-family="Arial, sans-serif">${icon}</text>`,
    `<text x="120" y="168" text-anchor="middle" font-size="24" fill="${accent}" font-family="Arial, sans-serif" font-weight="700">${title}</text>`,
    '</svg>'
  ].join('');

  return createSvgDataUri(svg);
}

function createShopIllustration() {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">',
    '<defs>',
    '<linearGradient id="shopBg" x1="0" y1="0" x2="1" y2="1">',
    '<stop offset="0%" stop-color="#ffeaf3"/>',
    '<stop offset="100%" stop-color="#ffd7e7"/>',
    '</linearGradient>',
    '</defs>',
    '<rect width="200" height="200" rx="36" fill="url(#shopBg)"/>',
    '<circle cx="64" cy="60" r="16" fill="#fff4fa"/>',
    '<circle cx="148" cy="50" r="10" fill="#ff8eb8" opacity="0.36"/>',
    '<rect x="40" y="74" width="120" height="76" rx="18" fill="#fffafc" opacity="0.92"/>',
    '<rect x="54" y="62" width="92" height="22" rx="11" fill="#ff7eaf"/>',
    '<rect x="58" y="108" width="40" height="42" rx="12" fill="#ffe0ee"/>',
    '<rect x="106" y="108" width="36" height="12" rx="6" fill="#f6bfd3"/>',
    '<rect x="106" y="128" width="28" height="12" rx="6" fill="#f8d3e1"/>',
    '<text x="100" y="178" text-anchor="middle" font-size="20" fill="#93536e" font-family="Arial, sans-serif" font-weight="700">MENU</text>',
    '</svg>'
  ].join('');

  return createSvgDataUri(svg);
}

module.exports = {
  createPlaceholder,
  createMenuIllustration,
  createShopIllustration
};
