const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "IC0yaC0xOWEyIDIgMCAwIDAgLTIgMm0xOS41IC0xYTEgMSAwIDEgMSAtMSAxIDEgMSAwIDAgMSAxIC0xTTMuNSAxNy41aDE3YTAuNzUgMC43NSAwIDAgMSAwIDEuNWgtMTdhMC43NSAwLjc1IDAgMCAxIDAgLTEuNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIuNSAxMS43NWgxOWEzLjMxIDMuMzEgMCAwIDEgMS4zNCAwLjI4IDAuMjcgMC4yNyAwIDAgMCAwLjI2IDAgMC4yNiAwLjI2IDAgMCAwIDAuMDggLTAuMjVsLTEuNjkgLTYuNzJhMy4yMiAzLjIyIDAgMCAwIC0zIC0yLjMxSDUuNWEzLjIyIDMuMjIgMCAwIDAgLTMgMi4zMUwwLjgyIDExLjc0QTAuMjYgMC4yNiAwIDAgMCAwLjkgMTJhMC4y";
t.characters = t.characters + add;
return { part: 9, addLen: add.length, len: t.characters.length, expect: 5000 };
