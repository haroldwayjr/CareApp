const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjUgMCAwIDEgLTAuMzEgMC40NiAyLjUxIDIuNTEgMCAwIDAgLTAuNjEgMC4zNiAwLjUgMC41IDAgMCAxIC0wLjU1IDBsLTAuNDQgLTAuMjVhMC43NSAwLjc1IDAgMCAwIC0wLjc1IDEuM2wwLjQ0IDAuMjVhMC41IDAuNSAwIDAgMSAwLjI0IDAuNWwwIDAuMzUgMCAwLjM1YTAuNSAwLjUgMCAwIDEgLTAuMjQgMC41bC0wLjQ0IDAuMjVhMC43NSAwLjc1IDAgMCAwIDAuMzggMS40IDAuNzEgMC43MSAwIDAgMCAwLjM3IC0wLjFMMTggNi40YTAuNSAwLjUgMCAwIDEgMC41NSAwIDIuNTEgMi41MSAwIDAgMCAwLjYxIDAuMzYgMC41IDAuNSAwIDAgMSAwLjMxIDAuNDZ2MC41YTAuNzUgMC43NSAwIDAgMCAxLjUgMHYtMC41YTAuNSAwLjUgMCAwIDEgMC4zMSAtMC40NiAy";
t.characters = t.characters + add;
return { part: 43, addLen: add.length, len: t.characters.length, expect: 22000 };
