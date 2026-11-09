const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MC4yNCAwLjI0IDAgMCAxIDAuMjEgLTAuMTFoMC4yMWEwLjI1IDAuMjUgMCAwIDEgMC4yMiAwLjEzbDAuOTYgMS42MmEwLjQ4IDAuNDggMCAwIDAgMC40MyAwLjI1IDAuNSAwLjUgMCAwIDAgMC40MyAtMC4yM0wxOCAyMGExLjUxIDEuNTEgMCAwIDAgMS41IC0xLjU5bS0xNSAxLjMyYTEuMjUgMS4yNSAwIDEgMSAxLjI1IC0xLjI1IDEuMjUgMS4yNSAwIDAgMSAtMS4yNSAxLjI1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9iYXJjb2RlLnNjYW4iLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9";
t.characters = t.characters + add;
return { part: 68, addLen: add.length, len: t.characters.length, expect: 34500 };
