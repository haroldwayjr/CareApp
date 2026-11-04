const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MCAwIDEgLTEgMW0xLjUgM2EwLjUgMC41IDAgMSAxIDAuNSAtMC41IDAuNSAwLjUgMCAwIDEgLTAuNSAwLjVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIm0yMy42MiA1LjM1IC0wLjQzIC0wLjI1YTAuNSAwLjUgMCAwIDEgLTAuMTkgLTAuNWwwIC0wLjM1IDAgLTAuMzVhMC41IDAuNSAwIDAgMSAwLjI0IC0wLjVsMC40MyAtMC4yNWEwLjc1IDAuNzUgMCAxIDAgLTAuNzUgLTEuM2wtMC40MyAwLjI1YTAuNSAwLjUgMCAwIDEgLTAuNTUgMCAyLjUxIDIuNTEgMCAwIDAgLTAuNjEgLTAuMzYgMC41IDAuNSAwIDAgMSAtMC4zMyAtMC40OXYtMC41YTAuNzUgMC43NSAwIDAgMCAtMS41IDB2MC41YTAuNSAw";
t.characters = t.characters + add;
return { part: 42, addLen: add.length, len: t.characters.length, expect: 21500 };
