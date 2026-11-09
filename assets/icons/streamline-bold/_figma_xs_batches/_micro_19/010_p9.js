const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "Mjc2IC0wLjE5MzYxIC0wLjU2NDkxIC0wLjIzMTEyIC0wLjIwMjE2IC0wLjAzNzUxIC0wLjQwOTg3IC0wLjAzMzA2IC0wLjYxMDIzIDAuMDEzMDggLTAuMjAwMzYgMC4wNDYxMyAtMC4zODkwOTkgMC4xMzI5NiAtMC41NTQ0OTQgMC4yNTUxcy0wLjMwMzkxNSAwLjI3Njk4IC0wLjQwNjk1NyAwLjQ1NDljLTAuMTAzMDQzIDAuMTc3OTIgLTAuMTY4NDA4MiAwLjM3NTEyIC0wLjE5MjAzNyAwLjU3OTM3IC0wLjAyMzYyODggMC4yMDQyNCAtMC4wMDUwMTY2IDAuNDExMTYgMC4wNTQ2ODEgMC42MDc5IDAuMDU5Njk3IDAuMTk2NzUgMC4xNTkyMDUgMC4zNzkxMyAwLjI5MjM0NCAwLjUzNTggMC4xMzMxMzkgMC4xNTY2OCAwLjI5NzA2NyAwLjI4NDMxIDAuNDgxNjAzIDAu";
t.characters = t.characters + add;
return { part: 9, addLen: add.length, len: t.characters.length, expect: 5000 };
