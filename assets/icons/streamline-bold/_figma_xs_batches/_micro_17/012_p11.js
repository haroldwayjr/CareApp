const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "XCJNMTQuMDggMi40MmExIDEgMCAwIDAgLTEuNDEgMGwtMC43MSAwLjdhMSAxIDAgMCAwIC0wLjI5IDAuNjdBMC4yNSAwLjI1IDAgMCAwIDEyIDRhOC43NSA4Ljc1IDAgMCAxIDIuMTIgLTAuNSAwLjIzIDAuMjMgMCAwIDAgMC4yMiAtMC4xOSAxIDEgMCAwIDAgLTAuMjYgLTAuODlcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk01LjQ2IDkuNTRhMC4yNSAwLjI1IDAgMCAwIDAuMTIgLTAuMjkgMi43NiAyLjc2IDAgMCAxIC0wLjEgLTAuNzcgMyAzIDAgMCAxIDMgLTMgMi45MSAyLjkxIDAgMCAxIDEuMSAwLjIxIDAuMjggMC4yOCAwIDAgMCAwLjI1IDAgOCA4IDAgMCAxIDEuMzcgLTAuOTIgMC4yMyAw";
t.characters = t.characters + add;
return { part: 11, addLen: add.length, len: t.characters.length, expect: 6000 };
