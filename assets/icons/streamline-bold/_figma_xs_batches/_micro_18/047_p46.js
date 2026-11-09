const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "aWdodC5tb2RlIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJMaWdodC1Nb2RlLUJ3LS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIExpZ2h0IE1vZGUgQncgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTI0IDJhMiAyIDAgMCAwIC0yIC0ySDJhMiAyIDAgMCAwIC0yIDJ2MjBhMiAyIDAgMCAwIDIgMmgyMGEyIDIgMCAwIDAgMiAtMlptLTIgMTkuNWEwLjUgMC41IDAgMCAxIC0wLjUgMC41aC0xOWEwLjUgMC41IDAgMCAxIC0wLjUgLTAuNXYtMTlhMC41IDAu";
t.characters = t.characters + add;
return { part: 46, addLen: add.length, len: t.characters.length, expect: 23500 };
