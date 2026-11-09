const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "cGF0aCBkPVwiTTE3LjE0IDIyLjQ2SDEuODRhMC4yNyAwLjI3IDAgMCAxIC0wLjI3IC0wLjI2VjEuODFhMC4yNyAwLjI3IDAgMCAxIDAuMjcgLTAuMjZoMjAuNjN2Mi4xOUE0LjM3IDQuMzcgMCAwIDEgMjQgNS4xMVYwLjhhMC43NSAwLjc1IDAgMCAwIC0wLjc1IC0wLjc1SDEuODRBMS43NiAxLjc2IDAgMCAwIDAuMDcgMS44MVYyMi4yQTEuNzYgMS43NiAwIDAgMCAxLjg0IDI0aDE1LjQyWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL2ZpbGVzL2VudmVsb3BlIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3";
t.characters = t.characters + add;
return { step: 4, part: 0, addLen: add.length, len: t.characters.length };
