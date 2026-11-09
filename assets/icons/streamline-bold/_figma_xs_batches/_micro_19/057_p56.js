const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "c3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGQ9XCJNMjAuNDQgOS4yN0EwLjQ4IDAuNDggMCAwIDAgMjAgOWgtNy4zOEwxNC40OSAwLjYxQTAuNTEgMC41MSAwIDAgMCAxNC4yIDBhMC41IDAuNSAwIDAgMCAtMC42MSAwLjE3bC0xMCAxNGEwLjQ5IDAuNDkgMCAwIDAgMCAwLjUyQTAuNDkgMC40OSAwIDAgMCA0IDE1aDcuMzhsLTEuODcgOC4zOWEwLjUxIDAuNTEgMCAwIDAgMC4yOSAwLjYxIDAuNTIgMC41MiAwIDAgMCAwLjYxIC0wLjE3bDEwIC0xNGEwLjQ5IDAuNDkgMCAwIDAgMC4wMyAtMC41NlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9oZWFsdGgv";
t.characters = t.characters + add;
return { part: 56, addLen: add.length, len: t.characters.length, expect: 28500 };
