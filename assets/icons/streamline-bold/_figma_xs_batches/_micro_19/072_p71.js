const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MDAwMDg4NTkgMC43NDk5IDAuMzM1OTUyODggMC43NSAwLjc0OTk5OTg4VjYuNDMzNTloMC44NTM1YzAuNDE0MSAwLjAwMDEgMC43NDk4IDAuMzM2MDIgMC43NSAwLjc1IDAgMC40MTQxNiAtMC4zMzU4IDAuNzQ5OTEgLTAuNzUgMC43NWgtMy4yMDZjLTAuNDE0MiAwIC0wLjc1IC0wLjMzNTc4IC0wLjc1IC0wLjc1IDAuMDAwMiAtMC40MTQwNCAwLjMzNTkgLTAuNzUgMC43NSAtMC43NWgwLjg1MjVWMy4wODAwOGMtMC4xMDMzIDAuMDE4MjcgLTAuMjA5NyAwLjAzMDI2IC0wLjMxODMgMC4wMzAyN2gtMC41MzQyYy0wLjQxNDEgMCAtMC43NDk4IC0wLjMzNTk5IC0wLjc1IC0wLjc1IDAuMDAwMSAtMC40MTQxIDAuMzM1OSAtMC43NSAwLjc1IC0wLjc1aDAuNTM0MmMw";
t.characters = t.characters + add;
return { part: 71, addLen: add.length, len: t.characters.length, expect: 36000 };
