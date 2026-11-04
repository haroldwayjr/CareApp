const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "IC0wLjIxOTcgLTAuMzMxMzYgLTAuMjE5NyAtMC41MzAyN1YwLjQ2Njc5N2MwLjAxODggMC4wMTQ0MzMgMC4wMzgzIDAuMDI3OTM1IDAuMDU2NiAwLjA0Mjk2OVwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vZmlsZXMvZm9sZGVyLmFkZCIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiRm9sZGVyLUFkZC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBGb2xkZXIgQWRkIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBh";
t.characters = t.characters + add;
return { step: 8, part: 6, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
