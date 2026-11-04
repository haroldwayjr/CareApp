const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "XCIwIDAgMjQgMjRcIiBpZD1cIkJhcmNvZGUtU2Nhbi0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBCYXJjb2RlIFNjYW4gU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTEgOGExIDEgMCAwIDAgMSAtMWwwIC0xLjc0YTAuMjcgMC4yNyAwIDAgMSAwIC0wLjE4IDAuMjUgMC4yNSAwIDAgMSAwLjIxIC0wLjA4aDEuNjZhMSAxIDAgMCAwIDAgLTJIMmEyIDIgMCAwIDAgLTIgMnYyYTEgMSAwIDAgMCAxIDFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0zLjg3IDE5SDIuMjVhMC4yNSAwLjI1";
t.characters = t.characters + add;
return { part: 69, addLen: add.length, len: t.characters.length, expect: 35000 };
