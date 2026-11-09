const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MzJhNC44NyA0Ljg3IDAgMCAxIC0wLjM2IC0wLjU5IDUuMTggNS4xOCAwIDAgMSAtMC4yOSAtMy41MmMwIC0wLjA3IC0wLjExIC0wLjE0IC0wLjE2IC0wLjIybC0wLjU4IDBjLTAuNjMgMC41NiAtMS4yNiAxLjA3IC0xLjg3IDEuNTJhMTQuNiAxNC42IDAgMCAwIC0wLjcxIDMuMjMgMC43NCAwLjc0IDAgMCAxIC0wLjc1IDAuNzMgMC43NSAwLjc1IDAgMCAxIC0wLjc0IC0wLjc2IDEwLjYzIDEwLjYzIDAgMCAxIDAuMyAtMiAxMy42MSAxMy42MSAwIDAgMSAtMy4wOSAxLjMyIDAuNzUgMC43NSAwIDAgMSAtMC45MyAtMC41MiAwLjc0IDAuNzQgMCAwIDEgMC41MiAtMC45MiAxNS4xMyAxNS4xMyAwIDAgMCA1LjIyIC0yLjg2IDUuNTggNS41OCAwIDAgMSAtMi43NCAt";
t.characters = t.characters + add;
return { part: 62, addLen: add.length, len: t.characters.length, expect: 31500 };
