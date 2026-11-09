const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "NyA5Ljc3IDAgMCAwIC0xLjEgLTQuMTUgMC4xMiAwLjEyIDAgMCAwIC0wLjExIC0wLjA5aC0wLjU4YTAuMTIgMC4xMiAwIDAgMCAtMC4wMyAwLjA1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNOC44MSAxNS40N2EwLjUgMC41IDAgMCAwIC0wLjUgLTAuNDdoLTEuNGEwLjQ5IDAuNDkgMCAwIDAgLTAuMzkgMC4xOSAwLjUgMC41IDAgMCAwIC0wLjA5IDAuNDQgNS41IDUuNSAwIDAgMCAyIDMgMC41IDAuNSAwIDAgMCAwLjU4IDAgMC41MSAwLjUxIDAgMCAwIDAuMjEgLTAuNTQgMTQuNiAxNC42IDAgMCAxIC0wLjQxIC0yLjYyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9w";
t.characters = t.characters + add;
return { part: 26, addLen: add.length, len: t.characters.length, expect: 13500 };
