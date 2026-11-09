const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const frame = page.findOne(n => n.name === '__xs_payload_store');
if (!frame) return { ok: false, reason: 'no-store' };
const parts = [];
for (let i = 0; i < 7; i++) {
  const name = 'c' + String(i).padStart(2, '0');
  const text = frame.findOne(n => n.type === 'TEXT' && n.name === name);
  if (!text) return { ok: false, reason: 'missing-chunk', i };
  parts.push(text.characters);
}
const lens = parts.map(p => p.length);
const joined = parts.join('');
let src;
try { src = atob(joined); } catch (e) { return { ok: false, reason: 'atob-fail', err: String(e), lens }; }
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const result = await new AsyncFunction(src)();
frame.remove();
return { batch: 18, applied: result, lens };
