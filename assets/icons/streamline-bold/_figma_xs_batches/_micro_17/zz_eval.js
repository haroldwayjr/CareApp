const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { ok: 0, missing: 0, failed: 1, miss: [], fail: [{ err: 'no-payload' }] };
if (t.characters.length !== 44068) return { ok:0, missing:0, failed:1, miss:[], fail:[{err:'bad-len', len:t.characters.length, expect:44068}] };
let decodedLen;
try { decodedLen = atob(t.characters).length; } catch(e) { return { ok:0, missing:0, failed:1, miss:[], fail:[{err:'atob', msg:String(e)}] }; }
if (decodedLen !== 33050) return { ok:0, missing:0, failed:1, miss:[], fail:[{err:'bad-raw', decodedLen, expect:33050}] };
const code = atob(t.characters);
t.remove();
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const fn = new AsyncFunction(code);
return await fn();
