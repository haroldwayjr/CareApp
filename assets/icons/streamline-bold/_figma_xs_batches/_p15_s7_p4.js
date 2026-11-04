const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "IDEgMCAwIDEgMSAtMWgxYTEgMSAwIDAgMSAxIDFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWVkaWEvdmlkZW8iLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlZpZGVvLVBsYXllci0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBWaWRlbyBQbGF5ZXIgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBkPVwiTTE5LjUgMmgtMTVBNC41MSA0LjUxIDAgMCAwIDAgNi41djExQTQuNTEgNC41MSAw";
t.characters = t.characters + add;
return { step: 7, part: 4, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
