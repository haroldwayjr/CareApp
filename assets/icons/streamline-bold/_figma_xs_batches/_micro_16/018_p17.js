const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NTI3IDAuNDY5NzIgLTIuNDQzMiAwLjQ4MjQ5IC00LjQxNzUgMi40NDQyNCAtNC45MTAxIDQuOTA5MiAtMC4wNzAxIDAuMzUwNSAtMC4zNzc5IDAuNjAzNCAtMC43MzU0IDAuNjAzNSAtMC4zNTc2IDAgLTAuNjY1MyAtMC4yNTI5IC0wLjczNTQgLTAuNjAzNSAtMC40OTI2IC0yLjQ2NTA5IC0yLjQ2NyAtNC40MjY3MiAtNC45MTAxIC00LjkwOTIgLTAuMjYyOSAtMC4wNTE5OSAtMC40NjM3IC0wLjIzNjU1IC0wLjU1MjcgLTAuNDY5NzIgLTAuMDExMSAtMC4wMjg3OSAtMC4wMjA4IC0wLjA1ODI0IC0wLjAyODQgLTAuMDg4ODcgLTAuMDAzMSAtMC4wMTI5NyAtMC4wMDYzIC0wLjAyNTg4IC0wLjAwODggLTAuMDM5MDZMMTEuNSA2LjI1Nzgxdi0wLjAxNTYyYzAgLTAu";
t.characters = t.characters + add;
return { part: 17, addLen: add.length, len: t.characters.length, expect: 9000 };
