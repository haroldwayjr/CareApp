const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IChfKSB7fQogIHNldC5jbGlwc0NvbnRlbnQgPSB0cnVlOwogIHJldHVybiB7IG9rOiB0cnVlIH07Cn0KY29uc3QgQkFUQ0ggPSBbeyJzZXROYW1lIjogImljb24vbWlzYy9zbm93IiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJXZWF0aGVyLVNub3ctLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgV2VhdGhlciBTbm93IFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPGc+XG4gICAgICA8cGF0aCBkPVwiTTIyLjA5IDEyLjA3YTAuMjUgMC4yNSAwIDAgMSAtMC4wOSAtMC4xOSA3";
t.characters = t.characters + add;
return { part: 5, addLen: add.length, len: t.characters.length, expect: 3000 };
