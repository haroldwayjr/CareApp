const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MDg1OSAwYy0wLjU1MjE2IDAgLTAuOTk5OCAwLjQ0Nzg4IC0xIDEgMCAwLjU1MjI4IDAuNDQ3NzEgMSAxIDEgMC41NTIwNiAtMC4wMDAyNyAxIC0wLjQ0Nzg4IDEgLTEgLTAuMDAwMTkgLTAuNTE3NjYgLTAuMzk0MjIgLTAuOTQzMDIgLTAuODk4NDQgLTAuOTk0MTR6bTMuMzA5NTIgMGMtMC41NTIxIDAgLTAuOTk5OCAwLjQ0Nzg4IC0xIDEgMCAwLjU1MjI4IDAuNDQ3OCAxIDEgMSAwLjU1MjEgLTAuMDAwMjcgMSAtMC40NDc4OCAxIC0xIC0wLjAwMDEgLTAuNTE3NjYgLTAuMzk0MiAtMC45NDMwMiAtMC44OTg0IC0wLjk5NDE0elwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9jYWtlIiwgInN2ZyI6";
t.characters = t.characters + add;
return { part: 37, addLen: add.length, len: t.characters.length, expect: 19000 };
