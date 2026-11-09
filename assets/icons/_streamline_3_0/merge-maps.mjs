#!/usr/bin/env node
/**
 * Merge chunk_*_map.json + extras.json into map.json.
 * Drop dropped health icons if present: hand-wash, lungs, pregnancy, surgery.
 */
const fs = require('fs');
const path = require('path');
const dir = '/Users/harold.wayjr/Projects/CareApp/assets/icons/_streamline_3_0';
const dropped = new Set(['hand-wash', 'lungs', 'pregnancy', 'surgery']);
const maps = [];
for (let i = 0; i < 4; i++) {
  const p = path.join(dir, `chunk_${i}_map.json`);
  if (!fs.existsSync(p)) {
    console.error('missing', p);
    process.exit(1);
  }
  maps.push(...JSON.parse(fs.readFileSync(p, 'utf8')));
}
const extras = JSON.parse(fs.readFileSync(path.join(dir, 'extras.json'), 'utf8'));
const byFigma = new Map();
for (const row of maps) {
  if (dropped.has(row.name)) continue;
  byFigma.set(row.figma, row);
}
for (const row of extras) {
  byFigma.set(row.figma, { ...byFigma.get(row.figma), ...row });
}
const all = [...byFigma.values()];
const unmatched = all.filter(r => !r.regularHash || !r.boldHash);
fs.writeFileSync(path.join(dir, 'map.json'), JSON.stringify(all, null, 2));
fs.writeFileSync(path.join(dir, 'unmatched.json'), JSON.stringify(unmatched, null, 2));
console.log({ total: all.length, unmatched: unmatched.length });
