const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjUgMC40N2gxLjM5YTAuNDkgMC40OSAwIDAgMCAwLjM5IC0wLjE5IDAuNSAwLjUgMCAwIDAgMC4wOSAtMC40NCA1LjU0IDUuNTQgMCAwIDAgLTIgLTMgMC41IDAuNSAwIDAgMCAtMC41OCAwIDAuNDggMC40OCAwIDAgMCAtMC4yMSAwLjUzQTE2LjUyIDE2LjUyIDAgMCAxIDE0LjcgMTNcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMS4zOSA4LjgxYTkuNzcgOS43NyAwIDAgMCAtMS4xIDQuMTkgMC40OCAwLjQ4IDAgMCAwIDAuMTMgMC4zOCAwLjUxIDAuNTEgMCAwIDAgMC4zNyAwLjE2aDEuOTJhMC41MSAwLjUxIDAgMCAwIDAuMzcgLTAuMTYgMC40OCAwLjQ4IDAgMCAwIDAuMTMgLTAuMzggOS43";
t.characters = t.characters + add;
return { part: 25, addLen: add.length, len: t.characters.length, expect: 13000 };
