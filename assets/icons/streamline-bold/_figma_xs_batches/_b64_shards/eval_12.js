const keys = ['sb12_0','sb12_1','sb12_2','sb12_3','sb12_4','sb12_5','sb12_6','sb12_7','sb12_8'];
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