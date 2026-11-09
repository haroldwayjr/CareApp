const keys = ['sb14_0','sb14_1','sb14_2','sb14_3','sb14_4','sb14_5','sb14_6','sb14_7','sb14_8','sb14_9'];
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