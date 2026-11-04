const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "OXYxbC01LjU5IDMuNzJaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTcuNjEgNS40OHYybC0xLjA4IC0xLjEyYTAuNzUgMC43NSAwIDEgMCAtMS4wNiAxLjA2bDIuMzYgMi4zN2EwLjc1IDAuNzUgMCAwIDAgMS4wNiAwbDIuMzcgLTIuMzdhMC43NSAwLjc1IDAgMCAwIC0xLjA2IC0xLjA2bC0xLjA5IDEuMDl2LTJhMi42NCAyLjY0IDAgMCAwIC0yLjY0IC0yLjY0aC00LjcyYTAuNzUgMC43NSAwIDAgMCAwIDEuNWg0LjcyYTEuMTQgMS4xNCAwIDAgMSAxLjE0IDEuMTdcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMC44MSAyMC4z";
t.characters = t.characters + add;
return { part: 43, addLen: add.length, len: t.characters.length, expect: 22000 };
