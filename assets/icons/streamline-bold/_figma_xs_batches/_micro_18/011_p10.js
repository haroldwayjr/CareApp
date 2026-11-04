const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "ZVwiPlxuICA8ZGVzYz5cbiAgICBTYXRlbGxpdGUgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTYuNzIgMTcuMjlBMTIgMTIgMCAwIDEgNS4zIDE1LjZMMC4yIDIyLjRhMSAxIDAgMCAwIC0wLjA5IDEuMDVBMSAxIDAgMCAwIDEgMjRoMTEuNWExIDEgMCAwIDAgMC44OSAtMC41NCAxIDEgMCAwIDAgLTAuMDcgLTFsLTEuMzkgLTJhMTIuNzEgMTIuNzEgMCAwIDEgLTUuMjEgLTMuMTdcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk05LjEyIDAuMjlBMSAxIDAgMCAwIDcuNzEgMC4zYTExLjIzIDExLjIzIDAgMCAw";
t.characters = t.characters + add;
return { part: 10, addLen: add.length, len: t.characters.length, expect: 5500 };
