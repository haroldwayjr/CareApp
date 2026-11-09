const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MC4wNTY2IC0wLjA5NzggLTAuMDEyMSAtMC4wMzYxIC0wLjAxNjYgLTAuMDc0MyAtMC4wMTM0IC0wLjExMjIgMC4wMDc3IC0wLjAzNzYgMC4wMjMyIC0wLjA3MyAwLjA0NTYgLTAuMTA0IDAuMDIyNCAtMC4wMzExIDAuMDUxMiAtMC4wNTcgMC4wODQ0IC0wLjA3NmwwLjggLTAuNDcwMDVjMC4xODQ1IC0wLjA5MDY2IDAuMzQ4NSAtMC4yMTgyOSAwLjQ4MTYgLTAuMzc0OTcgMC4xMzMxIC0wLjE1NjY3IDAuMjMyNiAtMC4zMzkwNSAwLjI5MjMgLTAuNTM1NzkgMC4wNTk3IC0wLjE5Njc1IDAuMDc4MyAtMC40MDM2NyAwLjA1NDcgLTAuNjA3OTIgLTAuMDIzNiAtMC4yMDQyNCAtMC4wODkgLTAuNDAxNDQgLTAuMTkyIC0wLjU3OTM2IC0wLjEwMzEgLTAuMTc3OTIgLTAu";
t.characters = t.characters + add;
return { part: 6, addLen: add.length, len: t.characters.length, expect: 3500 };
