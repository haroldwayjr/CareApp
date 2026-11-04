const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiU2NpZW5jZS1BdG9tLVBvc2l0aXZlLU5lZ2F0aXZlLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFNjaWVuY2UgQXRvbSBQb3NpdGl2ZSBOZWdhdGl2ZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMjMuNTIgOC42MmExIDEgMCAxIDAgLTEuOTIgMC41NkExMC4yOCAxMC4yOCAwIDAgMSAyMiAxMiAxMCAxMCAwIDEgMSAxMiAyYTEwLjM0IDEwLjM0IDAgMCAxIDIuNDIgMC4yOSAxIDEgMCAwIDAgMS4yMSAtMC43MkExIDEgMCAw";
t.characters = t.characters + add;
return { part: 47, addLen: add.length, len: t.characters.length, expect: 24000 };
