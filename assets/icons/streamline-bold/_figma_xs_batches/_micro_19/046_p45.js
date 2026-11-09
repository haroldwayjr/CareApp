const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IDAgMSAwIC0xLjMgMC43NWwxIDEuODRhMC4xMSAwLjExIDAgMCAxIC0wLjEgMC4xaC0xLjg5di0xLjE3YTAuNzcgMC43NyAwIDAgMCAtMC40OCAtMC42OSAwLjc0IDAuNzQgMCAwIDAgLTAuODEgMC4xOEwxNy4yNiAyMWEwLjc4IDAuNzggMCAwIDAgLTAuMjEgMC41NCAwLjcyIDAuNzIgMCAwIDAgMC4yMyAwLjUzbDEuODMgMS43OGEwLjc0IDAuNzQgMCAwIDAgMC41MiAwLjIyIDAuNTkgMC41OSAwIDAgMCAwLjI5IC0wLjA3IDAuNzQgMC43NCAwIDAgMCAwLjQ2IC0wLjY5di0wLjk1aDEuOTFhMS42MSAxLjYxIDAgMCAwIDEuMzkgLTIuNFpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIm0xMS4xOCAx";
t.characters = t.characters + add;
return { part: 45, addLen: add.length, len: t.characters.length, expect: 23000 };
