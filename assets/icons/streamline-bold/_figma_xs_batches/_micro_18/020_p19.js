const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDk4LjQgMCAwIDEgNy43IDE2YTAuMjUgMC4yNSAwIDAgMSAtMC4yNCAwLjIxaC0zYy0yIDAgLTIuMjIgMi4wNyAtMi4zNCAzLjNDMiAyMS40OCAxLjczIDIxLjc1IDEgMjEuNzVhMSAxIDAgMSAwIDAgMmgxMS41YzIuMzggMCAyLjcyIC0yLjM2IDIuOTIgLTMuNzYgMC4xNyAtMS4xOCAwLjMgLTEuNzQgMC41OCAtMS43NGgwLjQxYTAuMjUgMC4yNSAwIDAgMSAwLjI0IDAuMTdjMC4wNiAwLjE5IDAuMTIgMC40NSAwLjE2IDAuNjQgMC4yIDAuOTQgMC41NiAyLjY5IDIuNjkgMi42OSA0LjA3IDAgNC41IC0xMS41NCA0LjUgLTE2LjQ4ek0xMi4wNiAxMy41YTAuNzUgMC43NSAwIDAgMSAwIC0xLjVoNmEwLjc1IDAuNzUgMCAwIDEgMCAxLjVabS0wLjI1IC04Ljc1YTAu";
t.characters = t.characters + add;
return { part: 19, addLen: add.length, len: t.characters.length, expect: 10000 };
