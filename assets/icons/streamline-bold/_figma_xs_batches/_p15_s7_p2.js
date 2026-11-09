const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "MiAwLjM0ODIyIC0wLjM2NjU2IDAuMTQ1NTUgLTAuMDkwMzUgMC4zMTE4OCAtMC4xNDE3OSAwLjQ4MzAzIC0wLjE0OTM4IDAuMTcxMTQgLTAuMDA3NiAwLjM0MTM3IDAuMDI4OSAwLjQ5NDM2IDAuMTA2TDE2LjgzIDExLjFjMC4xNjY0IDAuMDgyOSAwLjMwNjQgMC4yMTA2IDAuNDA0MyAwLjM2ODcgMC4wOTc4IDAuMTU4MSAwLjE0OTYgMC4zNDA0IDAuMTQ5NiAwLjUyNjNzLTAuMDUxOCAwLjM2ODIgLTAuMTQ5NiAwLjUyNjNjLTAuMDk3OSAwLjE1ODEgLTAuMjM3OSAwLjI4NTggLTAuNDA0MyAwLjM2ODdcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21lZGlhL3NraXAuYmFjayIsICJzdmciOiAiPHN2ZyB4";
t.characters = t.characters + add;
return { step: 7, part: 2, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
