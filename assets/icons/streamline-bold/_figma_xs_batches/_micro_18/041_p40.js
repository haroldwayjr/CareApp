const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "bDEuMjcgLTEuMjdhMi45MiAyLjkyIDAgMCAxIDMuODMgLTAuMzMgMi44IDIuOCAwIDAgMSAwLjY2IDMuNjYgMC4yOSAwLjI5IDAgMCAwIDAuMjUgMC40M2gyLjg0YTAuODcgMC44NyAwIDAgMSAwLjg3IDAuODdaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9iYXR0ZXJ5LmNoYXJnaW5nIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJCYXR0ZXJ5LUNoYXJnaW5nLTItLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQmF0dGVyeSBDaGFy";
t.characters = t.characters + add;
return { part: 40, addLen: add.length, len: t.characters.length, expect: 20500 };
