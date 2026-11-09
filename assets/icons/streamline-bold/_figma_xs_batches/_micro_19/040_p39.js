const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MCAtMC40MiAwLjA2IDAuNDcgMC40NyAwIDAgMCAtMC4yMiAwLjM3Yy0wLjQ1IDQuMSAtMSA5LjggLTEgMTAuNzdBMi41IDIuNSAwIDAgMCA1LjUgMjRoMTNhMi41IDIuNSAwIDAgMCAyLjUgLTIuNWMwIC0xIC0wLjU5IC02LjY3IC0xIC0xMC43N2EwLjQ5IDAuNDkgMCAwIDAgLTAuMjIgLTAuMzcgMC41MiAwLjUyIDAgMCAwIC0wLjQyIC0wLjA2IDQuNDQgNC40NCAwIDAgMSAtMS4zNiAwLjJtLTEuNSA4YTAuNSAwLjUgMCAwIDEgLTAuNSAwLjVIOGEwLjUgMC41IDAgMCAxIC0wLjUgLTAuNXYtNEEwLjUgMC41IDAgMCAxIDggMTRoOGEwLjUgMC41IDAgMCAxIDAuNSAwLjVaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAg";
t.characters = t.characters + add;
return { part: 39, addLen: add.length, len: t.characters.length, expect: 20000 };
