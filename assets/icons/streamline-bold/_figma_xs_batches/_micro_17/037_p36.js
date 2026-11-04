const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjI0IDAgMC4yNyAwLjI3IDAgMCAxIC0wLjE0IC0wLjE5TDQuOSA2LjI5YTAuMjEgMC4yMSAwIDAgMSAwIC0wLjIgMC4yNSAwLjI1IDAgMCAxIDAuMjQgLTAuMDloNy4xYTAuMjMgMC4yMyAwIDAgMSAwLjE5IDAuMDkgMC4yNSAwLjI1IDAgMCAxIDAuMDUgMC4yMlptNS4wOCAtMS4yMWExIDEgMCAwIDAgLTEuNjEgMCAzLjYyIDMuNjIgMCAwIDEgLTAuODkgMC44NiAwLjI2IDAuMjYgMCAwIDEgLTAuMjkgMCAwLjI2IDAuMjYgMCAwIDEgLTAuMSAtMC4yNmwxLjEgLTQuNzlhMC4yNSAwLjI1IDAgMCAxIDAuMjQgLTAuMmgzLjU2YTAuMjUgMC4yNSAwIDAgMSAwLjIgMC4wOSAwLjI4IDAuMjggMCAwIDEgMC4wNSAwLjJsLTAuODEgNC44OWEwLjI5IDAuMjkgMCAwIDEg";
t.characters = t.characters + add;
return { part: 36, addLen: add.length, len: t.characters.length, expect: 18500 };
