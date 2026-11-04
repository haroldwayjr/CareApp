const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MSAwLjI1IC0wLjIzaDQuNWEwLjI1IDAuMjUgMCAwIDEgMC4yNSAwLjI1VjIzYTEgMSAwIDAgMCAxIDFoMmExIDEgMCAwIDAgMSAtMXYtMS43OWEwLjI2IDAuMjYgMCAwIDEgMC4yMSAtMC4yNUExLjUgMS41IDAgMCAwIDIwIDE5LjQ4VjguNzVhMC4yNSAwLjI1IDAgMCAxIDAuMjUgLTAuMjVoMS4yNXY1YTEgMSAwIDAgMCAxIDFBMS41IDEuNSAwIDAgMCAyNCAxM1Y4YTEuNSAxLjUgMCAwIDAgLTEuNSAtMS41Wm0tMi43NSAxYTAuNSAwLjUgMCAwIDEgMC41IDAuNXY2YTAuNSAwLjUgMCAwIDEgLTAuNSAwLjVoLTExQTAuNSAwLjUgMCAwIDEgNiAxNFY4YTAuNSAwLjUgMCAwIDEgMC41IC0wLjVaTTkuNSA0VjNhMC41IDAuNSAwIDAgMSAwLjUgLTAuNWg0YTAuNSAw";
t.characters = t.characters + add;
return { step: 6, part: 7, addLen: add.length, len: t.characters.length };
