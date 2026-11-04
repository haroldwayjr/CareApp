const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "aHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIm0xOS40MSAyMyAtMS4yIC00YTEgMSAwIDAgMCAwLjY1IC0wLjkzVjcuNTZhMi41NyAyLjU3IDAgMCAwIC0xLjcxIC0yLjM5IDAuNjQgMC42NCAwIDAgMCAtMC4yNCAwaC0wLjIyYTkuOSA5LjkgMCAwIDEgLTAuNzUgMS40OWgwLjgxYTEuMDYgMS4wNiAwIDAgMSAwLjYxIDAuOTR2NC42SDYuNjdWNy41NmExLjA4IDEuMDggMCAwIDEgMS4xMSAtMWgwLjc2QTkuNTggOS41OCAwIDAgMSA3LjggNWEyLjYgMi42IDAgMCAwIC0yLjYzIDIuNTZ2MTAuNDlBMSAxIDAgMCAwIDYgMTlsLTEuMjMgNGEwLjc0IDAuNzQgMCAwIDAgMC41IDAuOTMgMC43OCAwLjc4IDAgMCAw";
t.characters = t.characters + add;
return { part: 16, addLen: add.length, len: t.characters.length, expect: 8500 };
