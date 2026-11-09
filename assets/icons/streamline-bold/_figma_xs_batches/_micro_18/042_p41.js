const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Z2luZyAyIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0yMS42NyAxNy40OGEwLjc2IDAuNzYgMCAwIDAgLTAuNzUgMC43NXYzLjExYTAuNDEgMC40MSAwIDAgMSAtMC40MyAwLjM5aC00LjcyYTAuNzUgMC43NSAwIDAgMCAwIDEuNWg0LjcyYTEuOTIgMS45MiAwIDAgMCAxLjkzIC0xLjg5di0zLjExYTAuNzYgMC43NiAwIDAgMCAtMC43NSAtMC43NVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzLjg1IDE0YTAuNzUgMC43NSAwIDAgMCAtMSAtMC4yMWwtMC4zOSAwLjI2YTEuNjkgMS42OSAwIDAgMCAtMS42";
t.characters = t.characters + add;
return { part: 41, addLen: add.length, len: t.characters.length, expect: 21000 };
