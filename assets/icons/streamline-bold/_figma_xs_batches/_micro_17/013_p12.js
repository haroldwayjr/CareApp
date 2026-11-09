const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjIzIDAgMCAwIDAuMTMgLTAuMjEgMC4yMiAwLjIyIDAgMCAwIC0wLjExIC0wLjIyIDUgNSAwIDAgMCAtNy43NCA0LjE0IDUuMTMgNS4xMyAwIDAgMCAwLjMzIDEuOCAwLjI2IDAuMjYgMCAwIDAgMC4xOCAwLjE2IDAuMjMgMC4yMyAwIDAgMCAwLjIyIC0wLjA2IDcuMTkgNy4xOSAwIDAgMSAxLjI1IC0wLjg0XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9jb2ZmZWUiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIkNvZmZlZS1KYXItLVN0cmVhbWxpbmUtVWx0";
t.characters = t.characters + add;
return { part: 12, addLen: add.length, len: t.characters.length, expect: 6500 };
