const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NzE4OSAyLjAxMzYyIC0wLjU2NzkzIC0wLjMwMzM3IC0xLjM5Nzc1IC0wLjYzNjcxIC0xLjg4ODY3IC0wLjMyOTg5IC0wLjkgMC41IC0wLjg5OTk5NCAxLjM5OTk5IC0wLjM5OTk5IDIuMjk5OTkgMC41IDAuOSAxLjI5OTk5IDEuNDAwMDMgMi4xOTk5OSAwLjkwMDAzXCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9rZXkiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIktleS1Mb2NrLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIEtleSBMb2Nr";
t.characters = t.characters + add;
return { part: 65, addLen: add.length, len: t.characters.length, expect: 33000 };
