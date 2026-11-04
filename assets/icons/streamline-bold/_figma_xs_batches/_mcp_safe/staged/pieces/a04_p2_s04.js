const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a04_p2';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "IGlkPVwiQ29tbW9uLUZpbGUtVGV4dC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBDb21tb24gRmlsZSBUZXh0IFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPHBhdGggZmlsbD1cIiMwMDAwMDBcIiBkPVwiTTE0LjI1IDZjMCAwLjU5NjczIDAuMjM3MiAxLjE2ODg2IDAuNjU5MiAxLjU5MDgyIDAuNDIxOSAwLjQyMTk2IDAuOTk0MSAwLjY1OTE4IDEuNTkwOCAwLjY1OTE4aDZ2MTNjMCAxLjUxODggLTEuMjMxMiAyLjc1IC0yLjc1IDIuNzVINC4yNWMtMS41MTg3OCAwIC0yLjc1IC0xLjIzMTIgLTIuNzUgLTIuNzVWMi43NUMxLjUgMS4yMzEyMiAyLjczMTIyIDAgNC4yNSAwaDEwek02LjUwMDk4IDE4Ljc1Yy0wLjQxNDIyIDAgLTAuNzUgMC4zMzU4IC0wLjc1IDAuNzUgMCAwLjQxNDEgMC4zMzUwMyAwLjc0OTcgMC43NDkwMiAwLjc1aDEwLjk5OWMwLjQxNDIgMCAwLjc1MSAtMC4zMzU4IDAuNzUxIC0wLjc1IDAgLTAuNDE0IC0wLjMzNjEgLTAuNzQ5NyAtMC43NSAtMC43NXptMCAtNGMtMC40MTQyMiAwIC0wLjc1IDAuMzM1OCAtMC43NSAwLjc1IDAgMC40MTQxIDAuMzM1MDMgMC43";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
