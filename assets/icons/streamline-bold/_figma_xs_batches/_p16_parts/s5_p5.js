const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "LjE4OTMgMC43NDkwMiAtMC4xNTUzIDAuMjk4NSAwLjAzODkgMC41NzAzNCAwLjE5MiAwLjc1ODc5IDAuNDI2OCAwLjEwNzU2IDAuMTMzOSAwLjI2MzI3IDAuMjIwOCAwLjQzMzU5IDAuMjQzMSAwLjE2NzA2IDAuMDIxOCAwLjMzNTY3IC0wLjAyMTUgMC40NzI2NiAtMC4xMTkxbDIuMTUzMzIgLTIuMTUzMzNjMC4wOTU5MyAtMC4xMzYzOSAwLjEzNzgyIC0wLjMwNDAyIDAuMTE2MjEgLTAuNDY5NzIgLTAuMDIyMzQgLTAuMTcwNDMgLTAuMTEwMDggLTAuMzI2MDEgLTAuMjQ0MTQgLTAuNDMzNiAtMC4yMzQ0OSAtMC4xODg0MyAtMC4zODY4NyAtMC40NjA0OCAtMC40MjU3OCAtMC43NTg3OSAtMC4wMzg4NyAtMC4yOTgzNSAwLjAzODM5IC0wLjYwMDUgMC4yMTY4IC0w";
t.characters = t.characters + add;
return { step: 5, part: 5, addLen: add.length, len: t.characters.length };
