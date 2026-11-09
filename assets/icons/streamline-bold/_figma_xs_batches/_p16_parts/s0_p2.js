const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "PSBmaWdtYS52YXJpYWJsZXMuc2V0Qm91bmRWYXJpYWJsZUZvclBhaW50KAogICAgICAgIHsgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMCB9IH0sICdjb2xvcicsIGljb25EZWZhdWx0KTsKICAgICAgbi5maWxscyA9IFtwYWludF07CiAgICAgIG4uc3Ryb2tlcyA9IFtdOwogICAgfQogICAgaWYgKCdjbGlwc0NvbnRlbnQnIGluIG4gJiYgbi50eXBlID09PSAnRlJBTUUnKSBuLmNsaXBzQ29udGVudCA9IGZhbHNlOwogICAgaWYgKCdjaGlsZHJlbicgaW4gbikgZm9yIChjb25zdCBjIG9mIG4uY2hpbGRyZW4pIHN0YWNrLnB1c2goYyk7CiAgfQp9CmZ1bmN0aW9uIGFwcGx5Qm9sZFhzKHNldCwgc3ZnKSB7CiAgY29uc3QgeHMgPSBzZXQu";
t.characters = t.characters + add;
return { step: 0, part: 2, addLen: add.length, len: t.characters.length };
