const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "OTUgLTAuMTcxODggMC42NTgyIC0wLjEyNzc5IDAuMjIwMSAtMC4zMDUzIDAuMzY5NyAtMC40ODgyOCAwLjQ1MDJsLTAuMDAxOTUgMC4wMDFjLTAuNDQ3ODcgMC4xOTc2IC0wLjgxNjgzIDAuNTEyIC0xLjA4Mzk5IDAuODkwNkgyLjVjLTEuMzgwNzEgMCAtMi41IC0xLjExOTMgLTIuNSAtMi41VjIuNTAyOTNDMC4wMDAwMzI5ODUzIDEuMTIyMjUgMS4xMTkzMSAwLjAwMjkyOTY5IDIuNSAwLjAwMjkyOTY5ek01LjEwNjQ1IDExLjVjMC4wNTc5OCAwLjQzMTMgMC4xNjc3NCAwLjk4MDYgMC4zNzQwMiAxLjUxOTUgMC4yMTU2OSAwLjU2MzQgMC41MjE3MiAxLjA3NzQgMC45NDUzMSAxLjQ0NjMgMC4yNzg4OSAwLjI0MjkgMC42MjU1OSAwLjQzNCAxLjA2ODM2IDAuNTMz";
t.characters = t.characters + add;
return { part: 35, addLen: add.length, len: t.characters.length, expect: 18000 };
