const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "ZW0uc2V0TmFtZSxlcnI6U3RyaW5nKGUpfSk7IH0KfQpyZXR1cm4geyBvaywgbWlzc2luZywgZmFpbGVkLCBtaXNzLCBmYWlsIH07Cg==";
t.characters = t.characters + add;
return { part: 77, addLen: add.length, len: t.characters.length, expect: 38604 };
