const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: 'missing-payload' };
t.characters = t.characters + "OyB9Cn0KcmV0dXJuIHsgb2ssIG1pc3NpbmcsIGZhaWxlZCwgbWlzcywgZmFpbCB9Owo=";
return { step: 11, len: t.characters.length };
