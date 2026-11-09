const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "IDMgMCAwIDAgOSAzLjA5VjUuNWExIDEgMCAwIDAgMSAxbTEuMjUgLTMuNzVhMC43NSAwLjc1IDAgMSAxIDAuNzUgMC43NSAwLjc2IDAuNzYgMCAwIDEgLTAuNzUgLTAuNzVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0yMS41IDVhMiAyIDAgMCAwIC0yIC0yaC0yLjc1YTAuMjUgMC4yNSAwIDAgMCAtMC4yNSAwLjI1djEuNWEwLjI1IDAuMjUgMCAwIDAgMC4yNSAwLjI1SDE5YTAuNSAwLjUgMCAwIDEgMC41IDAuNXYxNmEwLjUgMC41IDAgMCAxIC0wLjUgMC41SDVhMC41IDAuNSAwIDAgMSAtMC41IC0wLjV2LTE2QTAuNSAwLjUgMCAwIDEgNSA1aDIuMjVhMC4yNSAwLjI1IDAgMCAwIDAuMjUgLTAu";
t.characters = t.characters + add;
return { part: 63, addLen: add.length, len: t.characters.length, expect: 32000 };
