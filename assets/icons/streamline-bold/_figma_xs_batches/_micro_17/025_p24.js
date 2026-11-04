const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "dGVcIj5cbiAgPGRlc2M+XG4gICAgUGFzc3BvcnQgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTguMyAxMy41YTAuNDkgMC40OSAwIDAgMCAwLjUgLTAuNSAxNi41MiAxNi41MiAwIDAgMSAwLjM4IC0yLjYyIDAuNDggMC40OCAwIDAgMCAtMC4xOCAtMC41IDAuNSAwLjUgMCAwIDAgLTAuNTggMCA1LjU0IDUuNTQgMCAwIDAgLTIgMyAwLjUgMC41IDAgMCAwIDAuMDkgMC40NCAwLjQ5IDAuNDkgMCAwIDAgMC4zOSAwLjE5WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE0LjcgMTNhMC41IDAuNSAwIDAgMCAw";
t.characters = t.characters + add;
return { part: 24, addLen: add.length, len: t.characters.length, expect: 12500 };
