
const NS = 'soma.xsbold';
const n = 5;
const parts = [];
for (let i = 0; i < n; i++) {
  const p = figma.root.getSharedPluginData(NS, 'b15_' + i);
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
  for (let i = 0; i < n; i++) figma.root.setSharedPluginData(NS, 'b15_' + i, '');
  return { batch: '15', via: 'exact-eval', result };
} catch (e) {
  return { batch: '15', error: String(e), stack: e && e.stack };
}
