const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "IC0wLjMzNTc5IC0wLjc1IC0wLjc1di0zLjI1YzAgLTAuNzI5MzUgMC4yODk5MzkgLTEuNDI4NjEgMC44MDU2NjQgLTEuOTQ0MzRDMS4zMjEzOSAxLjkxNDk0IDIuMDIwNjUgMS42MjUgMi43NSAxLjYyNXpNNy44NzUgMTMuNzc4M2MtMC40MTQxOSAwIC0wLjc0OTk3IDAuMzM1OCAtMC43NSAwLjc1IDAgMC40MTQyIDAuMzM1NzkgMC43NSAwLjc1IDAuNzVoN2MwLjQxNDIgMCAwLjc1IC0wLjMzNTggMC43NSAtMC43NXMtMC4zMzU4IC0wLjc1IC0wLjc1IC0wLjc1ek0xNy43NSAwYzAuMzU3NiAwIDAuNjY1MyAwLjI1Mjg3NiAwLjczNTQgMC42MDM1MTYgMC40OTI2IDIuNDY1MDc0IDIuNDY3IDQuNDI2NzA0IDQuOTEwMSA0LjkwOTE4NCAwLjI2MjYgMC4wNTE5MyAw";
t.characters = t.characters + add;
return { step: 1, part: 7, addLen: add.length, len: t.characters.length };
