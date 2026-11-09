#!/usr/bin/env node
/**
 * Deterministic check: every hashed Ultimate Bold source SVG is fill-based
 * (not Regular stroke). Does not talk to Figma.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const hashes = JSON.parse(fs.readFileSync(path.join(root, 'streamline/_bold_hashes.json'), 'utf8'));
const boldDir = path.join(root, 'streamline-bold');
const PRESERVE = new Set(['health/heart.svg']);
let failed = 0;
for (const h of hashes) {
  const file = path.join(boldDir, h.file);
  if (!fs.existsSync(file)) {
    console.error('missing', h.file);
    failed++;
    continue;
  }
  const svg = fs.readFileSync(file, 'utf8');
  const hasFill = /fill="#000000"|fill="#000"|fill="black"|fill="#0F172A"|fill="#0f172a"/.test(svg);
  const pathN = (svg.match(/<path\b/g) || []).length;
  if (!hasFill || pathN < 1) {
    console.error('not-fill-bold', h.file);
    failed++;
  }
}
if (!PRESERVE.has('health/heart.svg') || !fs.existsSync(path.join(boldDir, 'health/heart.svg'))) {
  console.error('heart source missing');
  failed++;
}
if (failed) {
  console.error(`assert-bold-svgs: ${failed} failure(s)`);
  process.exit(1);
}
console.log(`assert-bold-svgs: ${hashes.length} hashed Bold SVGs are fill-based; heart source present`);
