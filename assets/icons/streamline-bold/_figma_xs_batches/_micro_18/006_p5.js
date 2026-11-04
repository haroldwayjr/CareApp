const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IChfKSB7fQogIHNldC5jbGlwc0NvbnRlbnQgPSB0cnVlOwogIHJldHVybiB7IG9rOiB0cnVlIH07Cn0KY29uc3QgQkFUQ0ggPSBbeyJzZXROYW1lIjogImljb24vbWlzYy90aWNrZXQiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlRpY2tldC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBUaWNrZXQgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTExLjUgOS43NWgtM2EwLjc1IDAuNzUgMCAwIDAgMCAxLjVoM2EwLjc1IDAuNzUgMCAwIDAgMCAtMS41XCIg";
t.characters = t.characters + add;
return { part: 5, addLen: add.length, len: t.characters.length, expect: 3000 };
