
const NS = 'soma.xsbold';
const n = 6;
const parts = [];
for (let i = 0; i < n; i++) {
  const p = figma.root.getSharedPluginData(NS, 'b09_' + i);
  if (!p) return { error: 'missing chunk', i, n };
  parts.push(p);
}
const b64 = parts.join('');
const bin = atob(b64);
const src = bin;
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
try {
  const result = await new AsyncFunction(src)();
  // cleanup
  for (let i = 0; i < n; i++) figma.root.setSharedPluginData(NS, 'b09_' + i, '');
  return { batch: '09', via: 'exact-eval', result };
} catch (e) {
  return { batch: '09', error: String(e), stack: e && e.stack };
}
