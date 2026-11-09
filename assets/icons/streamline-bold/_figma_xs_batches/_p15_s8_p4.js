const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "NTE4OCAtMS4yMzEyIC0yLjc1IC0yLjc1IC0yLjc1SDIuMjk1OVYyLjc1YzAgLTEuNTE4NzggMS4yMzEyMiAtMi43NSAyLjc1IC0yLjc1aDEwem0tMi41NTg2IDcuNzc1NGMwLjY5MDQgMCAxLjI1IDAuNTU5NiAxLjI1IDEuMjV2My4zNDY3YzAgMC42OTAzIC0wLjU1OTYgMS4yNSAtMS4yNSAxLjI1SDEuOTU0MWMtMC42OTAzNSAwIC0xLjI0OTk5OCAtMC41NTk3IC0xLjI0OTk5OCAtMS4yNXYtMy4zNDY3YzAgLTAuNjkwNCAwLjU1OTY0OCAtMS4yNSAxLjI0OTk5OCAtMS4yNXpNNi4yMzkyNiA5LjA4MjAzYy0wLjQxNDIyIDAgLTAuNzUgMC4zMzU3OSAtMC43NSAwLjc1IDAgMC40MTQxNyAwLjMzNTc4IDAuNzQ5OTcgMC43NSAwLjc0OTk3aDcuNDk4MDRjMC40MTQy";
t.characters = t.characters + add;
return { step: 8, part: 4, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
