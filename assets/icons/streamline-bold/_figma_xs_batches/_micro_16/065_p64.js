const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MjV2LTEuNUEwLjI1IDAuMjUgMCAwIDAgNy4yNSAzSDQuNWEyIDIgMCAwIDAgLTIgMnYxN2EyIDIgMCAwIDAgMiAyaDE1YTIgMiAwIDAgMCAyIC0yWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTkuODggMTYuMjJjLTEuNzEgMC42MyAtMyAxLjA5IC0zLjM1IDEuODhBNS40NCA1LjQ0IDAgMCAwIDYgMjAuMjdhMC41IDAuNSAwIDAgMCAwLjUgMC41aDExYTAuNSAwLjUgMCAwIDAgMC41IC0wLjUgNS40NCA1LjQ0IDAgMCAwIC0wLjUzIC0yLjE3Yy0wLjQgLTAuNzkgLTEuNjQgLTEuMjUgLTMuMzUgLTEuODhsLTAuMjYgLTAuMDlhMC4yNSAwLjI1IDAgMCAxIC0wLjE2IC0wLjI0di0wLjU4YTAuMjMg";
t.characters = t.characters + add;
return { part: 64, addLen: add.length, len: t.characters.length, expect: 32500 };
