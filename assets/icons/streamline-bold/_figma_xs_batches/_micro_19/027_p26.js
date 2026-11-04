const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "LjM4YTEgMSAwIDAgMSAxIC0wLjg4aDMuNDZhMSAxIDAgMCAxIDEgMC44OGwwLjEgMC44NGEwLjI1IDAuMjUgMCAwIDEgLTAuMDYgMC4yIDAuMjYgMC4yNiAwIDAgMSAtMC4xOSAwLjA4SDkuNDJhMC4yNiAwLjI2IDAgMCAxIC0wLjE5IC0wLjA4IDAuMjUgMC4yNSAwIDAgMSAtMC4wNiAtMC4yWk01LjI1IDExYTAuNzYgMC43NiAwIDAgMSAwLjc1IC0wLjc1aDEyYTAuNzYgMC43NiAwIDAgMSAwLjc1IDAuNzV2MC41YTAuNzYgMC43NiAwIDAgMSAtMC43NSAwLjc1SDZhMC43NiAwLjc2IDAgMCAxIC0wLjc1IC0wLjc1Wm0wIDUuNWEwLjc2IDAuNzYgMCAwIDEgMC43NSAtMC43NWgxMmEwLjc2IDAuNzYgMCAwIDEgMC43NSAwLjc1djAuNWEwLjc2IDAuNzYgMCAwIDEg";
t.characters = t.characters + add;
return { part: 26, addLen: add.length, len: t.characters.length, expect: 13500 };
