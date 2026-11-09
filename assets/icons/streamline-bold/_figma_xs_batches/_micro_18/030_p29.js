const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9jb21tZXJjZS9zdG9yZSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiU2hvcC1PcGVuLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFNob3AgT3BlbiBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMyAxOS45MmEyLjM3IDIuMzcgMCAwIDAgMi4zNyAtMi4zOHYtM2EyLjM4IDIuMzggMCAwIDAgLTQuNzUgMHYzQTIuMzggMi4z";
t.characters = t.characters + add;
return { part: 29, addLen: add.length, len: t.characters.length, expect: 15000 };
