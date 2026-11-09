const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MkgxYTEgMSAwIDAgMCAwIDJoOS41YTEgMSAwIDAgMCAwIC0yXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy90ZW1wZXJhdHVyZSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiVGVtcGVyYXR1cmUtVXAtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgVGVtcGVyYXR1cmUgVXAgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTEwLjUgNC41YTQuNSA0";
t.characters = t.characters + add;
return { part: 81, addLen: add.length, len: t.characters.length, expect: 41000 };
