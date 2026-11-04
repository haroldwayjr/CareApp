const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IDAgMTQuOSAwLjM1IDEyLjI0IDEyLjI0IDAgMCAwIDEyIDBhMTIgMTIgMCAxIDAgMTEuNTIgOC42MlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEyIDUuNzVBNi4yNSA2LjI1IDAgMSAwIDE4LjI1IDEyIDYuMjUgNi4yNSAwIDAgMCAxMiA1Ljc1TTE1IDEzaC0xLjVhMC41IDAuNSAwIDAgMCAtMC41IDAuNVYxNWExIDEgMCAwIDEgLTIgMHYtMS41YTAuNSAwLjUgMCAwIDAgLTAuNSAtMC41SDlhMSAxIDAgMCAxIDAgLTJoMS41YTAuNSAwLjUgMCAwIDAgMC41IC0wLjVWOWExIDEgMCAwIDEgMiAwdjEuNWEwLjUgMC41IDAgMCAwIDAuNSAwLjVIMTVhMSAxIDAgMCAxIDAgMlwiIGZpbGw9XCIjMDAw";
t.characters = t.characters + add;
return { part: 48, addLen: add.length, len: t.characters.length, expect: 24500 };
