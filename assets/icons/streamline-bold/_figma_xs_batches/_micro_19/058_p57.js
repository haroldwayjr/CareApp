const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "ZW1lcmdlbmN5IiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJIb3NwaXRhbC1FbWVyZ2VuY3ktRGVwYXJ0bWVudC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBIb3NwaXRhbCBFbWVyZ2VuY3kgRGVwYXJ0bWVudCBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNNSAxOS43NWEwLjUgMC41IDAgMCAwIDAuNSAwLjVoMTNhMC41IDAuNSAwIDAgMCAwLjUgLTAuNXYtN2E3IDcgMCAwIDAgLTE0IDBabTguMjUgLTkuNXYyaDJhMC41IDAuNSAwIDAgMSAwLjUgMC41";
t.characters = t.characters + add;
return { part: 57, addLen: add.length, len: t.characters.length, expect: 29000 };
