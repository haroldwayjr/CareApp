const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "IChfKSB7fQogIHNldC5jbGlwc0NvbnRlbnQgPSB0cnVlOwogIHJldHVybiB7IG9rOiB0cnVlIH07Cn0KY29uc3QgQkFUQ0ggPSBbeyJzZXROYW1lIjogImljb24vZmlsZXMvY2xvdWQudXBsb2FkIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJDbG91ZC1VcGxvYWQtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQ2xvdWQgVXBsb2FkIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0yNCAxMC40MWE1LjgyIDUuODIgMCAwIDAgLTEuNzcgLTQuMTYgNS43IDUu";
t.characters = t.characters + add;
return { step: 0, part: 5, addLen: add.length, len: t.characters.length };
