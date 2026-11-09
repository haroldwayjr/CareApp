const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { ok: 0, missing: 0, failed: 1, miss: [], fail: [{ err: 'no-payload' }] };
if (t.characters.length !== 42812) return { ok:0, missing:0, failed:1, miss:[], fail:[{err:'bad-len', len:t.characters.length, expect:42812}] };
let decodedLen;
try { decodedLen = atob(t.characters).length; } catch(e) { return { ok:0, missing:0, failed:1, miss:[], fail:[{err:'atob', msg:String(e)}] }; }
if (decodedLen !== 32108) return { ok:0, missing:0, failed:1, miss:[], fail:[{err:'bad-raw', decodedLen, expect:32108}] };
const code = atob(t.characters);
t.remove();
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const fn = new AsyncFunction(code);
return await fn();
