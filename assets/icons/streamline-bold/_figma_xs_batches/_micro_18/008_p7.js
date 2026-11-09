const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCAwIC0wLjg2IDFWMTlhMSAxIDAgMCAwIDEgMWgxNS43NWEwLjUgMC41IDAgMCAwIDAuNSAtMC41VjE4YTAuNzUgMC43NSAwIDAgMSAxLjUgMHYxLjVhMC41IDAuNSAwIDAgMCAwLjUgMC41SDIzYTEgMSAwIDAgMCAxIC0xdi0zLjUzYTEgMSAwIDAgMCAtMC44NCAtMSAyLjUgMi41IDAgMCAxIDAgLTVaTTE0LjUgMTZhMC41IDAuNSAwIDAgMSAtMC41IDAuNUg2YTAuNSAwLjUgMCAwIDEgLTAuNSAtMC41VjhhMC41IDAuNSAwIDAgMSAwLjUgLTAuNWg4YTAuNSAwLjUgMCAwIDEgMC41IDAuNVptNC4yNSAtMi41YTAuNzUgMC43NSAwIDAgMSAtMS41IDB2LTNhMC43NSAwLjc1IDAgMCAxIDEuNSAwWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwi";
t.characters = t.characters + add;
return { part: 7, addLen: add.length, len: t.characters.length, expect: 4000 };
