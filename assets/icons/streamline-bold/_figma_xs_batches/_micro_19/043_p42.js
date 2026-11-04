const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "N2wxLjA2IC0xLjg1YTMuMTkgMy4xOSAwIDAgMSAxLjE0IC0xLjE0IDIuOTQgMi45NCAwIDAgMSAyLjU0IC0wLjIyYzAuMDggLTQgMC4zNyAtNy40NiAwLjg3IC03LjQ2IDAuNzEgMCAxIDQuMDYgMSA5LjA4YTIuNTMgMi41MyAwIDAgMSAwLjY3IC0wLjFIMjFDMjEgMC4wNiAyMCAwLjA1IDE5LjM5IDAuMDVoLTMuMTFhMS40NyAxLjQ3IDAgMCAwIC0xLjQ0IDEuMTIgMjEuMDUgMjEuMDUgMCAwIDAgLTAuMzYgMi4wOEg1Ljg5YzAuMDcgLTAuNTggMC4xMyAtMS4xMSAwLjE5IC0xLjVBMS40OCAxLjQ4IDAgMCAwIDQuNjIgMC4wNWgtMmExLjQ4IDEuNDggMCAwIDAgLTEuNDkgMS4xNkMwLjEyIDUuOTIgMCAxMiAwLjYzIDIwLjgyYTEuNSAxLjUgMCAwIDAgMSAxLjMg";
t.characters = t.characters + add;
return { part: 42, addLen: add.length, len: t.characters.length, expect: 21500 };
