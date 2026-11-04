const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "OTY3bC0yLjUgMi41MDAwM2MtMC4yOTI4OTMgMC4yOTI5IC0wLjI5Mjg5MyAwLjc2NzcgMCAxLjA2MDZsMS40OTk1NCAxLjQ5OTZjMC4xMDcyNSAtMC4yMjQ1IDAuMjUzODUgLTAuNDM0OSAwLjQzOTggLTAuNjIwOXptMi40MDIxMSAxMi43ODA4YzAuMjI0NSAtMC4xMDczIDAuNDM0OTEgLTAuMjUzOSAwLjYyMDg3IC0wLjQzOThsNC42NTkgLTQuNjU5VjIwLjVjMCAwLjE5ODkgLTAuMDc5IDAuMzg5NyAtMC4yMTk3IDAuNTMwM2wtMi41IDIuNWMtMC4yOTI5IDAuMjkyOSAtMC43Njc3IDAuMjkyOSAtMS4wNjA2IDB6TTEyLjE0NDYgNC4zNTUzOWMtMC4zOTA1IC0wLjM5MDUyIC0xLjAyMzcgLTAuMzkwNTIgLTEuNDE0MiAwIC0wLjM5MDUgMC4zOTA1MyAtMC4zOTA1";
t.characters = t.characters + add;
return { step: 9, part: 6, addLen: add.length, len: t.characters.length };
