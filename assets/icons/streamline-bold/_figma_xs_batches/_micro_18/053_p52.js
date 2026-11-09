const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Mi41IC0wLjVhMC41IDAuNSAwIDAgMSAwLjUgLTAuNWgwLjVhMC41IDAuNSAwIDAgMSAwIDFoLTAuNWEwLjUgMC41IDAgMCAxIC0wLjUgLTAuNW0zIDBhMC41IDAuNSAwIDAgMSAwLjUgLTAuNWgwLjVhMC41IDAuNSAwIDAgMSAwIDFoLTAuNWEwLjUgMC41IDAgMCAxIC0wLjUgLTAuNW0zIDBhMC41IDAuNSAwIDAgMSAwLjUgLTAuNWgwLjVhMC41IDAuNSAwIDAgMSAwIDFoLTAuNWEwLjUgMC41IDAgMCAxIC0wLjUgLTAuNW0zLjUxIDAuNWEwLjUgMC41IDAgMCAxIDAgLTFoMC40OWEwLjUgMC41IDAgMCAxIDAgMVptLTE0LjUxIC0xYTAuNSAwLjUgMCAwIDEgMCAxaC0wLjVhMC41IDAuNSAwIDAgMSAwIC0xWm0tMC41IDNoMC41YTAuNSAwLjUgMCAwIDEgMCAxaC0w";
t.characters = t.characters + add;
return { part: 52, addLen: add.length, len: t.characters.length, expect: 26500 };
