const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const parts = [
  "OyB9Cn0KcmV0dXJuIHsgb2ssIG1pc3NpbmcsIGZhaWxlZCwgbWlzcywgZmFpbCB9Owo=",
];
const add = parts.join("");
let h = 0; for (let i = 0; i < add.length; i++) h = ((h << 5) - h + add.charCodeAt(i)) | 0;
if (add.length !== 68 || h !== 2044315642) return { error: "pack-corrupt", len: add.length, hash: h, wantLen: 68, wantHash: 2044315642 };
t.characters = t.characters + add;
let fh = 0; const s = t.characters; for (let i = 0; i < s.length; i++) fh = ((fh << 5) - fh + s.charCodeAt(i)) | 0;
if (s.length !== 44068 || fh !== -1809221336) return { error: "cum-corrupt", len: s.length, hash: fh, wantLen: 44068, wantHash: -1809221336 };
return { pack: 11, len: s.length, hash: fh };
