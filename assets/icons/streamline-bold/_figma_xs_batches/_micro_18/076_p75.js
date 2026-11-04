const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "OTYgMS45NiAwIDEgMCAzLjkyIDAgMS45NiAxLjk2IDAgMSAwIC0zLjkyIDBcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMS4wOCAxMy4yOWExLjIxIDEuMjEgMCAwIDAgMC45MiAwLjQyIDEuMTYgMS4xNiAwIDAgMCAwLjggLTAuMyAxLjIxIDEuMjEgMCAwIDAgMC4xMiAtMS43MkwzLjEzIDAuNDJBMS4yMyAxLjIzIDAgMCAwIDEuMjggMlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL2Nsb3VkLnN1biIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAv";
t.characters = t.characters + add;
return { part: 75, addLen: add.length, len: t.characters.length, expect: 38000 };
