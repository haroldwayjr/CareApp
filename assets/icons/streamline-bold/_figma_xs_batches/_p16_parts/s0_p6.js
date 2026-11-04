const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NyAwIDAgMCAtMy40NSAtMS41OSAwLjI1IDAuMjUgMCAwIDEgLTAuMTkgLTAuMTIgNy42OCA3LjY4IDAgMCAwIC0xNC4xIDIuMyAwLjI1IDAuMjUgMCAwIDEgLTAuMjIgMC4xNiA0LjY2IDQuNjYgMCAwIDAgLTIuNTggMUE0LjU5IDQuNTkgMCAwIDAgMCAxMS42MWE0LjMzIDQuMzMgMCAwIDAgMS4yNCAzLjIxIDUuNTggNS41OCAwIDAgMCAzLjYgMS4zOCAxIDEgMCAwIDAgMSAtMSAxIDEgMCAwIDAgLTEgLTEgMy4zNiAzLjM2IDAgMCAxIC0yLjE3IC0wLjgxQTIuMzUgMi4zNSAwIDAgMSAyIDExLjYxYTIuNTggMi41OCAwIDAgMSAzLjEyIC0yLjUzIDEgMSAwIDAgMCAwLjgxIC0wLjE5IDEgMSAwIDAgMCAwLjM5IC0wLjczIDUuNjggNS42OCAwIDAgMSAxMC44MiAt";
t.characters = t.characters + add;
return { step: 0, part: 6, addLen: add.length, len: t.characters.length };
