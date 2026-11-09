const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "PlxuICAgIDxwYXRoIGQ9XCJNNi40NSA5LjY5YTAuMjUgMC4yNSAwIDAgMCAtMC4zOCAwbC0zLjIgNC40OWEwLjUxIDAuNTEgMCAwIDAgMCAwLjUyIDAuNTIgMC41MiAwIDAgMCAwLjQ1IDAuMjdoNy4zN2wtMS45IDguNDJhMC41IDAuNSAwIDAgMCAwLjI4IDAuNTYgMC41NCAwLjU0IDAgMCAwIDAuMjEgMC4wNSAwLjUgMC41IDAgMCAwIDAuNCAtMC4yMWw0LjQxIC02LjE3YTAuMjQgMC4yNCAwIDAgMCAwIC0wLjMyWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvaGlzdG9yeSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIw";
t.characters = t.characters + add;
return { part: 56, addLen: add.length, len: t.characters.length, expect: 28500 };
