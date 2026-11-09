const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "NDk2MDkgLTEuOTc2ODggLTAuNzA4MDA3NiAtMy4wNDE5NUMwLjE0NTQ3NSA3LjcyODg0IDAuNjIyMTI5IDYuNzM0OTQgMS4zODAwNyA1Ljk3NzU0bDAuNjU4MiAtMC42NTcyM2MwLjE0NTcgLTAuMTQ1NzggMC4zMTgzNyAtMC4yNjE5MSAwLjUwODc5IC0wLjM0MDgyIDAuMTkwMzggLTAuMDc4ODkgMC4zOTQ1IC0wLjExOTEyIDAuNjAwNTggLTAuMTE5MTRNMTEuNDA2NCAwLjAwMTk1MzEyQzEyLjcwOCAwLjAwMjAzNDkyIDEzLjc1OTggMS4wNjA0MiAxMy43NTk5IDIuMzYwMzV2My4yMTU4MmMtMC4wMDAyIDEuMjk5NyAtMS4wNTEyIDIuMzU3MDcgLTIuMzUyNSAyLjM1NzQyIC0wLjk3ODcgMCAtMS45NzI3NCAtMC42MTQyIC0yLjMxMDU0IC0xLjU3MjI2IC0wLjEz";
t.characters = t.characters + add;
return { part: 69, addLen: add.length, len: t.characters.length, expect: 35000 };
