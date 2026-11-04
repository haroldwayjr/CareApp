const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MTYgLTQuOTMgMC41IDAuNSAwIDAgMCAtMC42IC0wLjc1IDEwLjE0IDEwLjE0IDAgMCAwIC02LjQgOS4yIDYuMjIgNi4yMiAwIDEgMCAxMi40NCAwIDYuNDYgNi40NiAwIDAgMCAtMi45NSAtNS40NFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzLjUxIDkuOTEgMTMgMC40MWExLjUgMS41IDAgMCAwIC0yIDBMMC40OSA5LjkxYTEuNSAxLjUgMCAwIDAgMiAyLjIybDkuMTUgLTguMjhhMC41IDAuNSAwIDAgMSAwLjY4IDBsOS4xNSA4LjI4YTEuNSAxLjUgMCAxIDAgMiAtMi4yMlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7";
t.characters = t.characters + add;
return { part: 33, addLen: add.length, len: t.characters.length, expect: 17000 };
