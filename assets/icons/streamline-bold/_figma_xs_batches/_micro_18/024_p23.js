const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzIDBoLTZhMSAxIDAgMCAwIC0xIDF2NmExIDEgMCAwIDAgMSAxaDZhMSAxIDAgMCAwIDEgLTFWMWExIDEgMCAwIDAgLTEgLTFtLTEgNS43NWEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgMC4yNWgtMy41YTAuMjUgMC4yNSAwIDAgMSAtMC4yNSAtMC4yNXYtMy41YTAuMjUgMC4yNSAwIDAgMSAwLjI1IC0wLjI1aDMuNWEwLjI1IDAuMjUgMCAwIDEgMC4yNSAwLjI1WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEwIDQuMjVoMWEwLjc1IDAuNzUgMCAwIDAgMCAtMS41IDAuMjUgMC4yNSAwIDAg";
t.characters = t.characters + add;
return { part: 23, addLen: add.length, len: t.characters.length, expect: 12000 };
