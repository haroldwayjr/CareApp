const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NzUgMC43NSAwIDAgMSAwLjc1IC0wLjc1aDJhMC43NSAwLjc1IDAgMSAxIDAgMS41aC0yYTAuNzUgMC43NSAwIDAgMSAtMC43NSAtMC43NW02Ljc1IDQuNzVoLTUuNzVhMC43NSAwLjc1IDAgMCAxIDAgLTEuNWg1Ljc1YTAuNzUgMC43NSAwIDAgMSAwIDEuNW0tNS4xMyAxMC4yYy0wLjI1IDEuNzcgLTAuNDUgMi4wNSAtMC45NCAyLjA1SDQuMTFhMC4yOCAwLjI4IDAgMCAxIC0wLjIgLTAuMSAwLjI2IDAuMjYgMCAwIDEgMCAtMC4yMSAxMC4zNCAxMC4zNCAwIDAgMCAwLjI3IC0xLjY5IDQuNjEgNC42MSAwIDAgMSAwLjI4IC0xLjQ5aDlhMC4yNSAwLjI1IDAgMCAxIDAuMjQgMC4zMWMtMC4xNiAwLjQzIC0wLjIyIDAuNzggLTAuMjcgMS4xM1wiIGZpbGw9XCIjMDAw";
t.characters = t.characters + add;
return { part: 20, addLen: add.length, len: t.characters.length, expect: 10500 };
