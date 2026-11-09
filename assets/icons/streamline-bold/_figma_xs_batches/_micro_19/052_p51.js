const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MSAwIDAgMCAtMS42IDEuMiAxLjQ2IDEuNDYgMCAwIDEgMC4zIDAuOSAxLjUgMS41IDAgMCAxIC0yLjcgMC45IDEgMSAwIDAgMCAtMS42IDEuMiAzLjQ2IDMuNDYgMCAwIDAgMi41NiAxLjM5IDAuMjcgMC4yNyAwIDAgMSAwLjE5IDAuMSAwLjI1IDAuMjUgMCAwIDEgMCAwLjIxIDMgMyAwIDAgMSAtMS4wOCAxLjdsLTAuMzkgMC4zYTAuMzEgMC4zMSAwIDAgMSAtMC40NCAtMC4wNUE0LjYxIDQuNjEgMCAwIDAgMTUgMTZIOWE0LjYxIDQuNjEgMCAwIDAgLTMuNiAxLjcyIDAuMzEgMC4zMSAwIDAgMSAtMC40NCAwLjA1bC0wLjM5IC0wLjNhMyAzIDAgMCAxIC0xLjA4IC0xLjcgMC4yNSAwLjI1IDAgMCAxIDAgLTAuMjEgMC4yNyAwLjI3IDAgMCAxIDAuMTkgLTAuMSAz";
t.characters = t.characters + add;
return { part: 51, addLen: add.length, len: t.characters.length, expect: 26000 };
