const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDIuNzUgMCAwIDAgNyA3Ljc0SDUuNWEwLjc1IDAuNzUgMCAwIDAgLTAuNzUgMC43NXY4YTAuNzYgMC43NiAwIDAgMCAwLjc1IDAuNzVtMi43NSAtMi43NUExLjI1IDEuMjUgMCAwIDEgNyAxNS43NGgtMC41YTAuMjUgMC4yNSAwIDAgMSAtMC4yNSAtMC4yNXYtMmEwLjI1IDAuMjUgMCAwIDEgMC4yNSAtMC4yNUg3YTEuMjUgMS4yNSAwIDAgMSAxLjI1IDEuMjVtLTIgLTVhMC4yNSAwLjI1IDAgMCAxIDAuMjUgLTAuMjVIN2ExLjI1IDEuMjUgMCAxIDEgMCAyLjVoLTAuNWEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgLTAuMjVaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImlj";
t.characters = t.characters + add;
return { part: 49, addLen: add.length, len: t.characters.length, expect: 25000 };
