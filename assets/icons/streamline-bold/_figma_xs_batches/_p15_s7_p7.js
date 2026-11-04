const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMiAwQTEyIDEyIDAgMCAwIDAgMTJ2NmExIDEgMCAwIDAgMiAwdi02YTEwIDEwIDAgMCAxIDIwIDB2NmExIDEgMCAwIDAgMiAwdi02QTEyIDEyIDAgMCAwIDEyIDBcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9maWxlcy9jbGlwYm9hcmQiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiSW5zZXJ0LVJvdy1Gcm9tLUNsaXBib2FyZC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVz";
t.characters = t.characters + add;
return { step: 7, part: 7, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
