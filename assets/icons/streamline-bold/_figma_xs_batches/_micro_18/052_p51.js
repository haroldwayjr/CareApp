const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Mi41IDAgMCAxIDAgNWgtMTNhNCA0IDAgMCAwIC00IDR2MC4yNmEwLjI1IDAuMjUgMCAwIDEgLTAuMjMgMC4yNUEyLjUxIDIuNTEgMCAwIDAgMCAxNS41djZBMi41IDIuNSAwIDAgMCAyLjUgMjRoMTlhMi41IDIuNSAwIDAgMCAyLjUgLTIuNXYtNmEyLjUgMi41IDAgMCAwIC0yLjUgLTIuNW0tMC4yNSA3LjVoLTAuNWEwLjUgMC41IDAgMCAxIDAgLTFoMC41YTAuNSAwLjUgMCAwIDEgMCAxbTAgLTNoLTAuNWEwLjUgMC41IDAgMCAxIDAgLTFoMC41YTAuNSAwLjUgMCAwIDEgMCAxbS0xNC43NSAyaDExYTAuNSAwLjUgMCAwIDEgMCAxaC0xMWEwLjUgMC41IDAgMCAxIDAgLTFtLTAuNzUgLTJhMC41IDAuNSAwIDAgMSAwIC0xaDAuNWEwLjUgMC41IDAgMCAxIDAgMVpt";
t.characters = t.characters + add;
return { part: 51, addLen: add.length, len: t.characters.length, expect: 26000 };
