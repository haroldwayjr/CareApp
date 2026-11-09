const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "ZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTEuNSAxMi43NWgtM2EwLjc1IDAuNzUgMCAwIDAgMCAxLjVoM2EwLjc1IDAuNzUgMCAwIDAgMCAtMS41XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjMuMTYgOS41MmExIDEgMCAwIDAgMC44NCAtMVY1YTEgMSAwIDAgMCAtMSAtMWgtMy43NWEwLjUgMC41IDAgMCAwIC0wLjUgMC41VjZhMC43NSAwLjc1IDAgMCAxIC0xLjUgMFY0LjVhMC41IDAuNSAwIDAgMCAtMC41IC0wLjVIMWExIDEgMCAwIDAgLTEgMXYzLjU0YTEgMSAwIDAgMCAwLjg2IDEgMi41IDIuNSAwIDAgMSAwIDQuOTQgMSAx";
t.characters = t.characters + add;
return { part: 6, addLen: add.length, len: t.characters.length, expect: 3500 };
