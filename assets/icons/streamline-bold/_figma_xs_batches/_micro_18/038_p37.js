const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "dHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0xNiA1LjU2YTEuMDggMS4wOCAwIDAgMCAtMS41MSAwbC0wLjU2IDAuNTZhMC4zIDAuMyAwIDAgMCAwIDAuNDFMMTUgNy42M2EwLjI4IDAuMjggMCAwIDAgMC40MSAwbDAuNTkgLTAuNTVhMS4wNyAxLjA3IDAgMCAwIDAgLTEuNTJcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0yMS4xOSAwLjA1IDUuMjYgMy40OWEyLjMgMi4zIDAgMCAwIC0xLjc3IDEuNzdMMC4wNSAyMS4xOUEyLjMzIDIuMzMgMCAwIDAgMi44MSAyNGwxNS45MyAtMy40NGEyLjMgMi4zIDAgMCAwIDEuNzcgLTEuNzdMMjQgMi44MUEyLjMzIDIu";
t.characters = t.characters + add;
return { part: 37, addLen: add.length, len: t.characters.length, expect: 19000 };
