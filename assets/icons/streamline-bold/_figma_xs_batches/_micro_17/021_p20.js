const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDAuNSAwIDAgMCAtMC41IC0wLjVoLTEyQTEuNSAxLjUgMCAwIDAgMCAxLjV2MjFBMS41IDEuNSAwIDAgMCAxLjUgMjRaTTE5LjUgMi41YTIgMiAwIDEgMSAtMiAyIDIgMiAwIDAgMSAyIC0ybS0yIDEyYTIgMiAwIDAgMSA0IDBWMTdhMC41IDAuNSAwIDAgMSAtMC41IDAuNWgtM2EwLjUgMC41IDAgMCAxIC0wLjUgLTAuNVpNNS41IDE5YTAuNSAwLjUgMCAwIDEgLTAuNSAwLjVIMi41QTAuNSAwLjUgMCAwIDEgMiAxOXYtMy4yNWExLjc1IDEuNzUgMCAwIDEgMy41IDBabTAgLTEwYTAuNSAwLjUgMCAwIDEgLTAuNSAwLjVIMi41QTAuNSAwLjUgMCAwIDEgMiA5VjUuNzVhMS43NSAxLjc1IDAgMCAxIDMuNSAwWk0xMiAxOWEwLjUgMC41IDAgMCAxIC0wLjUgMC41SDlh";
t.characters = t.characters + add;
return { part: 20, addLen: add.length, len: t.characters.length, expect: 10500 };
