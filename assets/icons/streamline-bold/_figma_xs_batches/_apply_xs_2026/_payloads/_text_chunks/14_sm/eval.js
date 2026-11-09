const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const frame = page.findOne(n => n.name === '__xs_payload_store');
if (!frame) return { ok: false, reason: 'no-store' };
const parts = [];
for (let i = 0; i < 8; i++) {
  const name = 'c' + String(i).padStart(2, '0');
  const text = frame.findOne(n => n.type === 'TEXT' && n.name === name);
  if (!text) return { ok: false, reason: 'missing-chunk', i };
  parts.push(text.characters);
}
const src = atob(parts.join(''));
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const result = await new AsyncFunction(src)();
frame.remove();
return { batch: 14, applied: result };
