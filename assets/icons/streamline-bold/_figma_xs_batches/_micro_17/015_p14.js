const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "djExQTIuNSAyLjUgMCAwIDAgNS41IDI0aDEzYTIuNSAyLjUgMCAwIDAgMi41IC0yLjV2LTExYTAuNDMgMC40MyAwIDAgMCAwIC0wLjE5TTkuNTIgMTkuMDhhMC4yNSAwLjI1IDAgMCAxIC0wLjM0IDBjLTEuMzcgLTEuMzUgLTEuNiAtMy45NCAtMC40MSAtNi4zMWE1LjgxIDUuODEgMCAwIDEgNC43OSAtMy41IDAuMjUgMC4yNSAwIDAgMSAwLjI0IDAuMTYgMC4yNyAwLjI3IDAgMCAxIC0wLjA4IDAuMjhjLTEuOTMgMS41NCAtMiAzLjU1IC0yLjEgNS4yMSAtMC4xNyAzLjU4IC0xLjA5IDMuMjggLTIuMSA0LjE2bTYuNzEgLTIuNTlBNS45MiA1LjkyIDAgMCAxIDExLjY2IDIwYTAuMjYgMC4yNiAwIDAgMSAtMC4yNCAtMC4xNiAwLjIzIDAuMjMgMCAwIDEgMC4wNiAt";
t.characters = t.characters + add;
return { part: 14, addLen: add.length, len: t.characters.length, expect: 7500 };
