const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "Yz5cbiAgICBJbnNlcnQgUm93IEZyb20gQ2xpcGJvYXJkIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPHBhdGggZmlsbD1cIiMwMDAwMDBcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xNC40IDQuMTgwMDVjLTAuMSAwLjMgLTAuNCAwLjUgLTAuNyAwLjVINy4zMDAwMmMtMC4zIDAgLTAuNjAwMDIgLTAuMiAtMC43MDAwMiAtMC41bC0xIC0zYy0wLjE3ODEyIC0wLjU3MDY3NSAwLjI0MDc1IC0wLjk5OTk5NiAwLjcwMDAyIC0wLjk5OTk5NkgxNC43YzAuNTE1OCAwIDAuODYxNSAwLjUxNTUzOSAwLjcgMC45OTk5OTZ6bTEuNDIzIDAuNDc0MzVjLTAuMzE0OCAwLjk0NDQzIC0xLjIxMTYgMS41MjU2NSAt";
t.characters = t.characters + add;
return { step: 8, part: 0, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
