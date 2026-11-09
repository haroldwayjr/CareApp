const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "XCIxXCI+PC9wYXRoPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL2ZpbGVzL25ld3NwYXBlciIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiTmV3c3BhcGVyLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIE5ld3NwYXBlciBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMjIgMEgyYTIgMiAwIDAgMCAtMiAydjIwYTIgMiAwIDAgMCAyIDJoMjBhMiAyIDAgMCAwIDIgLTJWMmEyIDIgMCAwIDAgLTIgLTJtMCAyMS41YTAuNSAwLjUgMCAwIDEgLTAuNSAw";
t.characters = t.characters + add;
return { part: 25, addLen: add.length, len: t.characters.length, expect: 13000 };
