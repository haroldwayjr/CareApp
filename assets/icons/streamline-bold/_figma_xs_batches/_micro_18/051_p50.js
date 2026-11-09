const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "b24vbWlzYy9rZXlib2FyZCIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiS2V5Ym9hcmQtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgS2V5Ym9hcmQgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBkPVwiTTIxLjUgMTNINC43NWEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgLTAuMjV2LTAuMjVhMiAyIDAgMCAxIDIgLTJoMTNhNC41IDQuNSAwIDAgMCAwIC05SDEzYTAuNSAwLjUgMCAwIDEgLTAuNSAtMC41IDEgMSAwIDAgMCAtMiAwQTIuNSAyLjUgMCAwIDAgMTMgMy41aDYuNWEyLjUg";
t.characters = t.characters + add;
return { part: 50, addLen: add.length, len: t.characters.length, expect: 25500 };
