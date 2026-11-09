const b64 = await figma.clientStorage.getAsync("reapply_b64_12");
const code = atob(b64);
await figma.clientStorage.setAsync("reapply_b64_12", '');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
const fn = new AsyncFunction(code);
return await fn();
