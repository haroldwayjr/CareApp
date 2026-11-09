
const NS = 'soma.xsbold';
const n = 5;
const parts = [];
for (let i = 0; i < n; i++) {
  const p = figma.root.getSharedPluginData(NS, 'b01_' + i);
  if (!p) return { error: 'missing chunk', i, n };
  parts.push(p);
}
const src = atob(parts.join(''));
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
try {
  const result = await new AsyncFunction(src)();
  for (let i = 0; i < n; i++) figma.root.setSharedPluginData(NS, 'b01_' + i, '');
  return { batch: '01', via: 'exact-eval', result };
} catch (e) {
  return { batch: '01', error: String(e), message: e && e.message, stack: e && String(e.stack).slice(0,500) };
}
