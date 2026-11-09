const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "LjI2IDAgMCAwIC0wLjI0IDAuMThDNy40NSAxLjA5IDYuMzcgNSA2LjI2IDUuNDJhMC4xMyAwLjEzIDAgMCAwIDAgMC4wNlY5LjNhMC4yNCAwLjI0IDAgMCAwIDAuMTEgMC4yMSA0Ljk0IDQuOTQgMCAwIDAgMi4yOSAwLjc5aDAuNGE0LjY4IDQuNjggMCAwIDAgMi4wNiAtMC40NyAwLjI2IDAuMjYgMCAwIDAgMC4xNCAtMC4yM1pcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk00Ljc1IDUuMzVhMS4yMyAxLjIzIDAgMCAxIDAgLTAuMkw2LjEgMC4zMmEwLjI0IDAuMjQgMCAwIDAgMCAtMC4yMiAwLjI2IDAuMjYgMCAwIDAgLTAuMiAtMC4xSDMuMTJhMS41MSAxLjUxIDAgMCAwIC0xLjM2IDFMMCA1LjA3";
t.characters = t.characters + add;
return { part: 35, addLen: add.length, len: t.characters.length, expect: 18000 };
