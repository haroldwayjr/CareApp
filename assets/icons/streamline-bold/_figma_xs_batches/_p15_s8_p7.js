const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "dGggZD1cIk05LjUgMTcuNWE4IDggMCAwIDEgOCAtOCA3Ljg2IDcuODYgMCAwIDEgMy4xNSAwLjY2IDAuMjUgMC4yNSAwIDAgMCAwLjM1IC0wLjIyVjQuNUExLjUgMS41IDAgMCAwIDE5LjUgM0g5LjYyYTAuNTEgMC41MSAwIDAgMSAtMC40NSAtMC4yOEw4LjIyIDAuODNBMS40OSAxLjQ5IDAgMCAwIDYuODggMEgxLjVBMS41IDEuNSAwIDAgMCAwIDEuNXYxNUExLjUgMS41IDAgMCAwIDEuNSAxOGg3LjY0YzAuMjUgMCAwLjM2IC0wLjMzIDAuMzYgLTAuNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE3LjUgMTFhNi41IDYuNSAwIDEgMCA2LjUgNi41IDYuNTEgNi41MSAwIDAgMCAtNi41IC02LjVt";
t.characters = t.characters + add;
return { step: 8, part: 7, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
