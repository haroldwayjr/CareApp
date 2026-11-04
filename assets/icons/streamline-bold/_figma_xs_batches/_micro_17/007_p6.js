const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDcgMCAwIDAgLTEzLjY2IC0yIDAuMjMgMC4yMyAwIDAgMSAtMC4yMiAwLjE3IDUuNSA1LjUgMCAwIDAgLTEuNTcgMTAuNTkgMC4yNSAwLjI1IDAgMCAwIDAuMjggLTAuMDcgMC4yNCAwLjI0IDAgMCAwIDAgLTAuMjlBMi41IDIuNSAwIDAgMSA2LjUgMTlhMiAyIDAgMCAxIDAgLTAuNDMgMC4yNSAwLjI1IDAgMCAwIC0wLjEgLTAuMjRBMy41IDMuNSAwIDAgMSA4LjUgMTJsMC41IDBhMSAxIDAgMCAwIDEuMTEgLTAuODNBNSA1IDAgMCAxIDIwIDEybDAgMC40M2ExIDEgMCAwIDAgMC41IDEgMyAzIDAgMCAxIDAuODggNC40NSAwLjI4IDAuMjggMCAwIDAgMCAwLjI1IDIuNTIgMi41MiAwIDAgMSAwIDEuODIgMC4yNSAwLjI1IDAgMCAwIDAuMDcgMC4yOCAwLjI2IDAu";
t.characters = t.characters + add;
return { part: 6, addLen: add.length, len: t.characters.length, expect: 3500 };
