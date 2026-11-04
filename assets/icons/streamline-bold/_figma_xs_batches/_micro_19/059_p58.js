const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "djEuNWEwLjUgMC41IDAgMCAxIC0wLjUgMC41aC0ydjJhMC41IDAuNSAwIDAgMSAtMC41IDAuNWgtMS41YTAuNSAwLjUgMCAwIDEgLTAuNSAtMC41di0yaC0yYTAuNSAwLjUgMCAwIDEgLTAuNSAtMC41di0xLjVhMC41IDAuNSAwIDAgMSAwLjUgLTAuNWgydi0yYTAuNSAwLjUgMCAwIDEgMC41IC0wLjVoMS41YTAuNSAwLjUgMCAwIDEgMC41IDAuNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEyIDQuMjVhMC43NSAwLjc1IDAgMCAwIDAuNzUgLTAuNzVWMS4yNWEwLjc1IDAuNzUgMCAwIDAgLTEuNSAwVjMuNWEwLjc2IDAuNzYgMCAwIDAgMC43NSAwLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJv";
t.characters = t.characters + add;
return { part: 58, addLen: add.length, len: t.characters.length, expect: 29500 };
