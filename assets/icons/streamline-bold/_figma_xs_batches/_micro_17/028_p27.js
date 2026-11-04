const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "YXRoPlxuICAgIDxwYXRoIGQ9XCJNMTIuMSAxOS43MWExMC40NCAxMC40NCAwIDAgMCAxLjEgLTQuMTcgMC40NSAwLjQ1IDAgMCAwIC0wLjEzIC0wLjM4IDAuNDggMC40OCAwIDAgMCAtMC4zNiAtMC4xNmgtMS45MmEwLjQ4IDAuNDggMCAwIDAgLTAuMzYgMC4xNiAwLjQ1IDAuNDUgMCAwIDAgLTAuMTMgMC4zOCAxMC40NCAxMC40NCAwIDAgMCAxLjEgNC4xN2wwLjMxIDAgMC4zMSAwWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIwLjggNS4xN2EwLjQ4IDAuNDggMCAwIDEgLTAuMyAtMC40NVYyYTIgMiAwIDAgMCAtMiAtMmgtMTNBMy41IDMuNSAwIDAgMCAyIDMuNVYyMWEzIDMgMCAwIDAgMyAz";
t.characters = t.characters + add;
return { part: 27, addLen: add.length, len: t.characters.length, expect: 14000 };
