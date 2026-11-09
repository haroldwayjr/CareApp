const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "Mi40OSAwIDAgMSAtMS45MSAtMC45NFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEwIDE0Ljc0YTEgMSAwIDAgMCAwLjcgMS4yNiAwLjkgMC45IDAgMCAwIDAuMyAwIDEgMSAwIDAgMCAxIC0wLjcxIDExIDExIDAgMCAwIDAuNCAtMy40NkE1LjM2IDUuMzYgMCAwIDAgMTYuMyA3YzAuMyAtMyAtMS41OCAtNS42IC00LjE4IC01Ljg2YTUuNDMgNS40MyAwIDAgMCAtMC41NyAwIDEgMSAwIDAgMCAtMSAxIDEgMSAwIDAgMCAxIDFoMC4zYzEuNSAwLjE1IDIuNTcgMS44IDIuMzggMy42N3MtMS41NSAzLjI4IC0zLjA2IDMuMTNhMS45MSAxLjkxIDAgMCAxIC0wLjMzIC0wLjA2IDEgMSAwIDAgMCAtMC42";
t.characters = t.characters + add;
return { step: 9, part: 1, addLen: add.length, len: t.characters.length };
