const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NzIgMC4yMTk0IC0wLjIxOTQgMC41MTY5NiAtMC4zNDI2IDAuODI3MjMgLTAuMzQyNkgxOS45NTYyYzAuNDU3IDAgMC44OTU0IC0wLjE4MTYgMS4yMTg1IC0wLjUwNDggMC4zMjMyIC0wLjMyMzEgMC41MDQ4IC0wLjc2MTUgMC41MDQ4IC0xLjIxODVWMS44NzM5M2MwIC0wLjQ1NzA1IC0wLjE4MTYgLTAuODk1MzczIC0wLjUwNDggLTEuMjE4NTU0IC0wLjMyMzEgLTAuMzIzMTgxIC0wLjc2MTUgLTAuNTA0NzQxIC0xLjIxODUgLTAuNTA0NzQxek0xMC41Nzg1IDguMTk1MDRsMy4yNzYgMy4yNzU5NiAtMi4yNiAyLjI2Yy0wLjQzNTQgMC40MTQxIC0xLjAxNDggMC42NDMgLTEuNjE1ODYgMC42MzgxIC0wLjYwMzYyIC0wLjAwNDggLTEuMTgxNTIgLTAuMjQ1IC0xLjYx";
t.characters = t.characters + add;
return { part: 22, addLen: add.length, len: t.characters.length, expect: 11500 };
