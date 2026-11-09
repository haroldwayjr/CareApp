const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MTUuNzUgNlYwLjQ2Njc5N2MwLjAxODggMC4wMTQ0MzMgMC4wMzgzIDAuMDI3OTM1IDAuMDU2NiAwLjA0Mjk2OVwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9ncmFkdWF0aW9uIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIkdyYWR1YXRpb24tSGF0LS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIEdyYWR1YXRpb24gSGF0IFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPHBhdGggZmlsbD1cIiMwMDAw";
t.characters = t.characters + add;
return { part: 84, addLen: add.length, len: t.characters.length, expect: 42500 };
