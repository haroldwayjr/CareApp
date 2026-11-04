const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "L3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTIzLjQyIDAuMzZBMC40OSAwLjQ5IDAgMCAwIDIzIDAuMTJoLTVhMC41MSAwLjUxIDAgMCAwIC0wLjQ1IDAuMjlsLTIuODkgNi4wNWEwLjI2IDAuMjYgMCAwIDAgMCAwLjIxIDAuMjUgMC4yNSAwIDAgMCAwLjE2IDAuMTRBOS40OCA5LjQ4IDAgMCAxIDE5IDkuNDJhMC4yNyAwLjI3IDAgMCAwIDAuMjIgMC4wOCAwLjI2IDAuMjYgMCAwIDAgMC4xOSAtMC4xNEwyMy40NSAwLjg0YTAuNTEgMC41MSAwIDAgMCAtMC4wMyAtMC40OFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTkuMTggNi44MWEwLjI1IDAuMjUg";
t.characters = t.characters + add;
return { step: 8, part: 3, addLen: add.length, len: t.characters.length };
