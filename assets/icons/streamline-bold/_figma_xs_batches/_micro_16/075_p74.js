const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "IDEuOSA4LjQxIDguNDEgMCAwIDEgLTAuMjQgMi45NlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvZWNvbG9neSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiRWNvbG9neS1MZWFmLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIEVjb2xvZ3kgTGVhZiBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGQ9XCJNMjMuNzQgMy4xNmExIDEgMCAwIDAgLTAuNiAtMC43NiAxIDEg";
t.characters = t.characters + add;
return { part: 74, addLen: add.length, len: t.characters.length, expect: 37500 };
