#!/usr/bin/env node
/**
 * After MCP download_multiple_assets returns URLs, save as downloads.json:
 * [{ dest, url }] where dest is relative to assets/icons (e.g. streamline/health/911.svg).
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const listPath = process.argv[2];
if (!listPath) {
  console.error('usage: node fetch-svgs.mjs downloads.json');
  process.exit(1);
}
const rows = JSON.parse(fs.readFileSync(listPath, 'utf8'));
const root = '/Users/harold.wayjr/Projects/CareApp/assets/icons';
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return get(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(res.statusCode + ' ' + url));
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}
(async () => {
  for (const row of rows) {
    const dest = path.join(root, row.dest);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const svg = await get(row.url);
    if (!svg.includes('<svg')) throw new Error('not svg: ' + row.dest);
    fs.writeFileSync(dest, svg);
    console.log('wrote', row.dest, svg.length);
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
