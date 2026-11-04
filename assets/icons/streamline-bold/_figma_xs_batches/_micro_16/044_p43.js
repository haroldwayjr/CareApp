const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MS40NDkyIDAuMjMyMiAwLjIzMjMgMC41MDMgMC40MTU5IDAuNzk1OSAwLjU1MDhIMi41QzEuMTE5MjkgMjIgMCAyMC44ODA3IDAgMTkuNVY0YzEuMjg5ZS03IC0xLjM4MDcxIDEuMTE5MjkgLTIuNSAyLjUgLTIuNWgyem03LjE4NjUgMS44MDc2MmMwLjI4OTMgMC4wMzc3OSAwLjU1MjcgMC4xODM1OSAwLjc0MDMgMC40MDYyNWwwLjQyNDggMC40MjM4M2MwLjUwMzEgMC40Mzg0MyAwLjg1NjUgMS4wMjM5OCAxLjAwOTcgMS42NzM4MiAwLjE1NDYgMC42NTU3MyAwLjA5NzIgMS4zNDM0NiAtMC4xNjMxIDEuOTY0ODUgLTAuMDA0NSAwLjAxMDg4IC0wLjAwOTUgMC4wMjIxIC0wLjAxNTYgMC4wMzIyMiAtMS40MDgzIDIuMzQ4NTEgLTMuMzc0MiA0LjMxNDMxIC01Ljcy";
t.characters = t.characters + add;
return { part: 43, addLen: add.length, len: t.characters.length, expect: 22000 };
