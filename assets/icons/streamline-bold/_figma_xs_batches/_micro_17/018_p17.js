const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDAuMjIgMCAwLjc0IDAuNzQgMCAwIDAgMC43MSAtMC41M2wwLjIyIC0wLjczaDExLjM0bDAuMjIgMC43M2EwLjc0IDAuNzQgMCAwIDAgMC43MSAwLjUzIDAuNzggMC43OCAwIDAgMCAwLjIyIDAgMC43NCAwLjc0IDAgMCAwIDAuNSAtMC45M20tOC41MiAtOC4xNmgyLjU0YTAuNzUgMC43NSAwIDAgMSAwIDEuNWgtMi41NGEwLjc1IDAuNzUgMCAwIDEgMCAtMS41bS00IDYuMzYgMC41NyAtMS45YTAuODIgMC44MiAwIDAgMCAwIC0wLjI3aDkuMjZhMC44MyAwLjgzIDAgMCAwIDAgMC4yN2wwLjU2IDEuOVpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMi4yNSA4LjgyczMuMzEgLTMuMzEgMy4zMSAt";
t.characters = t.characters + add;
return { part: 17, addLen: add.length, len: t.characters.length, expect: 9000 };
