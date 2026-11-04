const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCAxIDEuMjMgLTAuODVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0yMiAxMkE3IDcgMCAwIDAgOC4zNCA5Ljg0YTAuMjMgMC4yMyAwIDAgMSAtMC4yMiAwLjE3IDUuNTIgNS41MiAwIDAgMCAtNSA0LjE4IDAuMjUgMC4yNSAwIDAgMCAwLjI0IDAuMzFINWEwLjI2IDAuMjYgMCAwIDAgMC4yNCAtMC4xN0EzLjUxIDMuNTEgMCAwIDEgOC41IDEybDAuNSAwYTEgMSAwIDAgMCAxLjExIC0wLjgzQTUgNSAwIDAgMSAyMCAxMmwwIDAuNDRhMSAxIDAgMCAwIDAuNSAxQTMgMyAwIDAgMSAxOSAxOWgtMi44NWEwLjI1IDAuMjUgMCAwIDAgLTAuMiAwLjEgMC4yMiAwLjIyIDAgMCAwIDAgMC4yMiAyLjYx";
t.characters = t.characters + add;
return { part: 79, addLen: add.length, len: t.characters.length, expect: 40000 };
