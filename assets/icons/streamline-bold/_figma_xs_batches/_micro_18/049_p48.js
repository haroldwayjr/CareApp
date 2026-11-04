const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDAuMjQgMC4yNCAwIDAgMSAtMC4yMyAwLjIgMC4yNSAwLjI1IDAgMCAxIC0wLjI1IC0wLjE4bC0wLjggLTIuOTJhMC43NSAwLjc1IDAgMCAwIC0xLjQ0IDBMMTQgMTMuNzFhMC4yNSAwLjI1IDAgMCAxIC0wLjI1IDAuMTggMC4yNCAwLjI0IDAgMCAxIC0wLjIzIC0wLjIgMTIuMDggMTIuMDggMCAwIDEgLTAuMjUgLTIuNjJWOC40OWEwLjc1IDAuNzUgMCAwIDAgLTEuNSAwdjIuNThjLTAuMDIgMi43MyAwLjU5IDQuODQgMS43IDUuOTNcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk01LjUgMTcuMjRIN2EyLjc1IDIuNzUgMCAwIDAgMi4wNSAtNC41OCAwLjI1IDAuMjUgMCAwIDEgMCAtMC4zNEEyLjc1";
t.characters = t.characters + add;
return { part: 48, addLen: add.length, len: t.characters.length, expect: 24500 };
