const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJCcmllZmNhc2UtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQnJpZWZjYXNlIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPHBhdGggZD1cIk0zIDIyLjVoMThhMyAzIDAgMCAwIDMgLTN2LTExYTMgMyAwIDAgMCAtMyAtM2gtMy45YTAuMjQgMC4yNCAwIDAgMSAtMC4yNCAtMC4yMmwtMC4xNSAtMS4xNWEzIDMgMCAwIDAgLTMgLTIuNjNoLTMuNDRhMyAzIDAgMCAwIC0zIDIuNjNsLTAuMTMgMS4xNWEwLjI0IDAuMjQgMCAwIDEgLTAuMjQgMC4yMkgzYTMgMyAwIDAgMCAtMyAzdjExYTMgMyAwIDAgMCAzIDNNOS4yNyA0";
t.characters = t.characters + add;
return { part: 25, addLen: add.length, len: t.characters.length, expect: 13000 };
