const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Ljc2IDAuNzYgMCAwIDAgMC43NSAwLjc1SDIzYTAuNzUgMC43NSAwIDAgMCAwIC0xLjVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNi41IDIwLjI1aDNhMC43NiAwLjc2IDAgMCAwIDAuNzUgLTAuNzV2LTNhMC43NiAwLjc2IDAgMCAwIC0wLjc1IC0wLjc1aC0zYTAuNzYgMC43NiAwIDAgMCAtMC43NSAwLjc1djNhMC43NiAwLjc2IDAgMCAwIDAuNzUgMC43NW0wLjc1IC0yLjc1YTAuMjUgMC4yNSAwIDAgMSAwLjI1IC0wLjI1aDFhMC4yNSAwLjI1IDAgMCAxIDAuMjUgMC4yNXYxYTAuMjUgMC4yNSAwIDAgMSAtMC4yNSAwLjI1aC0xYTAuMjUgMC4yNSAwIDAgMSAtMC4yNSAtMC4yNVpcIiBmaWxs";
t.characters = t.characters + add;
return { part: 27, addLen: add.length, len: t.characters.length, expect: 14000 };
