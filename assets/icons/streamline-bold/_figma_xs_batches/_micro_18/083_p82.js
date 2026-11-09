const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "LjUgMCAwIDAgLTkgMHY5LjQ0YTAuMjMgMC4yMyAwIDAgMSAtMC4wNiAwLjE2QTYgNiAwIDEgMCAxMiAxOGE2IDYgMCAwIDAgLTEuNDQgLTMuOSAwLjIzIDAuMjMgMCAwIDEgLTAuMDYgLTAuMTZaTTYgMjJhNCA0IDAgMCAxIC0yLjggLTYuODYgMSAxIDAgMCAwIDAuMyAtMC43MVY0LjVhMi41IDIuNSAwIDAgMSA1IDB2OS45M2ExIDEgMCAwIDAgMC4zIDAuNzFBNCA0IDAgMCAxIDYgMjJcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk03LjExIDE2LjM0YTAuMjYgMC4yNiAwIDAgMSAtMC4xMSAtMC4yMVY2LjVhMSAxIDAgMCAwIC0yIDB2OS42M2EwLjI2IDAuMjYgMCAwIDEgLTAuMTEgMC4yMSAyIDIg";
t.characters = t.characters + add;
return { part: 82, addLen: add.length, len: t.characters.length, expect: 41500 };
