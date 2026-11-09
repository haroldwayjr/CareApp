const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "OyB9Cn0KcmV0dXJuIHsgb2ssIG1pc3NpbmcsIGZhaWxlZCwgbWlzcywgZmFpbCB9Owo=";
t.characters = t.characters + add;
return { part: 88, addLen: add.length, len: t.characters.length, expect: 44068 };
