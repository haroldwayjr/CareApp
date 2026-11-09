const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MEExLjUgMS41IDAgMCAwIDIgNy43NXY5YTEuNSAxLjUgMCAwIDAgMS41IDEuNWgxMC44OGEwLjI1IDAuMjUgMCAwIDAgMC4yMyAtMC4xNSAwLjI2IDAuMjYgMCAwIDAgMCAtMC4yOFpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIm0yMS43NCA3LjQ1IC0zIDEuNzFhMS40NCAxLjQ0IDAgMCAwIC0wLjc0IDEuMjV2My42OGExLjQ0IDEuNDQgMCAwIDAgMC43NCAxLjI1bDMgMS43MUExLjUgMS41IDAgMCAwIDI0IDE1LjhWOC43YTEuNSAxLjUgMCAwIDAgLTIuMjYgLTEuMjVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNy4wNyAxNS42";
t.characters = t.characters + add;
return { part: 36, addLen: add.length, len: t.characters.length, expect: 18500 };
