const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MC4zOTc0NSAtMC42Mzk4IC0wLjM5NzQ2IC0xLjAxNDcgLTAuMDAwMDYgLTAuMjIyMSAwLjA2MTg4IC0wLjQ0MTYgMC4xODA2NiAtMC42MzA5IDAuMTE5MSAtMC4xODk3IDAuMjkxMzcgLTAuMzQzIDAuNDk5MDIgLTAuNDM0NWgwLjAwMDk4YzAuNDg0NDkgLTAuMjEzMiAwLjg5OTI1IC0wLjU4NTYgMS4xODA2NyAtMS4wNzAzIDAuMjc2OCAtMC40NzY4IDAuNDE0IC0xLjEzNDIgMC4zNzQgLTEuNzE3OCAtMC4wMDA4IC0wLjAxMTQgLTAuMDAxIC0wLjAyMzggLTAuMDAxIC0wLjAzNTIgLTAuMDAwMSAtMC40MDY1IC0wLjEzNTQgLTAuNjQ4NiAtMC4zODg2MyAtMC45MTYgLTAuMTM5OTUgLTAuMTQ3NyAtMC4zMDU0NyAtMC4yOTE0IC0wLjUxMzY3IC0wLjQ3NjUgLTAu";
t.characters = t.characters + add;
return { part: 31, addLen: add.length, len: t.characters.length, expect: 16000 };
