const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MTA5NjUgMC4wMjY0IDAuMTE4MTdsMC4wMDEgMC4wMDM5YzAuMDEyNiAwLjA1MTIgMC4wMjY3IDAuMDk5MDkgMC4wNDEgMC4xNDM1NmwwLjA0MyAwLjEyMzA0YzAuMjYxOSAwLjY4MjkzIDAuODYxNiAxLjI0NTAxIDEuNjYyMSAxLjQwMzMyIDEuODQ3MyAwLjM2NDgzIDMuMzU2NyAxLjg2MTIyIDMuNzMwNCAzLjczMTQybDAuMDQ2OSAwLjE5MzRDMTUuODY4OSAxMy4zMzI3IDE2Ljc0MjggMTQgMTcuNzUgMTRoMC4wMDFjMC4zNTY4IC0wLjAwMDIgMC42OTYyIC0wLjA4NTcgMC45OTkgLTAuMjM2M3Y0LjA5NzZINy4yNDgwNWMtMC4zMjY2MyAwLjAwMDIgLTAuNjE2IDAuMjEyMSAtMC43MTQ4NSAwLjUyMzUgLTAuMDk4MjYgMC4zMTExIDAuMDE1NjQgMC42NTA2IDAu";
t.characters = t.characters + add;
return { part: 13, addLen: add.length, len: t.characters.length, expect: 7000 };
