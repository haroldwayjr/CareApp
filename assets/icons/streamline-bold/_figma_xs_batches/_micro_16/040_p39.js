const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "Ljg5IDAuNDkgMC40OSAwIDAgMCAwLjM2IDAuMiAwLjQ3IDAuNDcgMCAwIDAgMC4zNSAtMC4xNWwyLjM0IC0yLjM0IDEuMjEgMWE5IDkgMCAwIDAgMSAxMi44MkwzLjc5IDIyYTEgMSAwIDAgMCAwIDEuNDIgMSAxIDAgMCAwIDEuNDIgMGwyLjcgLTIuN2E4Ljk0IDguOTQgMCAwIDAgOC4xOCAwbDIuNyAyLjdhMSAxIDAgMCAwIDEuNDIgMCAxIDEgMCAwIDAgMCAtMS40MmwtMi40MiAtMi40MWE5IDkgMCAwIDAgMC45NSAtMTIuODJsMS4yMSAtMSAyLjM0IDIuMzNhMC40NyAwLjQ3IDAgMCAwIDAuMzUgMC4xNSAwLjQ5IDAuNDkgMCAwIDAgMC4zNiAtMC4yIDQuODIgNC44MiAwIDAgMCAxIC0yLjg5QTQuOTEgNC45MSAwIDAgMCAxOS4wOSAwLjI1TTE1LjUgMTMuNUgx";
t.characters = t.characters + add;
return { part: 39, addLen: add.length, len: t.characters.length, expect: 20000 };
