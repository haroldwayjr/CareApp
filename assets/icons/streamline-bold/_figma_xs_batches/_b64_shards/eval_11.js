const keys = ['sb11_0','sb11_1','sb11_2','sb11_3','sb11_4','sb11_5','sb11_6','sb11_7'];
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