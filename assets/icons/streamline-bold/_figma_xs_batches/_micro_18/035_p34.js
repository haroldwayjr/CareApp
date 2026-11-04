const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjQgNS4wNyAyMi4yNCAxYTEuNTEgMS41MSAwIDAgMCAtMS4zNiAtMWgtMi43NWEwLjI0IDAuMjQgMCAwIDAgLTAuMTkgMC4xIDAuMjUgMC4yNSAwIDAgMCAtMC4wNSAwLjIybDEuMzMgNC44M2EwLjY0IDAuNjQgMCAwIDEgMCAwLjJ2My41N2EwLjI1IDAuMjUgMCAwIDAgMC4xNiAwLjIzIDMuMzQgMy4zNCAwIDAgMCA0LjU5IC0zdi0wLjg4YTAuNzQgMC43NCAwIDAgMCAwLjAzIC0wLjJcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMS4yNSAwLjI1QTAuMjUgMC4yNSAwIDAgMCAxMSAwSDcuOTNhMC4yNiAw";
t.characters = t.characters + add;
return { part: 34, addLen: add.length, len: t.characters.length, expect: 17500 };
