const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjAuNSAyMmgtMTdhMSAxIDAgMCAwIDAgMmgxN2ExIDEgMCAwIDAgMCAtMlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE3Ljc1IDUuNDhhMC4xMyAwLjEzIDAgMCAwIDAgLTAuMDZjLTAuMTIgLTAuNDIgLTEuMiAtNC4zMyAtMS40NCAtNS4yNGEwLjI2IDAuMjYgMCAwIDAgLTAuMjUgLTAuMThIMTNhMC4yNSAwLjI1IDAgMCAwIC0wLjI1IDAuMjV2OS4zNmEwLjI1IDAuMjUgMCAwIDAgMC4xNCAwLjIzIDQuODEgNC44MSAwIDAgMCAyLjQ3IDAuNDYgNC45MSA0LjkxIDAgMCAwIDIuMzggLTAuODVaXCIgZmlsbD1cIiMw";
t.characters = t.characters + add;
return { part: 33, addLen: add.length, len: t.characters.length, expect: 17000 };
