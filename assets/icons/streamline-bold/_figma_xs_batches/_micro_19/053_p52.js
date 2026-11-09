const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "LjQ2IDMuNDYgMCAwIDAgMi42MiAtMS4zOSAxIDEgMCAwIDAgLTEuNiAtMS4yQTEuNSAxLjUgMCAwIDEgMiAxMmExLjQ2IDEuNDYgMCAwIDEgMC4zIC0wLjlBMSAxIDAgMCAwIDAuNyA5Ljg3IDMuNDUgMy40NSAwIDAgMCAwIDEyYTMuNDggMy40OCAwIDAgMCAxLjEyIDIuNTYgMSAxIDAgMCAxIDAuMzEgMC43IDUuMDYgNS4wNiAwIDAgMCAxLjkzIDMuODJsMC42NSAwLjVhMSAxIDAgMCAxIDAuMzggMC44NCA1IDUgMCAwIDAgMC4xIDEuMjJjMCAwLjA4IDAgLTAuMDYgMC40NyAxLjM4YTEuNTEgMS41MSAwIDAgMCAxLjQyIDFoMTEuMjRBMS41MSAxLjUxIDAgMCAwIDE5IDIzYzAuNDkgLTEuNDQgMC40NSAtMS4zIDAuNDcgLTEuMzhhNSA1IDAgMCAwIDAuMSAtMS4y";
t.characters = t.characters + add;
return { part: 52, addLen: add.length, len: t.characters.length, expect: 26500 };
