const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "c3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiV2VhdGhlci1DbG91ZC1TdW4tV2luZC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBXZWF0aGVyIENsb3VkIFN1biBXaW5kIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk04LjI1IDNhMSAxIDAgMCAwIDEgLTFWMWExIDEgMCAwIDAgLTIgMHYxYTEgMSAwIDAgMCAxIDFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0zLjEyIDQuNTRhMSAxIDAgMCAwIDAuNzEgMC4yOSAxIDEgMCAwIDAgMC43MSAtMC4yOSAxIDEgMCAwIDAgMCAt";
t.characters = t.characters + add;
return { part: 76, addLen: add.length, len: t.characters.length, expect: 38500 };
