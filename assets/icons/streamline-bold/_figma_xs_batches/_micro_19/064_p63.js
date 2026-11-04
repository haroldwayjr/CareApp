const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MS41MyA1LjI5IDUuMjkgMCAwIDEgLTAuNTUgLTAuNyA2LjI3IDYuMjcgMCAwIDAgLTIuNDEgMS41OEMtMSAxNy42NSAwLjM0IDIzLjE4IDAuNjkgMjMuNTNBNiA2IDAgMCAwIDMuNCAyNGExMC43MSAxMC43MSAwIDAgMCA3LjY2IC0zLjI0IDYuMzIgNi4zMiAwIDAgMCAxLjU5IC0yLjQ0XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTAuNTkgMTIuNTFjLTAuMDggLTAuNzQgLTAuMTIgLTEuNDYgLTAuMTMgLTIuMTVhMTQuODkgMTQuODkgMCAwIDAgLTIuMjEgLTIuNDUgMC43NSAwLjc1IDAgMCAxIDAuOSAtMS4yIDEwLjA5IDEwLjA5IDAgMCAxIDEuNDEgMS4zOCAxMy43IDEzLjcgMCAwIDEgMC43";
t.characters = t.characters + add;
return { part: 63, addLen: add.length, len: t.characters.length, expect: 32000 };
