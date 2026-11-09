const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "bWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBIZWFkcGhvbmVzIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk03LjQ0IDE0YTUgNSAwIDAgMCAwLjIzIDEwIDAuMzEgMC4zMSAwIDAgMCAwLjMzIC0wLjMzdi05LjE1YTAuNTEgMC41MSAwIDAgMCAtMC41NiAtMC41MlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE2LjU2IDE0YTAuNTEgMC41MSAwIDAgMCAtMC41NiAwLjV2OS4xMmEwLjM1IDAuMzUgMCAwIDAgMC4zNyAwLjM0IDUgNSAwIDAgMCAwLjE5IC0xMFpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0";
t.characters = t.characters + add;
return { step: 7, part: 6, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
