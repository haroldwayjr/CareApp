const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "LjQ0YTAuMjQgMC4yNCAwIDAgMCAwLjI0IDAuMlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL2J1ZyIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJDYXRjaC1CdWctLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQ2F0Y2ggQnVnIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPHBhdGggZmlsbD1cIiMwMDAwMDBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIg";
t.characters = t.characters + add;
return { part: 61, addLen: add.length, len: t.characters.length, expect: 31000 };
