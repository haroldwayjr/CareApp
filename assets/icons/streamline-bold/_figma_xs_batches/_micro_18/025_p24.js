const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MSAtMC4yNSAtMC4yNVYxYTAuNzUgMC43NSAwIDAgMCAtMS41IDB2Mi41YTAuNzYgMC43NiAwIDAgMCAwLjc1IDAuNzVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMyAxLjc1YTAuMjUgMC4yNSAwIDAgMSAwLjI1IDAuMjV2NS41YTAuNzUgMC43NSAwIDAgMCAxLjUgMFYxQTAuNzYgMC43NiAwIDAgMCAxNCAwLjI1aC0xYTAuNzYgMC43NiAwIDAgMCAtMC43NSAwLjc1IDAuNzYgMC43NiAwIDAgMCAwLjc1IDAuNzVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk01Ljc1IDEwLjVhMC43NiAwLjc2IDAgMCAwIDAuNzUgMC43NUgxMGEw";
t.characters = t.characters + add;
return { part: 24, addLen: add.length, len: t.characters.length, expect: 12500 };
