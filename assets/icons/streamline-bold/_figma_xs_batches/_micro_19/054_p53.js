const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MiAxIDEgMCAwIDEgMC4zOCAtMC44NGwwLjY1IC0wLjVhNS4wNiA1LjA2IDAgMCAwIDEuOTMgLTMuODIgMSAxIDAgMCAxIDAuMzEgLTAuN0EzLjQ4IDMuNDggMCAwIDAgMjQgMTJhMy40NSAzLjQ1IDAgMCAwIC0wLjcgLTIuMTNcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9zdGF0dXMvc2hpZWxkLm9mZiIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiUmVtb3ZlLVNoaWVsZC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBSZW1vdmUgU2hpZWxk";
t.characters = t.characters + add;
return { part: 53, addLen: add.length, len: t.characters.length, expect: 27000 };
