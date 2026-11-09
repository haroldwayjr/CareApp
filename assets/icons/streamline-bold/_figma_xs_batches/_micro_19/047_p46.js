const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "Ny42NyAwLjg4IDAuNSAtMSAxLjc1YTEuNiAxLjYgMCAwIDAgMS4zOSAyLjRoMi4yNWEwLjc1IDAuNzUgMCAwIDAgMCAtMS41aC0yLjMxYTAuMSAwLjEgMCAwIDEgMCAtMC4xNGwxIC0xLjc3IDEgMC41NGEwLjcxIDAuNzEgMCAwIDAgMC4zNyAwLjEgMC43OCAwLjc4IDAgMCAwIDAuNDYgLTAuMTYgMC43NiAwLjc2IDAgMCAwIDAuMjYgLTAuOGwtMC42OSAtMi40NGEwLjczIDAuNzMgMCAwIDAgLTEuMDYgLTAuNWwtMi4zMyAwLjY2YTAuNzQgMC43NCAwIDAgMCAtMC4xNiAxLjM3WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvYXRvbSIsICJzdmciOiAi";
t.characters = t.characters + add;
return { part: 46, addLen: add.length, len: t.characters.length, expect: 23500 };
