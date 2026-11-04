const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IC0wLjkyOTU1IC0xLjcxMTRoLTAuNjg4NzFjLTAuNTUyMjggMCAtMSAtMC40NDc3MSAtMSAtMSAwIC0wLjU1MjI4IDAuNDQ3NzIgLTEgMSAtMWgyLjkzOTEzYzAuNTUyMjggMCAxLjAwMDAyIDAuNDQ3NzIgMS4wMDAwMiAxIDAgMC41NDM4IC0wLjQzNDA4IDAuOTg2MjIgLTAuOTc0NjQgMC45OTk2OWwwLjM1MzggMC42NTEzOSA1LjYxMDg0IC0xLjUzNDc4IC0wLjQ0MTggLTEuMjEzNTUgLTAuMDAwNSAtMC4wMDExN2MtMC4wNzE1IC0wLjE5NTgxIC0wLjEwMTIgLTAuNDA0NDcgLTAuMDg3IC0wLjYxMjUgMC4wMTQyIC0wLjIwODQzIDAuMDcyMSAtMC40MTE1NSAwLjE2OTggLTAuNTk2MTUgMC4wOTc4IC0wLjE4NDYyIDAuMjMzMyAtMC4zNDY2IDAuMzk3OCAtMC40";
t.characters = t.characters + add;
return { part: 76, addLen: add.length, len: t.characters.length, expect: 38500 };
