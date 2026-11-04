const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "LjI1IDAgMCAxIDIuMjUgMmgzLjVhMC4yNSAwLjI1IDAgMCAxIDAuMjUgMC4yNXYzLjVhMC4yNSAwLjI1IDAgMCAxIC0wLjI1IDAuMjVoLTMuNUEwLjI1IDAuMjUgMCAwIDEgMiA1Ljc1WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTcgMTZIMWExIDEgMCAwIDAgLTEgMXY2YTEgMSAwIDAgMCAxIDFoNmExIDEgMCAwIDAgMSAtMXYtNmExIDEgMCAwIDAgLTEgLTFtLTEgNS43NWEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgMC4yNWgtMy41YTAuMjUgMC4yNSAwIDAgMSAtMC4yNSAtMC4yNXYtMy41YTAuMjUgMC4yNSAwIDAgMSAwLjI1IC0wLjI1aDMuNWEwLjI1IDAuMjUgMCAwIDEgMC4yNSAwLjI1Wlwi";
t.characters = t.characters + add;
return { part: 22, addLen: add.length, len: t.characters.length, expect: 11500 };
