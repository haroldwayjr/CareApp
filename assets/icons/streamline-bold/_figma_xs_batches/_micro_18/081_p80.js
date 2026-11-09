const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDIuNjEgMCAwIDEgMCAxLjM2IDAuMjIgMC4yMiAwIDAgMCAwIDAuMjIgMC4yNSAwLjI1IDAgMCAwIDAuMiAwLjFIMTlhNSA1IDAgMCAwIDMgLTlcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMC41IDE4YTEgMSAwIDAgMCAwIC0ySDFhMSAxIDAgMCAwIDAgMlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNC41IDIwYTEgMSAwIDAgMCAtMSAtMUg0YTEgMSAwIDAgMCAwIDJoOS41YTEgMSAwIDAgMCAxIC0xXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTAuNSAy";
t.characters = t.characters + add;
return { part: 80, addLen: add.length, len: t.characters.length, expect: 40500 };
