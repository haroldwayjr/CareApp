const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NCAwIDEgMCAyLjQ4IDBcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIm0yMC41NCAxNS41NiAtMC4yMSAtMC4yMWMtMS4yNSAtMS4yOCAtMS43NiAtMS44MSAtMS43NiAtMy40NVY5LjVjMCAtMy43IC0yIC02LjUzIC01IC03LjNhMC40OCAwLjQ4IDAgMCAxIC0wLjM3IC0wLjQ4di0wLjQ3YTEuMjUgMS4yNSAwIDAgMCAtMi41IDB2MC40N2EwLjQ4IDAuNDggMCAwIDEgLTAuMzcgMC40OGMtMyAwLjc3IC01IDMuNiAtNSA3LjN2Mi40YzAgMS42NCAtMC41MSAyLjE3IC0xLjc2IDMuNDVsLTAuMjEgMC4yMUEwLjc1IDAuNzUgMCAwIDAgNCAxNi44M2gxNmEwLjc1IDAuNzUgMCAwIDAgMC41NCAtMS4yN1wi";
t.characters = t.characters + add;
return { part: 61, addLen: add.length, len: t.characters.length, expect: 31000 };
