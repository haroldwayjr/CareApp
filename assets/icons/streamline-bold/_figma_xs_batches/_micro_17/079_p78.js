const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjI4MTggLTAuNTE5IDAuMTg4OSAtMS4wOTI5IC0wLjA3ODYgLTEuMjgxOCAtMC41OTc2bS04LjMyOTI3IC0xLjM0MTFoMS4wMTY5N2wzLjE5MiAtNC44MjU3IC00LjUyMDk4IDEuMjM2NyAtMC45NjI0NSAxLjE3NThjMC42MzE5MyAwLjY1NTkgMS4wODMzOSAxLjQ4NyAxLjI3NDQ2IDIuNDEzMm0tMi41NTYzNyAtMC44NDcyYzAuMjA1MTggMC4yNTEgMC4zNjk0IDAuNTM2OCAwLjQ4MjQ1IDAuODQ3Mkg2LjUyNDQ1em0tMS43NDM5IC0xLjAyNyAtMS4xNTMwNSAxLjQwODZjLTAuMzQ2NzYgMC4zOTk0IC0wLjQ5Mjk1IDAuOTc0MiAtMC4yOTg5MiAxLjUxMTggMC4yMjE4NiAwLjYxNDggMC43OTg1OSAwLjk1MzggMS40MjU2OSAwLjk1MzhoMi4yNTE5Yy0wLjQwODUg";
t.characters = t.characters + add;
return { part: 78, addLen: add.length, len: t.characters.length, expect: 39500 };
