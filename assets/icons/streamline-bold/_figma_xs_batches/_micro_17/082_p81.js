const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MC4zMzU4IC0wLjc1IDAuNzUgMC4wMDAwNiAwLjQxNDIgMC4zMzU4MiAwLjc1IDAuNzUgMC43NUgxOC4wOTM4YzAuNDEzOSAtMC4wMDAzIDAuNzQ5OSAtMC4zMzYgMC43NSAtMC43NSAwIC0wLjQxNCAtMC4zMzYxIC0wLjc0OTcgLTAuNzUgLTAuNzV6bTAgLTMuNTcxM2MtMC40MTQyMiAwIC0wLjc1IDAuMzM1OCAtMC43NSAwLjc1IDAuMDAwMjYgMC40MTQgMC4zMzU5NSAwLjc1IDAuNzUgMC43NUgxOC4wOTM4YzAuNDEzOCAtMC4wMDAyIDAuNzQ5NyAtMC4zMzYyIDAuNzUgLTAuNzUgMCAtMC40MTQgLTAuMzM2MSAtMC43NDk3IC0wLjc1IC0wLjc1em04LjgyNDE3IC0zLjU3MjJjLTAuNDE0MSAwIC0wLjc0OTkgMC4zMzU4IC0wLjc1IDAuNzUgMCAwLjQxNDIgMC4z";
t.characters = t.characters + add;
return { part: 81, addLen: add.length, len: t.characters.length, expect: 41000 };
