const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MCAwIDAgMC4xNiAtMC4xNCAwLjIzIDAuMjMgMCAwIDAgMCAtMC4yTDYuNDUgMC40MUEwLjUxIDAuNTEgMCAwIDAgNiAwLjEySDFhMC40OSAwLjQ5IDAgMCAwIC0wLjQyIDAuMjQgMC41MSAwLjUxIDAgMCAwIDAgMC40OGw0LjA2IDguNTJhMC4yNiAwLjI2IDAgMCAwIDAuMTggMC4xNCAwLjI3IDAuMjcgMCAwIDAgMC4yMyAtMC4wOCA5LjQ4IDkuNDggMCAwIDEgNC4xMyAtMi42MVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEyIDcuODhhOCA4IDAgMSAwIDggOCA4IDggMCAwIDAgLTggLThtMy43MyA3LjI1IC0xLjU2IDEuNTNhMC4yNCAwLjI0IDAgMCAwIC0wLjA2IDAuMjhsMC44NyAyYTAuNTEg";
t.characters = t.characters + add;
return { step: 8, part: 4, addLen: add.length, len: t.characters.length };
