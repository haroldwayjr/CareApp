const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MzAuMzkgMzAuMzkgMCAwIDAgOC41MiAxaDAuMzNhMy4wOSAzLjA5IDAgMCAxIC0wLjc2IC0zLjk1TTUuNzggNC43NWg4LjQ5Yy0wLjA3IDAuNiAtMC4xNCAxLjE4IC0wLjE5IDEuNjVhMC43MyAwLjczIDAgMCAxIC0wLjczIDAuNjRoLTdhMC43MiAwLjcyIDAgMCAxIC0wLjU1IC0wLjI0IDAuNyAwLjcgMCAwIDEgLTAuMTggLTAuNTVjMCAtMC40MiAwLjA4IC0xIDAuMTQgLTEuNTFaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTUuMiAxNC4yNmEwLjc0IDAuNzQgMCAwIDAgMSAtMC4yOGwxLjEgLTEuODdhMC4xMSAwLjExIDAgMCAxIDAuMTQgMGwwLjg5IDEuNTUgLTAuOTMgMC41NmEwLjczIDAu";
t.characters = t.characters + add;
return { part: 43, addLen: add.length, len: t.characters.length, expect: 22000 };
