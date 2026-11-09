#!/usr/bin/env node
/**
 * Stage B helper: POST local Streamline SVGs to Figma upload_assets submitUrls.
 * Usage: node scripts/stage-b-upload-batch.js
 * Reads: assets/icons/streamline/_stage-b-remaining.json
 *        assets/icons/streamline/_upload-urls-batch.json
 * Updates placements + remaining queues.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const remainingPath = path.join(root, 'assets/icons/streamline/_stage-b-remaining.json');
const urlsPath = path.join(root, 'assets/icons/streamline/_upload-urls-batch.json');
const placementsPath = path.join(root, 'assets/icons/streamline/_stage-b-placements.json');

const remaining = JSON.parse(fs.readFileSync(remainingPath, 'utf8'));
const urls = JSON.parse(fs.readFileSync(urlsPath, 'utf8'));
const batch = remaining.slice(0, urls.length);

async function uploadOne(url, item) {
  const filePath = path.join(root, 'assets/icons/streamline', item.file);
  const buf = fs.readFileSync(filePath);
  const form = new FormData();
  form.append('file', new Blob([buf], { type: 'image/svg+xml' }), `${item.name}.svg`);
  const res = await fetch(url, { method: 'POST', body: form });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 300) };
  }
  return {
    name: item.name,
    category: item.category,
    status: res.status,
    placedOnNodeId: json.placedOnNodeId || null,
    error: res.ok ? null : json,
  };
}

(async () => {
  const results = [];
  for (let i = 0; i < batch.length; i += 8) {
    const slice = batch.slice(i, i + 8);
    const part = await Promise.all(slice.map((item, j) => uploadOne(urls[i + j], item)));
    results.push(...part);
  }
  const prev = fs.existsSync(placementsPath)
    ? JSON.parse(fs.readFileSync(placementsPath, 'utf8'))
    : [];
  const ok = results.filter((r) => r.placedOnNodeId);
  const fail = results.filter((r) => !r.placedOnNodeId);
  fs.writeFileSync(
    placementsPath,
    JSON.stringify(
      [
        ...prev,
        ...ok.map((r) => ({
          name: r.name,
          category: r.category,
          placedOnNodeId: r.placedOnNodeId,
        })),
      ],
      null,
      2
    )
  );
  const failedItems = batch.filter((_, i) => !results[i].placedOnNodeId);
  const still = [...failedItems, ...remaining.slice(urls.length)];
  fs.writeFileSync(remainingPath, JSON.stringify(still, null, 2));
  console.log(
    JSON.stringify(
      {
        uploaded: ok.length,
        failed: fail.length,
        remaining: still.length,
        failSample: fail.slice(0, 5),
      },
      null,
      2
    )
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
