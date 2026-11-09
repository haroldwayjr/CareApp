const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NTggMC4wMDU5IDAuMDY4NSAwLjAxIDAuNDE0NyAwLjA3NTQgMC44MjExIC0wLjI2NTIgMC44MjExIC0wLjcxNjFWNS4xYzAgLTEuNjMxNzQgMC44NjUzIC0zLjI0OTI5IDIuMjUzNiAtNC4xMzc1ODZsMS4xOTE3IC0wLjc5NDQ2NWMwLjQ1OTUgLTAuMzA2MzUyIDEuMDgwNCAtMC4xODIxNzcgMS4zODY4IDAuMjc3MzUyTTIuOCA0LjUwMDA2djNjMCAwLjMgMC4yIDAuNSAwLjUgMC41aDcuNWMwLjMgMCAwLjUgLTAuMiAwLjUgLTAuNXYtM2MwIC0wLjMgLTAuMiAtMC41IC0wLjUgLTAuNUgzLjNjLTAuMyAwIC0wLjUgMC4yIC0wLjUgMC41XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1l";
t.characters = t.characters + add;
return { part: 59, addLen: add.length, len: t.characters.length, expect: 30000 };
