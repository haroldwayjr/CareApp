const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0yMiA2LjVoLTAuNVY1YTUgNSAwIDAgMCAtMTAgMHYxLjVhMiAyIDAgMCAwIC0yIDJ2NC4wOWEwLjI2IDAuMjYgMCAwIDAgMC4xIDAuMiA3LjE3IDcuMTcgMCAwIDEgMi4xOSAyLjU0IDAuMjQgMC4yNCAwIDAgMCAwLjIyIDAuMTRoNS45MkEzIDMgMCAwIDEgMjEgMTguMjRhMC4yNSAwLjI1IDAgMCAwIDAuMjUgMC4yM0gyMmEyIDIgMCAwIDAgMiAtMnYtOGEyIDIgMCAwIDAgLTIgLTEuOTdNMTMuNSA1YTMgMyAwIDAgMSA2IDB2MS4yNWEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgMC4yNWgtNS41YTAuMjUgMC4yNSAwIDAgMSAtMC4y";
t.characters = t.characters + add;
return { part: 66, addLen: add.length, len: t.characters.length, expect: 33500 };
