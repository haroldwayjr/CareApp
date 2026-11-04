const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9jb21tZXJjZS9xci5jb2RlIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJRci1Db2RlLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFFyIENvZGUgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTEgOGg2YTEgMSAwIDAgMCAxIC0xVjFhMSAxIDAgMCAwIC0xIC0xSDFhMSAxIDAgMCAwIC0xIDF2NmExIDEgMCAwIDAgMSAxbTEgLTUuNzVBMC4yNSAw";
t.characters = t.characters + add;
return { part: 21, addLen: add.length, len: t.characters.length, expect: 11000 };
