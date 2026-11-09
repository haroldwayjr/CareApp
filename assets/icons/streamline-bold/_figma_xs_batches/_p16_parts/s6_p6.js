const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "bjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPHBhdGggZD1cIk0yMC4yNSA2LjVhMC4yNCAwLjI0IDAgMCAxIC0wLjI1IC0wLjI1VjIuNUEyLjUgMi41IDAgMCAwIDE3LjUgMGgtMTFBMi41IDIuNSAwIDAgMCA0IDIuNXYzLjc1YTAuMjUgMC4yNSAwIDAgMSAtMC4yNSAwLjI1SDEuNUExLjUgMS41IDAgMCAwIDAgOHY1YTEuNSAxLjUgMCAwIDAgMS41IDEuNSAxIDEgMCAwIDAgMSAtMXYtNWgxLjI1YTAuMjUgMC4yNSAwIDAgMSAwLjI1IDAuMjV2MTAuNzNBMS41IDEuNSAwIDAgMCA1LjI5IDIxYTAuMjYgMC4yNiAwIDAgMSAwLjIxIDAuMjVWMjNhMSAxIDAgMCAwIDEgMWgyYTEgMSAwIDAgMCAxIC0xdi0xLjc3YTAuMjUgMC4yNSAwIDAg";
t.characters = t.characters + add;
return { step: 6, part: 6, addLen: add.length, len: t.characters.length };
