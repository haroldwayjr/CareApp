#!/usr/bin/env node
/** Merge use_figma results into placements. Usage: node scripts/stage-b-merge-results.cjs <results.json> */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const placementsPath = path.join(root, 'assets/icons/streamline/_stage-b-placements.json');
const resultsPath = process.argv[2];
if (!resultsPath) {
  console.error('Usage: node scripts/stage-b-merge-results.cjs <results.json>');
  process.exit(1);
}
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
const p = JSON.parse(fs.readFileSync(placementsPath, 'utf8'));
const map = Object.fromEntries(
  results.filter((r) => r.componentId).map((r) => [r.placedOnNodeId, r.componentId])
);
let updated = 0;
for (const item of p) {
  if (map[item.placedOnNodeId]) {
    item.componentId = map[item.placedOnNodeId];
    updated++;
  }
}
fs.writeFileSync(placementsPath, JSON.stringify(p, null, 2));
const pending = p.filter((x) => !x.componentId);
console.log(
  JSON.stringify({
    updated,
    withComp: p.filter((x) => x.componentId).length,
    pending: pending.length,
  })
);
