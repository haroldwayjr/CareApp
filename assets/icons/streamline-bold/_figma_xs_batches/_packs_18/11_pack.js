const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const parts = [
  "IDIuNjEgMCAwIDEgMCAxLjM2IDAuMjIgMC4yMiAwIDAgMCAwIDAuMjIgMC4yNSAwLjI1IDAgMCAwIDAuMiAwLjFIMTlhNSA1IDAgMCAwIDMgLTlcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMC41IDE4YTEgMSAwIDAgMCAwIC0ySDFhMSAxIDAgMCAwIDAgMlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNC41IDIwYTEgMSAwIDAgMCAtMSAtMUg0YTEgMSAwIDAgMCAwIDJoOS41YTEgMSAwIDAgMCAxIC0xXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTAuNSAy",
  "MkgxYTEgMSAwIDAgMCAwIDJoOS41YTEgMSAwIDAgMCAwIC0yXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy90ZW1wZXJhdHVyZSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiVGVtcGVyYXR1cmUtVXAtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgVGVtcGVyYXR1cmUgVXAgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTEwLjUgNC41YTQuNSA0",
  "LjUgMCAwIDAgLTkgMHY5LjQ0YTAuMjMgMC4yMyAwIDAgMSAtMC4wNiAwLjE2QTYgNiAwIDEgMCAxMiAxOGE2IDYgMCAwIDAgLTEuNDQgLTMuOSAwLjIzIDAuMjMgMCAwIDEgLTAuMDYgLTAuMTZaTTYgMjJhNCA0IDAgMCAxIC0yLjggLTYuODYgMSAxIDAgMCAwIDAuMyAtMC43MVY0LjVhMi41IDIuNSAwIDAgMSA1IDB2OS45M2ExIDEgMCAwIDAgMC4zIDAuNzFBNCA0IDAgMCAxIDYgMjJcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk03LjExIDE2LjM0YTAuMjYgMC4yNiAwIDAgMSAtMC4xMSAtMC4yMVY2LjVhMSAxIDAgMCAwIC0yIDB2OS42M2EwLjI2IDAuMjYgMCAwIDEgLTAuMTEgMC4yMSAyIDIg",
  "MCAxIDAgMi4yMiAwXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTMgOWExIDEgMCAwIDAgMC42NiAtMC4yNWwzLjI4IC0yLjg3YTAuMjYgMC4yNiAwIDAgMSAwLjMgMGwyLjIxIDEuNDdhMSAxIDAgMCAwIDEuMjYgLTAuMTJsMyAtM2ExIDEgMCAxIDAgLTEuNDIgLTEuNDJMMjAgNS4wN2EwLjI2IDAuMjYgMCAwIDEgLTAuMzIgMGwtMi4xMyAtMS40YTEgMSAwIDAgMCAtMS4yMSAwLjA4bC00IDMuNWExIDEgMCAwIDAgLTAuMDkgMS40MUExIDEgMCAwIDAgMTMgOVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzIDExLjVIMTNhMSAx",
  "IDAgMCAwIDAgMmgxMGExIDEgMCAwIDAgMCAtMlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In1dOwpsZXQgb2s9MCwgbWlzc2luZz0wLCBmYWlsZWQ9MDsgY29uc3QgbWlzcz1bXSwgZmFpbD1bXTsKZm9yIChjb25zdCBpdGVtIG9mIEJBVENIKSB7CiAgY29uc3Qgc2V0ID0gcGFnZS5maW5kT25lKG4gPT4gbi50eXBlID09PSAnQ09NUE9ORU5UX1NFVCcgJiYgbi5uYW1lID09PSBpdGVtLnNldE5hbWUpOwogIGlmICghc2V0KSB7IG1pc3NpbmcrKzsgaWYgKG1pc3MubGVuZ3RoPDgpIG1pc3MucHVzaChpdGVtLnNldE5hbWUpOyBjb250aW51ZTsgfQogIHRyeSB7CiAgICBjb25zdCByID0gYXBwbHlC",
  "b2xkWHMoc2V0LCBpdGVtLnN2Zyk7CiAgICBpZiAoci5vaykgb2srKzsgZWxzZSB7IGZhaWxlZCsrOyBmYWlsLnB1c2goe25hbWU6aXRlbS5zZXROYW1lLHJ9KTsgfQogIH0gY2F0Y2goZSkgeyBmYWlsZWQrKzsgaWYgKGZhaWwubGVuZ3RoPDgpIGZhaWwucHVzaCh7bmFtZTppdGVtLnNldE5hbWUsZXJyOlN0cmluZyhlKX0pOyB9Cn0KcmV0dXJuIHsgb2ssIG1pc3NpbmcsIGZhaWxlZCwgbWlzcywgZmFpbCB9Owo=",
];
const add = parts.join("");
let h = 0; for (let i = 0; i < add.length; i++) h = ((h << 5) - h + add.charCodeAt(i)) | 0;
if (add.length !== 2812 || h !== 703992410) return { error: "pack-corrupt", len: add.length, hash: h, wantLen: 2812, wantHash: 703992410 };
t.characters = t.characters + add;
let fh = 0; const s = t.characters; for (let i = 0; i < s.length; i++) fh = ((fh << 5) - fh + s.charCodeAt(i)) | 0;
if (s.length !== 42812 || fh !== -929923337) return { error: "cum-corrupt", len: s.length, hash: fh, wantLen: 42812, wantHash: -929923337 };
return { pack: 10, len: s.length, hash: fh };
