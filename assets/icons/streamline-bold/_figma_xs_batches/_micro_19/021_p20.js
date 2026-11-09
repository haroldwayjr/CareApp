const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE3Ljc1IDAuMjVhNiA2IDAgMSAwIDYgNiA2IDYgMCAwIDAgLTYgLTZtMC41IDcuMjVoLTFhMC4yNSAwLjI1IDAgMCAwIC0wLjI1IDAuMjV2MmEwLjc1IDAuNzUgMCAwIDEgLTEuNSAwdi03YTAuNzYgMC43NiAwIDAgMSAwLjc1IC0wLjc1aDJhMi43NSAyLjc1IDAgMCAxIDAgNS41XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTguMjUgMy41aC0xYTAuMjUgMC4yNSAwIDAgMCAtMC4yNSAwLjI1djJhMC4yNSAwLjI1IDAgMCAwIDAuMjUgMC4yNWgxYTEuMjUgMS4yNSAwIDAgMCAwIC0yLjVcIiBmaWxsPVwiIzAw";
t.characters = t.characters + add;
return { part: 20, addLen: add.length, len: t.characters.length, expect: 10500 };
