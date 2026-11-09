const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MzU4IDAuNzUgMC43NSAwLjc1aDMuMzYxNGMwLjQxNDIgLTAuMDAwMSAwLjc1IC0wLjMzNTggMC43NSAtMC43NSAtMC4wMDAxIC0wLjQxNDIgLTAuMzM1OSAtMC43NSAtMC43NSAtMC43NXpNNS45MDcyMyA0LjM1ODRjLTAuNDE0MSAwIC0wLjc0OTgxIDAuMzM1OTUgLTAuNzUgMC43NXYwLjkyMTg3YzAuMDAwMSAwLjQxNDEzIDAuMzM1ODUgMC43NSAwLjc1IDAuNzVzMC43NDk4OSAtMC4zMzU4NyAwLjc1IC0wLjc1VjUuODU4NGgxLjI2NDY1djQuOTUyMUg2LjgyOTFjLTAuNDE0MjEgMCAtMC43NSAwLjMzNTggLTAuNzUgMC43NSAwIDAuNDE0MyAwLjMzNTc5IDAuNzUgMC43NSAwLjc1aDMuNjg2NWMwLjQxNDIgMCAwLjc1IC0wLjMzNTcgMC43NSAtMC43NSAwIC0w";
t.characters = t.characters + add;
return { part: 82, addLen: add.length, len: t.characters.length, expect: 41500 };
