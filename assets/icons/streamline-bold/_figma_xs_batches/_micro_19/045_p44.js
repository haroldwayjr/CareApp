const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "NzMgMCAwIDAgLTAuMzYgMC43NSAwLjc1IDAuNzUgMCAwIDAgMC41NSAwLjYybDIuNDggMC42MyAwLjE0IDBoMC4wN2EwLjYxIDAuNjEgMCAwIDAgMC4zIC0wLjA4IDAuNzkgMC43OSAwIDAgMCAwLjE3IC0wLjE0IDAuNTggMC41OCAwIDAgMCAwLjEzIC0wLjI2bDAuNjQgLTIuNDhhMC43NSAwLjc1IDAgMCAwIC0xLjExIC0wLjgzbC0wLjg5IDAuNTMgLTAuODggLTEuNTNhMS42IDEuNiAwIDAgMCAtMi4xOCAtMC42IDEuNyAxLjcgMCAwIDAgLTAuNiAwLjU5bC0xLjA2IDEuODRhMC43NiAwLjc2IDAgMCAwIDAuNCAxXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjIuNjQgMTguMTNhMC43NSAwLjc1";
t.characters = t.characters + add;
return { part: 44, addLen: add.length, len: t.characters.length, expect: 22500 };
