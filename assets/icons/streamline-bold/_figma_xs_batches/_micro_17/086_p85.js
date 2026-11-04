const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MDBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0yMy4zMjUgNy4yNThhMC42NTQgMC42NTQgMCAwIDEgMCAxLjIxNGwtMTAuNzYyIDQuMzRjLTAuNDIyIDAuMTcgLTAuODk0IDAuMTY5IC0xLjMxNCAtMC4wMDNMMy4yNiA5LjUzOWwwIDcuOTAxYTIuMTI4IDIuMTI4IDAgMCAxIDEuMjYyIDEuOTV2My40NTJhMC41IDAuNSAwIDAgMSAtMC41IDAuNUgwLjc1M2EwLjUgMC41IDAgMCAxIC0wLjUgLTAuNVYxOS4zOWMwIC0wLjg3MyAwLjUxNyAtMS42MiAxLjI2MyAtMS45NTFsMCAtOC42MTUgLTAuODY3IC0wLjM1NGEwLjY1NSAwLjY1NSAwIDAgMSAwIC0xLjIxMmwxMC42IC00LjMzOGMwLjQyIC0wLjE3MiAwLjg5MiAtMC4xNzMgMS4zMTQgLTAuMDAzbDEwLjc2";
t.characters = t.characters + add;
return { part: 85, addLen: add.length, len: t.characters.length, expect: 43000 };
