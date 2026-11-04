const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "NCAwLjYwMDU4IC0wLjAwMDAyIDAuMjA2MDkgLTAuMDQwMjUgMC40MTAyMSAtMC4xMTkxNCAwLjYwMDU5IC0wLjA3ODkxIDAuMTkwNDEgLTAuMTk1MDQgMC4zNjMwOSAtMC4zNDA4MiAwLjUwODc5IC0wLjI5NDA4IDAuMjk0MiAtMC40NTg5IDAuNjkzNCAtMC40NTg5OSAxLjEwOTQgMCAwLjQxNTkgMC4xNjUwMSAwLjgxNTEgMC40NTg5OSAxLjEwOTNsNC40Mzg0NCA0LjQzNzZjMC4yOTQyIDAuMjk0MSAwLjY5MzQgMC40NTk5IDEuMTA5NCAwLjQ1OTkgMC40MTYxIDAgMC44MTUxIC0wLjE2NTggMS4xMDk0IC0wLjQ1OTkgMC4xNDU3IC0wLjE0NTkgMC4zMTkzIC0wLjI2MSAwLjUwOTcgLTAuMzM5OSAwLjE5MDQgLTAuMDc4OCAwLjM5NDYgLTAuMTIwMSAwLjYwMDYg";
t.characters = t.characters + add;
return { part: 67, addLen: add.length, len: t.characters.length, expect: 34000 };
