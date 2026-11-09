const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "ICAgPHBhdGggZD1cIk0xMiAwYTEgMSAwIDAgMCAtMSAxdjAuMzJhMC4yNSAwLjI1IDAgMCAxIC0wLjIyIDAuMjVBMTIuMTYgMTIuMTYgMCAwIDAgMCAxNHYwLjVhMSAxIDAgMCAwIDIgMGMwIC0wLjUzIDAuNyAtMSAxLjUgLTFzMS41IDAuNSAxLjUgMWExIDEgMCAwIDAgMiAwYzAgLTAuNDEgMC43OCAtMSAyIC0xczIgMC41OSAyIDFhMSAxIDAgMCAwIDIgMGMwIC0wLjQxIDAuNzggLTEgMiAtMXMyIDAuNTkgMiAxYTEgMSAwIDAgMCAyIDBjMCAtMC41MyAwLjcgLTEgMS41IC0xczEuNSAwLjQ3IDEuNSAxYTEgMSAwIDAgMCAyIDBWMTRBMTIuMTYgMTIuMTYgMCAwIDAgMTMuMjIgMS41N2EwLjI1IDAuMjUgMCAwIDEgLTAuMjIgLTAuMjVWMWExIDEgMCAwIDAgLTEg";
t.characters = t.characters + add;
return { step: 6, part: 1, addLen: add.length, len: t.characters.length };
