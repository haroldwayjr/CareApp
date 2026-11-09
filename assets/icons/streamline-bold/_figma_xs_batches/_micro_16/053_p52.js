const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NDE0MiAtMC4zMzU4IDAuNzUgLTAuNzUgMC43NXMtMC43NSAtMC4zMzU4IC0wLjc1IC0wLjc1di0wLjVjMCAtMC40MTQyIC0wLjMzNTc5IC0wLjc1IC0wLjc1IC0wLjc1cy0wLjc1IDAuMzM1OCAtMC43NSAwLjc1djAuNWMwIDEuMjQyNiAxLjAwNzM2IDIuMjUgMi4yNSAyLjI1IDEuMjQyNiAwIDIuMjUgLTEuMDA3NCAyLjI1IC0yLjI1VjEzYzAgLTAuMjY2NyAwLjMzODkgLTAuNzUgMS4xMjUgLTAuNzUgMC43ODYyIDAgMS4xMjUgMC40ODMzIDEuMTI1IDAuNzUgMCAwLjQxNDIgMC4zMzU4IDAuNzUgMC43NSAwLjc1czAuNzUgLTAuMzM1OCAwLjc1IC0wLjc1YzAgLTAuMjY2NyAwLjMzODkgLTAuNzUgMS4xMjUgLTAuNzVzMS4xMjUgMC40ODMzIDEuMTI1IDAuNzVj";
t.characters = t.characters + add;
return { part: 52, addLen: add.length, len: t.characters.length, expect: 26500 };
