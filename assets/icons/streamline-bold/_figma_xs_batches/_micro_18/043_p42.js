const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "OSAtMS42OWgtMC4wOHYtMC42N2EwLjc2IDAuNzYgMCAwIDAgLTAuNzUgLTAuNzVoLTMuNThhMC43NSAwLjc1IDAgMCAwIC0wLjc1IDAuNzV2MC42N2ExLjkyIDEuOTIgMCAwIDAgLTEuNzggMS44OXY1LjU0bC0xLjA4IDAuNzJhMC43NiAwLjc2IDAgMCAwIC0wLjIxIDEgMC43NyAwLjc3IDAgMCAwIDAuNjMgMC4zNCAwLjY5IDAuNjkgMCAwIDAgMC40MSAtMC4xM0wyMy42NCAxNWEwLjc2IDAuNzYgMCAwIDAgMC4yMSAtMW0tOC41MiAwLjIzYTAuNDIgMC40MiAwIDAgMSAwLjQ0IC0wLjM5aDAuNTlhMC43NiAwLjc2IDAgMCAwIDAuNzUgLTAuNzV2LTAuNjdoMlYxM2EwLjc1IDAuNzUgMCAwIDAgMC43NSAwLjc1aDAuODNhMC4xOSAwLjE5IDAgMCAxIDAuMTkgMC4x";
t.characters = t.characters + add;
return { part: 42, addLen: add.length, len: t.characters.length, expect: 21500 };
