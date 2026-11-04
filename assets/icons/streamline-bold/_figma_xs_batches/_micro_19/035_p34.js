const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MS4xMTkzMjAzMSAyLjUgMi41MDAwMDAzMVYxOC41MDI5YzAgMS4zODA3IC0xLjExOTMgMi41IC0yLjUgMi41aC00LjM5MTZsLTAuMDI4MyAtMC4wNDFjLTAuMjQxNSAtMC4zMjg5IC0wLjU2MSAtMC42MDE2IC0wLjkzNzUgLTAuNzkxbC0wLjEyMDEgLTAuMDU5NiAtMC4xMzU4IC0wLjA3MzJjLTAuMTMzIC0wLjA4NjUgLTAuMjU2NyAtMC4yMTIgLTAuMzUyNSAtMC4zNzcgLTAuMDg2NCAtMC4xNDg4IC0wLjE1OCAtMC40MDA3IC0wLjE3MzggLTAuNjU4MkgyMS41YzAuMjc2MSAwIDAuNSAtMC4yMjM4IDAuNSAtMC41VjUuODQ4NjNIMlYxOC41MDI5YzAgMC4yNzYyIDAuMjIzODYgMC41IDAuNSAwLjVoNi4xMzc3Yy0wLjAxNTgyIDAuMjU3NSAtMC4wODU1MiAwLjUw";
t.characters = t.characters + add;
return { part: 34, addLen: add.length, len: t.characters.length, expect: 17500 };
