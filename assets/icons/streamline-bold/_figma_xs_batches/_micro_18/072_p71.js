const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCAxIDAuMjUgMC4yNVY3YTEgMSAwIDAgMCAyIDBWNWEyIDIgMCAwIDAgLTIgLTJcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk01IDdhMSAxIDAgMCAwIC0xIDF2Ny41YTEgMSAwIDAgMCAyIDBWOGExIDEgMCAwIDAgLTEgLTFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk04LjUgN2ExIDEgMCAwIDAgLTEgMXY0YTEgMSAwIDAgMCAyIDBWOGExIDEgMCAwIDAgLTEgLTFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMiA3YTEgMSAwIDAgMCAtMSAxdjRhMSAxIDAg";
t.characters = t.characters + add;
return { part: 71, addLen: add.length, len: t.characters.length, expect: 36000 };
