const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MCAxIDAgMi4yMiAwXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTMgOWExIDEgMCAwIDAgMC42NiAtMC4yNWwzLjI4IC0yLjg3YTAuMjYgMC4yNiAwIDAgMSAwLjMgMGwyLjIxIDEuNDdhMSAxIDAgMCAwIDEuMjYgLTAuMTJsMyAtM2ExIDEgMCAxIDAgLTEuNDIgLTEuNDJMMjAgNS4wN2EwLjI2IDAuMjYgMCAwIDEgLTAuMzIgMGwtMi4xMyAtMS40YTEgMSAwIDAgMCAtMS4yMSAwLjA4bC00IDMuNWExIDEgMCAwIDAgLTAuMDkgMS40MUExIDEgMCAwIDAgMTMgOVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzIDExLjVIMTNhMSAx";
t.characters = t.characters + add;
return { part: 83, addLen: add.length, len: t.characters.length, expect: 42000 };
