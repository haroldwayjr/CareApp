const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Mkg0LjVhMC40OCAwLjQ4IDAgMCAxIC0wLjQxIC0wLjIyIDAuNDUgMC40NSAwIDAgMSAwIC0wLjQ2bDIgLTVhMC40OCAwLjQ4IDAgMCAxIDAuNDYgLTAuMzJoMTFhMC40OCAwLjQ4IDAgMCAxIDAuNDYgMC4zMmwyIDVhMC40NSAwLjQ1IDAgMCAxIC0wLjEgMC40NlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0yMC4wOSA4LjI1YTAuMjQgMC4yNCAwIDAgMCAwLjI0IC0wLjJMMjIgMC42MWEwLjQ5IDAuNDkgMCAwIDAgLTAuMSAtMC40MiAwLjUxIDAuNTEgMCAwIDAgLTAuNCAtMC4xOWgtMTlhMC41MSAwLjUxIDAgMCAwIC0wLjM5IDAuMTkgMC40OSAwLjQ5IDAgMCAwIC0wLjExIDAuNDJsMS42NyA3";
t.characters = t.characters + add;
return { part: 60, addLen: add.length, len: t.characters.length, expect: 30500 };
