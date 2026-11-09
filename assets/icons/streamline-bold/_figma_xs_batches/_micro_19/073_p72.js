const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "LjE1MiAtMC4wMDAwOCAwLjI4MjQgLTAuMTA5MTUgMC4zMTI1IC0wLjI1NjgzbDAuMDA1OCAtMC4wNjU0M1YwLjc1MTk1M2MwLjAwMDIgLTAuNDEzOTQxIDAuMzM2MSAtMC43NDk3Mzk3NyAwLjc1IC0wLjc0OTk5OTg4bTQuOTc2NiAwYzAuNDE0IDAuMDAwMDg4NTkgMC43NDk5IDAuMzM1OTUyODggMC43NSAwLjc0OTk5OTg4VjYuNDMzNTloMC44NTM1YzAuNDE0IDAuMDAwMSAwLjc0OTggMC4zMzYwMiAwLjc1IDAuNzUgMCAwLjQxNDE2IC0wLjMzNTkgMC43NDk5MSAtMC43NSAwLjc1aC0zLjIwNmMtMC40MTQzIDAgLTAuNzUgLTAuMzM1NzggLTAuNzUgLTAuNzUgMC4wMDAyIC0wLjQxNDA0IDAuMzM1OSAtMC43NSAwLjc1IC0wLjc1aDAuODUyNVYzLjA4MDA4Yy0w";
t.characters = t.characters + add;
return { part: 72, addLen: add.length, len: t.characters.length, expect: 36500 };
