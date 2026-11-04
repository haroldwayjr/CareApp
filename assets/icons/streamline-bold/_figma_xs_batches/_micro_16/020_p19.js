const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MzU4IC0wLjc1IDAuNzUgMCAwLjQxNDIgMC4zMzU3OSAwLjc1IDAuNzUgMC43NWg0Ljc1YzAuNDE0MiAwIDAuNzUgLTAuMzM1OCAwLjc1IC0wLjc1cy0wLjMzNTggLTAuNzUgLTAuNzUgLTAuNzV6bTAgLTMuNzQ5OThjLTAuNDE0MTkgMCAtMC43NDk5NyAwLjMzNTgxIC0wLjc1IDAuNzUgMCAwLjQxNDIxIDAuMzM1NzkgMC43NSAwLjc1IDAuNzVoMC43NWMwLjQxNDIxIDAgMC43NSAtMC4zMzU3OSAwLjc1IC0wLjc1IC0wLjAwMDAzIC0wLjQxNDE5IC0wLjMzNTgxIC0wLjc1IC0wLjc1IC0wLjc1em0yLjEyNyAtMC4wODU5NCAtMC4wMDEgMC4wMDk3N2MwLjAwMDEgLTAuMDA2OTIgMC4wMDA3IC0wLjAxMzk3IDAuMDAxIC0wLjAyMDUxelwiIHN0cm9rZS13aWR0aD1c";
t.characters = t.characters + add;
return { part: 19, addLen: add.length, len: t.characters.length, expect: 10000 };
