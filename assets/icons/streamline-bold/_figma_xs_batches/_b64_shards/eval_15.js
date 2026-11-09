const keys = ['sb15_0','sb15_1','sb15_2','sb15_3','sb15_4','sb15_5','sb15_6','sb15_7','sb15_8'];
const parts = [];
for (const k of keys) {
  const p = await figma.clientStorage.getAsync(k);
  if (!p) return { error: 'missing', k };
  parts.push(p);
}
const src = atob(parts.join(''));
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const fn = new AsyncFunction(src);
const result = await fn();
for (const k of keys) await figma.clientStorage.deleteAsync(k);
return result;