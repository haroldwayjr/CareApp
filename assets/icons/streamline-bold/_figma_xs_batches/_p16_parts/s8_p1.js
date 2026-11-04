const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MC4yMyAwIDAgMSAwLjA3IC0wLjE3IDIuMzIgMi4zMiAwIDAgMCAwLjYyIC0xLjI2IDAuMzEgMC4zMSAwIDAgMSAwIC0wLjEyIDEuMTkgMS4xOSAwIDAgMCAwLjIgLTAuNDcgMS40NCAxLjQ0IDAgMCAwIC0wLjA5IC0xIDAuMjIgMC4yMiAwIDAgMSAwIC0wLjIxIDMuOTQgMy45NCAwIDAgMCAwLjM0IC0yYy0wLjE5IC0wLjk0IC0xLjM4IC0xLjMxIC0yLjQzIC0xLjMzYTIuODYgMi44NiAwIDAgMCAtMi4xNiAwLjY2IDAuMzIgMC4zMiAwIDAgMSAtMC4xMiAwLjA4IDEuMSAxLjEgMCAwIDAgLTAuNjMgMC40MSAyLjYzIDIuNjMgMCAwIDAgMCAyLjE2IDAuMjUgMC4yNSAwIDAgMSAwIDAuMTkgMS40NCAxLjQ0IDAgMCAwIC0wLjExIDEgMS4xOSAxLjE5IDAgMCAwIDAu";
t.characters = t.characters + add;
return { step: 8, part: 1, addLen: add.length, len: t.characters.length };
