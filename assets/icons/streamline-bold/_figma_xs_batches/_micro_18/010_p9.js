const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NSAxMi4wMDAyYzAgNi40ODkzIDUuMjYwNjUgMTEuNzUgMTEuNzUgMTEuNzUgNi40ODkzIDAgMTEuNzUgLTUuMjYwNyAxMS43NSAtMTEuNzVWMWMwIC0wLjE5ODkxNCAtMC4wNzkgLTAuMzg5NjgxIC0wLjIxOTcgLTAuNTMwMzM0QzIzLjM4OTcgMC4zMjkwMTMgMjMuMTk4OSAwLjI0OTk5NyAyMyAwLjI1XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9zYXRlbGxpdGUiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlNhdGVsbGl0ZS0tU3RyZWFtbGluZS1VbHRpbWF0";
t.characters = t.characters + add;
return { part: 9, addLen: add.length, len: t.characters.length, expect: 5000 };
