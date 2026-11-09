const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "em0xMy4wODYgOS4zOTRjMi4wMDkgLTAuMTA5IDMuNzE0IDEuNjQ2IDMuNzE0IDMuNyAwIDIuMDg2IC0xLjczNCAzLjcgLTMuNyAzLjdoLTE2Yy0yLjA4NiAwIC0zLjcgLTEuNzM0IC0zLjcgLTMuNyAwIC0yLjA4NiAxLjczNCAtMy43IDMuNyAtMy43ek00LjQ1IDE5LjQyNWEwLjYyNSAwLjYyNSAwIDEgMCAwIDEuMjVoMmEwLjYyNSAwLjYyNSAwIDEgMCAwIC0xLjI1em01Ljc3NSAwLjYyNWMwIC0wLjM0NSAwLjI4IC0wLjYyNSAwLjYyNSAtMC42MjVoMmEwLjYyNSAwLjYyNSAwIDEgMSAwIDEuMjVoLTJhMC42MjUgMC42MjUgMCAwIDEgLTAuNjI1IC0wLjYyNW03LjAyNSAtMC42MjVhMC42MjUgMC42MjUgMCAxIDAgMCAxLjI1aDJhMC42MjUgMC42MjUgMCAxIDAg";
t.characters = t.characters + add;
return { part: 23, addLen: add.length, len: t.characters.length, expect: 12000 };
