const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "aDE1YTIgMiAwIDAgMCAyIC0yVjdhMiAyIDAgMCAwIC0xLjIgLTEuODNNNCAzLjVBMS41IDEuNSAwIDAgMSA1LjUgMkgxOGEwLjUgMC41IDAgMCAxIDAuNSAwLjV2MmEwLjUgMC41IDAgMCAxIC0wLjUgMC41SDUuNUExLjUgMS41IDAgMCAxIDQgMy41bTcuNzUgMTcuNzVhNyA3IDAgMSAxIDcgLTcgNyA3IDAgMCAxIC03IDdcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNS4xOSAxNWEwLjUgMC41IDAgMCAwIC0wLjUgMC40NyAxNC42IDE0LjYgMCAwIDEgLTAuNCAyLjYzIDAuNTEgMC41MSAwIDAgMCAwLjIxIDAuNTQgMC41IDAuNSAwIDAgMCAwLjU4IDAgNS41IDUuNSAwIDAgMCAyIC0zIDAuNSAw";
t.characters = t.characters + add;
return { part: 28, addLen: add.length, len: t.characters.length, expect: 14500 };
