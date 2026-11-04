const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "aW51ZTsgfQogIHRyeSB7CiAgICBjb25zdCByID0gYXBwbHlCb2xkWHMoc2V0LCBpdGVtLnN2Zyk7CiAgICBpZiAoci5vaykgb2srKzsgZWxzZSB7IGZhaWxlZCsrOyBmYWlsLnB1c2goe25hbWU6aXRlbS5zZXROYW1lLHJ9KTsgfQogIH0gY2F0Y2goZSkgeyBmYWlsZWQrKzsgaWYgKGZhaWwubGVuZ3RoPDgpIGZhaWwucHVzaCh7bmFtZTppdGVtLnNldE5hbWUsZXJyOlN0cmluZyhlKX0pOyB9Cn0KcmV0dXJuIHsgb2ssIG1pc3NpbmcsIGZhaWxlZCwgbWlzcywgZmFpbCB9Owo=";
t.characters = t.characters + add;
return { part: 81, addLen: add.length, len: t.characters.length, expect: 40860 };
