const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "aCBkPVwiTTIzLjg5IDUuODNhMC4xOCAwLjE4IDAgMCAwIC0wLjIgMGwtNi4yIDYuMmEwLjI0IDAuMjQgMCAwIDAgMCAwLjM2bDUgNWEwLjc1IDAuNzUgMCAwIDEgLTEuMDYgMS4wNmwtNSAtNWEwLjI1IDAuMjUgMCAwIDAgLTAuMzYgMGwtMi4xMyAyLjEzYTIuNzYgMi43NiAwIDAgMSAtMy44OSAwbC0yLjEyIC0yLjA5YTAuMjQgMC4yNCAwIDAgMCAtMC4zNiAwbC01IDVhMC43NSAwLjc1IDAgMCAxIC0xLjA2IC0xLjA2bDUgLTVhMC4yNCAwLjI0IDAgMCAwIDAgLTAuMzZsLTYuMiAtNi4yYTAuMTggMC4xOCAwIDAgMCAtMC4yIDBBMC4xOCAwLjE4IDAgMCAwIDAgNnYxMmEyIDIgMCAwIDAgMiAyaDIwYTIgMiAwIDAgMCAyIC0yVjZhMC4xOCAwLjE4IDAgMCAwIC0w";
t.characters = t.characters + add;
return { step: 4, part: 2, addLen: add.length, len: t.characters.length };
