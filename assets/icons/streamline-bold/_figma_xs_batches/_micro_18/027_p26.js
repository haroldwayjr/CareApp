const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NXYtMi41QTAuNzYgMC43NiAwIDAgMCAzIDkuNzVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMy43NSAxN2EwLjc2IDAuNzYgMCAwIDAgLTAuNzUgLTAuNzVoLTNhMC43NiAwLjc2IDAgMCAwIC0wLjc1IDAuNzV2NGEwLjc1IDAuNzUgMCAwIDAgMS41IDB2LTNhMC4yNSAwLjI1IDAgMCAxIDAuMjUgLTAuMjVoMmEwLjc2IDAuNzYgMCAwIDAgMC43NSAtMC43NVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzIDIyLjI1aC04LjVhMC4yNSAwLjI1IDAgMCAxIC0wLjI1IC0wLjI1di0yYTAuNzUgMC43NSAwIDAgMCAtMS41IDB2M2Ew";
t.characters = t.characters + add;
return { part: 26, addLen: add.length, len: t.characters.length, expect: 13500 };
