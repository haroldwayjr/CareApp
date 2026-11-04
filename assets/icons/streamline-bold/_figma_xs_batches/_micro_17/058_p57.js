const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiSGlzdG9yeS1GYW4tLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgSGlzdG9yeSBGYW4gU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBkPVwiTTIzLjg0IDExLjg5YTEzIDEzIDAgMCAwIC0yIC0zLjggMC4yNSAwLjI1IDAgMCAwIC0wLjM4IDBsLTQuMTkgNC40MWEwLjI1IDAuMjUgMCAwIDEgLTAuMzYgMCA2LjQyIDYuNDIgMCAwIDAgLTAuNyAtMC42NiAwLjI1IDAuMjUgMCAwIDEgMCAtMC4zNmw0LjI4IC00LjU0YTAuMjQgMC4yNCAwIDAgMCAwIC0wLjM1IDExLjA4IDExLjA4IDAgMCAwIC0zLjk5IC0yLjM3IDAu";
t.characters = t.characters + add;
return { part: 57, addLen: add.length, len: t.characters.length, expect: 29000 };
