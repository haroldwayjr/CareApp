const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPHBhdGggZD1cIk0yMC40MiAwSDMuNThhMS41IDEuNSAwIDAgMCAtMS40OSAxLjV2Ni4yNmExOC4yNiAxOC4yNiAwIDAgMCA5LjY4IDE2LjE4IDAuNDcgMC40NyAwIDAgMCAwLjQ2IDAgMTguMjYgMTguMjYgMCAwIDAgOS42OCAtMTYuMThWMS41QTEuNSAxLjUgMCAwIDAgMjAuNDIgMG0tMy44IDEzLjJhMSAxIDAgMSAxIC0xLjQxIDEuNDJsLTIuNzcgLTIuNzdhMC41MSAwLjUxIDAgMCAwIC0wLjcxIDBMOSAxNC42MmExIDEgMCAwIDEgLTEuNDIgMCAxIDEgMCAwIDEgMCAtMS40MmwyLjc3IC0yLjc2YTAuNTEgMC41MSAwIDAgMCAwIC0wLjcxTDcuNTUgN0ExIDEg";
t.characters = t.characters + add;
return { part: 54, addLen: add.length, len: t.characters.length, expect: 27500 };
