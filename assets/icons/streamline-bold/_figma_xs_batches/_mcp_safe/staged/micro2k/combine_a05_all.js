const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const out = {};
// fix p2_1
{
  const a = store.getSharedPluginData('careapp', 'a05_p2_1_0');
  const b = store.getSharedPluginData('careapp', 'a05_p2_1_1');
  if (!a || !b) return { err: 'p2_1_sub', a:!!a, b:!!b };
  store.setSharedPluginData('careapp', 'a05_p2_1', a+b);
  store.setSharedPluginData('careapp', 'a05_p2_1_0', '');
  store.setSharedPluginData('careapp', 'a05_p2_1_1', '');
  out.p2_1 = (a+b).length;
}
// p3-p7: pieces a05_pN_0 .. until empty
for (let p = 3; p <= 7; p++) {
  let full = '';
  for (let i = 0; i < 10; i++) {
    const c = store.getSharedPluginData('careapp', 'a05_p' + p + '_' + i);
    if (!c) break;
    full += c;
  }
  if (!full) return { err: 'missing-part', p };
  store.setSharedPluginData('careapp', 'a05_p' + p, full);
  for (let i = 0; i < 10; i++) store.setSharedPluginData('careapp', 'a05_p' + p + '_' + i, '');
  out['p'+p] = full.length;
}
// also assemble p0 and p1 from existing _0+_1 micros, and p2 from _0+_1
for (let p = 0; p <= 2; p++) {
  if (p === 2) {
    // p2_0 already full 4000; p2_1 just fixed
    const a = store.getSharedPluginData('careapp', 'a05_p2_0');
    const b = store.getSharedPluginData('careapp', 'a05_p2_1');
    store.setSharedPluginData('careapp', 'a05_p2', a+b);
    store.setSharedPluginData('careapp', 'a05_p2_0', '');
    store.setSharedPluginData('careapp', 'a05_p2_1', '');
    out.p2 = (a+b).length;
  } else {
    const a = store.getSharedPluginData('careapp', 'a05_p' + p + '_0');
    const b = store.getSharedPluginData('careapp', 'a05_p' + p + '_1');
    if (!a || !b) return { err: 'missing-early', p, a:!!a, b:!!b };
    store.setSharedPluginData('careapp', 'a05_p' + p, a+b);
    store.setSharedPluginData('careapp', 'a05_p' + p + '_0', '');
    store.setSharedPluginData('careapp', 'a05_p' + p + '_1', '');
    out['p'+p] = (a+b).length;
  }
}
return out;
