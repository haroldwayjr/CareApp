const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0yMy40MyAyMy4xNWExIDEgMCAwIDAgMCAtMS40MWwtNy4xNiAtNy4xNyAzLjQxIC00Ljc4YTAuNDkgMC40OSAwIDAgMCAwIC0wLjUyIDAuNSAwLjUgMCAwIDAgLTAuNCAtMC4yN0gxMS45TDEzLjc2IDAuNjFhMC40OSAwLjQ5IDAgMCAwIC0wLjI4IC0wLjYxIDAuNSAwLjUgMCAwIDAgLTAuNjEgMC4xN0w4LjMgNi42MSAyIDAuMjlBMSAxIDAgMCAwIDAuNTcgMS43bDIxLjUxIDIxLjVhMSAxIDAgMCAwIDAuNjQgMC4yNSAxIDEgMCAwIDAgMC43MSAtMC4zXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRo";
t.characters = t.characters + add;
return { part: 55, addLen: add.length, len: t.characters.length, expect: 28000 };
