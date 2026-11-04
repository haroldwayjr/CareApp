const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const parts = [3,4,5];
const out = {};
for (const p of parts) {
  const a = store.getSharedPluginData('careapp', 'a04_p' + p + '_0');
  const b = store.getSharedPluginData('careapp', 'a04_p' + p + '_1');
  if (!a || !b) return { err: 'missing-sub', p, a: !!a, b: !!b };
  const full = a + b;
  store.setSharedPluginData('careapp', 'a04_p' + p, full);
  store.setSharedPluginData('careapp', 'a04_p' + p + '_0', '');
  store.setSharedPluginData('careapp', 'a04_p' + p + '_1', '');
  out['p'+p] = full.length;
}
return out;
