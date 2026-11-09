const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MjYgMC4yNiAwIDAgMCAtMC4zNSAwYy0wLjM2IDAuMzQgLTAuNzEgMC42OSAtMSAxYTIuNjEgMi42MSAwIDAgMCAwIDMuNWMwLjI5IDAuMzcgMC42MyAwLjcyIDEgMS4wNlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE4LjU0IDE0LjIxYTEgMSAwIDAgMCAtMS40MSAwIDEgMSAwIDAgMCAwIDEuNDEgMC4zMyAwLjMzIDAgMCAxIDAuMDkgMC4yOCAwLjMyIDAuMzIgMCAwIDEgLTAuMTcgMC4yNSAxMCAxMCAwIDAgMSAtMTAuMSAwIDAuMzEgMC4zMSAwIDAgMSAtMC4xNyAtMC4yNCAwLjMzIDAuMzMgMCAwIDEgMC4wOSAtMC4yOCAxIDEgMCAwIDAgMCAtMS40MSAxIDEgMCAwIDAgLTEuNDEgMEwwLjcx";
t.characters = t.characters + add;
return { part: 53, addLen: add.length, len: t.characters.length, expect: 27000 };
