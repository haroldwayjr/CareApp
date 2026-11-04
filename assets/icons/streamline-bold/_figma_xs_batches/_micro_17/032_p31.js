const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "XCJNNy4yOCAxOS43OGExLjUxIDEuNTEgMCAwIDAgLTEuNSAxLjV2MmEwLjUgMC41IDAgMCAwIDAuNSAwLjVoMTJhMC41IDAuNSAwIDAgMCAwLjUgLTAuNXYtMmExLjUgMS41IDAgMCAwIC0xLjUgLTEuNVpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNi4yOCAxOC4yOGEwLjUgMC41IDAgMCAwIDAuNSAtMC41di0xLjVhMS44NCAxLjg0IDAgMCAwIC0xLjM0IC0xLjcybC0zIC0wLjc2YTAuNTMgMC41MyAwIDAgMCAtMC4yNSAwbC0zIDAuNzZhMS44NCAxLjg0IDAgMCAwIC0xLjM1IDEuNzJ2MS41YTAuNSAwLjUgMCAwIDAgMC41IDAuNVpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1c";
t.characters = t.characters + add;
return { part: 31, addLen: add.length, len: t.characters.length, expect: 16000 };
