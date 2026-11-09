const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
if (!store) return { ok: 0, missing: 0, failed: 1, err: 'no-store' };
let b64 = '';
for (let i = 0; i < 6; i++) {
  const p = store.getSharedPluginData('careapp', 'a03_p' + i);
  if (!p) return { ok: 0, missing: 0, failed: 1, err: 'missing-part-' + i };
  b64 += p;
}
const src = atob(b64);
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const result = await new AsyncFunction(src)();
// cleanup parts for this key
for (let i = 0; i < 6; i++) store.setSharedPluginData('careapp', 'a03_p' + i, '');
return result;
