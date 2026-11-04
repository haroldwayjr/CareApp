const keys = ['sb13_0','sb13_1','sb13_2','sb13_3','sb13_4','sb13_5','sb13_6','sb13_7','sb13_8'];
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