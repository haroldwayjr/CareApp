const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "IDAgMC43NSAtMC4zMzU4IDAuNzUgLTAuNzQ5OTcgMCAtMC40MTQyMSAtMC4zMzU4IC0wLjc1IC0wLjc1IC0wLjc1em0wIC0zLjI2MDc0Yy0wLjQxNDIyIDAgLTAuNzUgMC4zMzU3OSAtMC43NSAwLjc1czAuMzM1NzggMC43NSAwLjc1IDAuNzVoNS43ODkwNGMwLjQxNDIgMCAwLjc1IC0wLjMzNTc5IDAuNzUgLTAuNzVzLTAuMzM1OCAtMC43NSAtMC43NSAtMC43NXpNMTYuNjAyNSAwLjUwOTc2NmwwLjE2MzEgMC4xNDg0MzcgNS44NzIxIDUuODcyMDY3djAuMDAwOThjMC4wNjg1IDAuMDY4NTcgMC4xMyAwLjE0Mjc4IDAuMTg4NSAwLjIxODc1aC01LjUzMDNjLTAuMTk4OSAwIC0wLjM4OTYgLTAuMDc5MDcgLTAuNTMwMyAtMC4yMTk3MyAtMC4xNDA2IC0wLjE0MDY1";
t.characters = t.characters + add;
return { step: 8, part: 5, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
