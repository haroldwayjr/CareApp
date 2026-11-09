const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "IjogImljb24vbWlzYy9zY2hvb2wiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlNjaG9vbC1CZWxsLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFNjaG9vbCBCZWxsIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0xMy4yNCAxOS42N2EwLjQ5IDAuNDkgMCAwIDEgLTAuMjQgLTAuNDJ2LTAuOTJhMC41IDAuNSAwIDAgMCAtMC41IC0wLjVoLTFhMC41IDAuNSAwIDAgMCAtMC41IDAuNXYwLjkyYTAuNDkgMC40OSAwIDAgMSAtMC4yNCAwLjQyIDIuMzQgMi4z";
t.characters = t.characters + add;
return { step: 7, part: 4, addLen: add.length, len: t.characters.length };
