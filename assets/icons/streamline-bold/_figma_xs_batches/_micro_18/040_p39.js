const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCAxLjUyIDAgMS4wOSAxLjA5IDAgMCAwIDAuMjQgLTEuMTZjMCAtMC4wNiAtMC4wOSAtMC4xOSAtMC4xNyAtMC4xMWwtMC4yMSAwLjIxYTAuODcgMC44NyAwIDAgMSAtMS4yMyAtMS4yM2wwLjkxIC0wLjkxYTAuODcgMC44NyAwIDAgMSAxLjIzIDBsMC40NiAwLjQ1YTIuODEgMi44MSAwIDAgMSAtNCA0bC0yLjY1IC0yLjc3YTIuODEgMi44MSAwIDEgMSA0IC00Wm04LjQ5IC0wLjNhMC44NSAwLjg1IDAgMCAxIC0wLjI1IDAuNjEgMC44OCAwLjg4IDAgMCAxIC0wLjYyIDAuMjZoLTIuODZjLTAuMTkgMCAtMC4yOCAwLjE3IC0wLjE4IDAuMjhsMSAxYTAuODcgMC44NyAwIDEgMSAtMS4yMyAxLjIzbC01LjUxIC01LjUxYTAuODcgMC44NyAwIDAgMSAwIC0xLjIz";
t.characters = t.characters + add;
return { part: 39, addLen: add.length, len: t.characters.length, expect: 20000 };
