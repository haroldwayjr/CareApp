const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvZHJvcGxldCIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJEcm9wLVNoYXBlLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIERyb3AgU2hhcGUgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBmaWxsPVwiIzAwMDAwMFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIzIDAuMjUgMTIgMC4yNTAxNjRDNS41MTA2NSAwLjI1MDE2NCAwLjI1IDUuNTEwODIgMC4y";
t.characters = t.characters + add;
return { part: 8, addLen: add.length, len: t.characters.length, expect: 4500 };
