const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NjIgLTMuOTE3MTgxIDIuOTM1OCAtMy43MTQ5OTYxTTIxLjc2NTEgMTMuMDkyOGMwIDEuMzgwNyAtMS4xMTkzIDIuNSAtMi41IDIuNXMtMi41IC0xLjExOTMgLTIuNSAtMi41IDEuMTE5MyAtMi41IDIuNSAtMi41IDIuNSAxLjExOTMgMi41IDIuNU0xNy4xNzYgNC43MDE1NWMwLjIxMzggLTEuMzMxNTcgMC4xMjA2IC0yLjY1ODE0IC0wLjI3NjkgLTMuNzQ1NjY0IC0wLjAzNDEgLTAuMDkzMjk1IC0wLjA3MTcgLTAuMTg3NjAzIC0wLjExMjkgLTAuMjgyMTQ5IDEuMDg2MiAwLjQxMDMyMyAyLjM0NTQgMS4wNjY3MjMgMy40Mjc2IDIuMTA3NjUzIDEuNDE5MSAxLjI5NjcyIDIuNjgxIDEuOTIzMzcgMy40MjQzIDIuMjEwMzEgMC4zMjkxIDAuMTI3MDMgMC40NzYzIDAu";
t.characters = t.characters + add;
return { part: 63, addLen: add.length, len: t.characters.length, expect: 32000 };
