const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MS40MmwtMC43MSAtMC43YTEgMSAwIDAgMCAtMS40MSAxLjQxWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEgOS4yNWgxYTEgMSAwIDAgMCAwIC0ySDFhMSAxIDAgMCAwIDAgMlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE0LjA4IDIuNDJhMSAxIDAgMCAwIC0xLjQxIDBsLTAuNzEgMC43YTEgMSAwIDAgMCAtMC4yOSAwLjY3QTAuMjUgMC4yNSAwIDAgMCAxMiA0YTguNzUgOC43NSAwIDAgMSAyLjEyIC0wLjUgMC4yMyAwLjIzIDAgMCAwIDAuMjIgLTAuMTkgMSAxIDAgMCAwIC0wLjI2IC0wLjg5XCIgZmlsbD1cIiMwMDAwMDBc";
t.characters = t.characters + add;
return { part: 77, addLen: add.length, len: t.characters.length, expect: 39000 };
