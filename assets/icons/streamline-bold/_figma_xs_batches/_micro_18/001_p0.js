const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "CmNvbnN0IHBhZ2UgPSBmaWdtYS5yb290LmNoaWxkcmVuLmZpbmQocCA9PiAvSWNvbnMvaS50ZXN0KHAubmFtZSkpOwphd2FpdCBmaWdtYS5zZXRDdXJyZW50UGFnZUFzeW5jKHBhZ2UpOwpjb25zdCBjb2xsZWN0aW9ucyA9IGF3YWl0IGZpZ21hLnZhcmlhYmxlcy5nZXRMb2NhbFZhcmlhYmxlQ29sbGVjdGlvbnNBc3luYygpOwpsZXQgaWNvbkRlZmF1bHQgPSBudWxsOwpmb3IgKGNvbnN0IGNvbGwgb2YgY29sbGVjdGlvbnMpIHsKICBmb3IgKGNvbnN0IGlkIG9mIGNvbGwudmFyaWFibGVJZHMpIHsKICAgIGNvbnN0IHYgPSBhd2FpdCBmaWdtYS52YXJpYWJsZXMuZ2V0VmFyaWFibGVCeUlkQXN5bmMoaWQpOwogICAgaWYgKHYgJiYgdi5uYW1lID09PSAnaWNvbi9k";
t.characters = t.characters + add;
return { part: 0, addLen: add.length, len: t.characters.length, expect: 500 };
