const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiQnV0dG9uLVByZXZpb3VzLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIEJ1dHRvbiBQcmV2aW91cyBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGQ9XCJNMTIgMGExMiAxMiAwIDEgMCAxMiAxMkExMiAxMiAwIDAgMCAxMiAwbTUgMTUuMzhhMSAxIDAgMCAxIC0xLjY3IDAuNzRsLTMuNzUgLTMuMzhhMSAxIDAgMCAxIDAgLTEuNDhsMy43NSAtMy4zOGExIDEgMCAwIDEgMS42NyAwLjc0Wk0xMCA4djhhMSAxIDAgMCAxIC0xIDFIOGExIDEgMCAwIDEgLTEgLTFWOGEx";
t.characters = t.characters + add;
return { step: 7, part: 3, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
