const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MjEuMmMwIDEuNTM5MyAtMS4zNzYgMi45OSAtMy4xNDUgMi42ODk4IC0xLjQ3MzIgLTAuMTgyMiAtMi4zNTUgLTEuNDgzNiAtMi4zNTUgLTIuNzg5OFY4LjRjMCAtMC4yNDc3MiAtMC4yNTIzIC0wLjUgLTAuNSAtMC41aC0wLjk3NDdMMTQuMSAyMi4xYzAgMSAtMC44IDEuODAwMSAtMS44IDEuODAwMUgxLjhDMC44IDIzLjkwMDEgMCAyMy4xIDAgMjIuMVYzLjEwMDA0YzAgLTEgMC44IC0xLjc5OTk5IDEuOCAtMS43OTk5OWgxMC40YzEgMCAxLjggMC43OTk5OSAxLjggMS43OTk5OUwxNC4wMTQ3IDUuOUgxNWMxLjM1MjMgMCAyLjUgMS4xNDc3MiAyLjUgMi41djEyLjdjMCAwLjQ4MzYgMC4zMDQ0IDAuNzcyMSAwLjYxMDQgMC44MDYxIDAuMDIzIDAuMDAyNiAwLjA0";
t.characters = t.characters + add;
return { step: 7, part: 2, addLen: add.length, len: t.characters.length };
