const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "LTAuMTIwMSAwLjIwNjEgMCAwLjQxMDMgMC4wNDEyIDAuNjAwNiAwLjEyMDFzMC4zNjMyIDAuMTk0MiAwLjUwODggMC4zMzk5bDIuNzc1NCAyLjc3NDRjMC4yOTQxIDAuMjk0MiAwLjQ1OSAwLjY5MzMgMC40NTkgMS4xMDkzIDAgMC40MTYxIC0wLjE2NDkgMC44MTUyIC0wLjQ1OSAxLjEwOTRsLTAuNjU4MiAwLjY1OTJjLTAuNzU3NCAwLjc1NzUgLTEuNzUwNiAxLjIzMzcgLTIuODE1NCAxLjM1MDYgLTEuMDY1MSAwLjExNjggLTIuMTM4MyAtMC4xMzM0IC0zLjA0MiAtMC43MDlsLTAuMDEwOCAtMC4wMDU5QzcuNjU3OTQgMjAuMjE4IDMuNzg0MDQgMTYuMzQ0NiAwLjc0NDMyNCAxMS44NDY3bC0wLjAwNzgxMyAtMC4wMTA4Yy0wLjU3NTQ2OSAtMC45MDM4IC0wLjgy";
t.characters = t.characters + add;
return { part: 68, addLen: add.length, len: t.characters.length, expect: 34500 };
