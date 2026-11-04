const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Ljg2IDAgMCAwIDAuNzggMC40OGwwLjIgMGEwLjg5IDAuODkgMCAwIDAgMC42NyAtMC44NlYxM2EwLjg3IDAuODcgMCAwIDAgLTAuODUgLTAuODNcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNC4zNyAxNGEwLjEzIDAuMTMgMCAwIDEgMC4xMyAtMC4xMmgyYTAuODggMC44OCAwIDAgMCAwIC0xLjc1aC0yQTEuODggMS44OCAwIDAgMCAxMi42MiAxNHY0YTEuODggMS44OCAwIDAgMCAxLjg4IDEuODhoMmEwLjg4IDAuODggMCAwIDAgMCAtMS43NWgtMmEwLjEzIDAuMTMgMCAwIDEgLTAuMTMgLTAuMTN2LTAuODdhMC4yNSAwLjI1IDAgMCAxIDAuMjUgLTAuMjVoMC44OGEwLjg4IDAuODggMCAwIDAg";
t.characters = t.characters + add;
return { part: 31, addLen: add.length, len: t.characters.length, expect: 16000 };
