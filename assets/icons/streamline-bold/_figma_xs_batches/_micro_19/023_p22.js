const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "LjA4IC0xLjkyMiA3LjEwMSAwLjAxNWExIDEgMCAxIDAgMS4zODQgLTEuNDQ0Yy0yLjc3OCAtMi42NjIgLTcuMiAtMi42ODQgLTkuODk5IDAuMDE1YTEgMSAwIDEgMCAxLjQxNCAxLjQxNG00LjkwNiAyLjU2OWMtMC42ODcgLTAuNzUgLTEuOTI4IC0wLjc5NiAtMi43NTYgMC4wMzFhMSAxIDAgMSAxIC0xLjQxNCAtMS40MTRjMS41NzMgLTEuNTczIDQuMTMyIC0xLjYxOSA1LjY0NCAwLjAzMWExIDEgMCAxIDEgLTEuNDc0IDEuMzUyTTIuODUgNi45NTZhMS41IDEuNSAwIDAgMSAxLjUgLTEuNWg3LjhhMS41IDEuNSAwIDAgMSAxLjUgMS41djYuNWExLjUgMS41IDAgMCAxIC0xLjUgMS41aC03LjhhMS41IDEuNSAwIDAgMSAtMS41IC0xLjV6bTQgMGgyLjh2M2gtMi44";
t.characters = t.characters + add;
return { part: 22, addLen: add.length, len: t.characters.length, expect: 11500 };
