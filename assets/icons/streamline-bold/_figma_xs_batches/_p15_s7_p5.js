const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCA0LjUgMjJoMTVhNC41MSA0LjUxIDAgMCAwIDQuNSAtNC41di0xMUE0LjUxIDQuNTEgMCAwIDAgMTkuNSAybS0zLjU3IDExLjM0IC01Ljc2IDIuODhBMS41IDEuNSAwIDAgMSA4IDE0Ljg4VjkuMTJhMS40OSAxLjQ5IDAgMCAxIDIuMTcgLTEuMzRsNS43NiAyLjg4YTEuNDkgMS40OSAwIDAgMSAwIDIuNjhcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWVkaWEvaGVhZHBob25lcyIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiSGVhZHBob25lcy0tU3RyZWFtbGluZS1VbHRp";
t.characters = t.characters + add;
return { step: 7, part: 5, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
