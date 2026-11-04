const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "Y2hpbGRyZW4uZmluZChjID0+IGMubmFtZSA9PT0gJ1NpemU9eHMnKTsKICBjb25zdCBtZCA9IHNldC5jaGlsZHJlbi5maW5kKGMgPT4gYy5uYW1lID09PSAnU2l6ZT1tZCcpOwogIGlmICgheHMpIHJldHVybiB7IG9rOiBmYWxzZSwgcmVhc29uOiAnbm8teHMnIH07CiAgeHMudmlzaWJsZSA9IHRydWU7CiAgZm9yIChjb25zdCBjIG9mIFsuLi54cy5jaGlsZHJlbl0pIGMucmVtb3ZlKCk7CiAgY29uc3Qgbm9kZSA9IGZpZ21hLmNyZWF0ZU5vZGVGcm9tU3ZnKHN2Zyk7CiAgbm9kZS5uYW1lID0gc2V0Lm5hbWUuc3BsaXQoJy8nKS5wb3AoKTsKICBub2RlLnJlc2l6ZSgxNiwgMTYpOwogIG5vZGUueCA9IDA7IG5vZGUueSA9IDA7CiAgbm9kZS5jbGlwc0NvbnRlbnQg";
t.characters = t.characters + add;
return { part: 3, addLen: add.length, len: t.characters.length, expect: 2000 };
