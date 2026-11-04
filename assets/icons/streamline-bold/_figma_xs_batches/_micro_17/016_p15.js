const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MC4yOGMxLjQ4IC0xLjMxIDEuNTcgLTMgMS42NCAtNC41NyAwLjE2IC0zLjU3IDEgLTMuNTYgMi40NyAtNC43MmEwLjI1IDAuMjUgMCAwIDEgMC4zNCAwYzEuMjcgMS40IDEuNDUgMy45MSAwLjMgNi4yMlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvdHJhaW4iLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlRyYWluLUxvY2F0aW9uLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFRyYWluIExvY2F0aW9uIFN0cmVhbWxpbmUgSWNvbjog";
t.characters = t.characters + add;
return { part: 15, addLen: add.length, len: t.characters.length, expect: 8000 };
