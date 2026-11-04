const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCA3IDIuNzNWMS41MmEwLjc0IDAuNzQgMCAwIDAgLTAuNzUgLTAuNzVIMi42YTAuNzUgMC43NSAwIDAgMCAtMC43NSAwLjc1djEuMjFBMS44NSAxLjg1IDAgMCAwIDAgNC40N3Y3LjI4YTEuODkgMS44OSAwIDAgMCAyIDEuNzVaTTIgNC4yMmgwLjZhMC43NSAwLjc1IDAgMCAwIDAuNzUgLTAuNzV2LTEuMkg1LjV2MS4yYTAuNzYgMC43NiAwIDAgMCAwLjc1IDAuNzVoMC41OWMwLjMgMCAwLjQ5IDAuMTYgMC40OSAwLjI1djEuOTFoLTUuOFY0LjQ3YzAgLTAuMDkgMC4xOSAtMC4yNSAwLjQ3IC0wLjI1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9s";
t.characters = t.characters + add;
return { part: 45, addLen: add.length, len: t.characters.length, expect: 23000 };
