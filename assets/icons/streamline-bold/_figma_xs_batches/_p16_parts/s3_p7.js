const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "czAgMS4wNCAtMS4wNCAxLjA0SDQuNDRzLTEuMDQgMCAtMS4wNCAtMS4wNFY0LjUzczAgLTEuMDQgMS4wNCAtMS4wNFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTI0IDE1LjY0YTMuNjYgMy42NiAwIDAgMCAtNy4zMiAwdjMuMTNoMS42NmwwLjQzIDUuMjNoMy4xNGwwLjQzIC01LjIzSDI0WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE3LjQ2IDcuNTZhMi44OCAyLjg4IDAgMSAwIDUuNzYgMCAyLjg4IDIuODggMCAxIDAgLTUuNzYgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8";
t.characters = t.characters + add;
return { step: 3, part: 7, addLen: add.length, len: t.characters.length };
