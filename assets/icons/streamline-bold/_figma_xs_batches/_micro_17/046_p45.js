const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "ZVwiPlxuICA8ZGVzYz5cbiAgICBUb29scyBLZXlzIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIm02IDcuNTYgMC4yNCAwYTAuOTEgMC45MSAwIDAgMCAwLjY0IC0wLjM0IDAuOTIgMC45MiAwIDAgMCAwLjE3IC0wLjdBMy4zOCAzLjM4IDAgMCAxIDcgNS43OCAzLjc5IDMuNzkgMCAwIDEgMTAuNzYgMmEzLjc0IDMuNzQgMCAwIDEgMyAxLjUyIDEgMSAwIDAgMCAxLjQgMC4yIDEgMSAwIDAgMCAwLjIgLTEuNDFBNS43OSA1Ljc5IDAgMCAwIDUgNS43OGE1LjM5IDUuMzkgMCAwIDAgMC4xIDEuMDcgMC44OCAwLjg4IDAgMCAwIDAuOSAwLjcxXCIgZmlsbD1cIiMwMDAwMDBcIiBz";
t.characters = t.characters + add;
return { part: 45, addLen: add.length, len: t.characters.length, expect: 23000 };
