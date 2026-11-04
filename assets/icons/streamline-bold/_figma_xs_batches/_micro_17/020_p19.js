const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "c3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGQ9XCJNMjMgMjRhMSAxIDAgMCAwIDEgLTEgMC41IDAuNSAwIDAgMCAtMC41IC0wLjVoLTlhMC41IDAuNSAwIDAgMSAwIC0xaDlhMC41IDAuNSAwIDAgMCAwLjUgLTAuNXYtMC41YTAuNSAwLjUgMCAwIDAgLTAuNSAtMC41aC05YTAuNSAwLjUgMCAwIDEgMCAtMWg5YTAuNSAwLjUgMCAwIDAgMC41IC0wLjVWMThhMC40OCAwLjQ4IDAgMCAwIC0wLjI1IC0wLjQzIDAuNTIgMC41MiAwIDAgMSAtMC4yNSAtMC40NFYxYTEgMSAwIDAgMCAtMSAtMUgxNmEwLjUgMC41IDAgMCAwIC0wLjUgMC41VjE3YTAuNSAwLjUgMCAwIDEgLTAuNSAwLjVoLTAuNWEwLjUgMC41IDAgMCAxIC0wLjUgLTAuNVYwLjVhMC41";
t.characters = t.characters + add;
return { part: 19, addLen: add.length, len: t.characters.length, expect: 10000 };
