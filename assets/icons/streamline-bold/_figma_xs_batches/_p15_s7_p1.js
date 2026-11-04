const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "IDEyYzAgLTMuMTgyNiAtMS4yNjQzIC02LjIzNDg1IC0zLjUxNDcgLTguNDg1MjhDMTguMjM0OCAxLjI2NDI4IDE1LjE4MjYgMCAxMiAwbTQuODMgMTIuODkgLTcuMzc5OTkgMy42OWMtMC4xNTIyMyAwLjA3NjcgLTAuMzIxNTUgMC4xMTMyIC0wLjQ5MTg2IDAuMTA2MSAtMC4xNzAzMiAtMC4wMDcxIC0wLjMzNTk4IC0wLjA1NzcgLTAuNDgxMjYgLTAuMTQ2OSAtMC4xNDUyOCAtMC4wODkxIC0wLjI2NTM2IC0wLjIxNCAtMC4zNDg4MiAtMC4zNjI2cy0wLjEyNzU1IC0wLjMxNjEgLTAuMTI4MDYgLTAuNDg2NlY4LjMxYy0wLjAwMTIgLTAuMTcxMzEgMC4wNDE2MyAtMC4zNDAwNiAwLjEyNDM5IC0wLjQ5MDA2IDAuMDgyNzYgLTAuMTQ5OTkgMC4yMDI2NiAtMC4yNzYy";
t.characters = t.characters + add;
return { step: 7, part: 1, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
