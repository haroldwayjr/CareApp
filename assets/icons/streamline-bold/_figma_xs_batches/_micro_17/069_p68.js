const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "ZXNjPlxuICAgIFdpbmQgV2VzdCBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJtOS4zMyAxMC40NyA4LjUgM2EwLjUxIDAuNTEgMCAwIDAgMC4xNyAwIDAuNTIgMC41MiAwIDAgMCAwLjM4IC0wLjE3IDAuNSAwLjUgMCAwIDAgMC4wNyAtMC41NWwtMS4zNCAtMi42N2EwLjI4IDAuMjggMCAwIDEgMCAtMC4yMmwxLjM0IC0yLjY3YTAuNSAwLjUgMCAwIDAgLTAuMDcgLTAuNTUgMC41MiAwLjUyIDAgMCAwIC0wLjU1IC0wLjE0bC04LjUgM2EwLjUgMC41IDAgMCAwIDAgMC45NFpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGgg";
t.characters = t.characters + add;
return { part: 68, addLen: add.length, len: t.characters.length, expect: 34500 };
