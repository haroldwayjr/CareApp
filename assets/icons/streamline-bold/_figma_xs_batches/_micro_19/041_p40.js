const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IDxwYXRoIGQ9XCJNMy42NiA0LjVhMC41IDAuNSAwIDAgMCAtMC40OCAwLjM2QTQuMTIgNC4xMiAwIDAgMCAzIDZhMyAzIDAgMCAwIDUuNzYgMS4xNyAwLjI2IDAuMjYgMCAwIDEgMC40OCAwIDMgMyAwIDAgMCA1LjUyIDAgMC4yNiAwLjI2IDAgMCAxIDAuNDggMEEzIDMgMCAwIDAgMjEgNmE0LjEyIDQuMTIgMCAwIDAgLTAuMTggLTEuMTQgMC41IDAuNSAwIDAgMCAtMC40OCAtMC4zNlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0zLjUgMGgxN3MxIDAgMSAxdjFzMCAxIC0xIDFoLTE3cy0xIDAgLTEgLTFWMXMwIC0xIDEgLTFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48";
t.characters = t.characters + add;
return { part: 40, addLen: add.length, len: t.characters.length, expect: 20500 };
