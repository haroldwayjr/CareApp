const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a03_p0';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "MiAtMC43NjU2IDEuODQ5NyAtMC43NjU2bS04LjQyNTggLTUuMzczMDdjMC4wMDAxIDAuNDE0MSAwLjMzNTggMC43NSAwLjc1IDAuNzVIMTguNzV2My44ODA4N2MtMC4xODgzIDAuMTMzMyAtMC4zNjY5IDAuMjgyIC0wLjUzMjIgMC40NDczbC03LjYzMDkgNy42Mjk4aC0wLjAwMWMtMC4yMDc4IDAuMjA4IC0wLjM2NzEgMC40NjA0IC0wLjQ2NjggMC43MzczbC0wLjAzNjEgMC4xMTE0IC0wLjAxOTUgMC4wNzEzIC0wLjAyMzUgMC4xMDI1TDkuNDYxOTEgMjJIMi4yNWMtMC41OTY3NCAwIC0xLjE2ODg2IC0wLjIzNzIgLTEuNTkwODIgLTAuNjU5MkMwLjIzNzIyMyAyMC45MTg5IDAgMjAuMzQ2NyAwIDE5Ljc1VjIuMjVDMCAxLjY1MzI2IDAuMjM3MjIzIDEuMDgxMTQgMC42NTkxOCAwLjY1OTE4IDEuMDgxMTQgMC4yMzcyMjMgMS42NTMyNiAwIDIuMjUgMGgxMC40NTEyek0zLjcxMjg5IDkuNjk5MjJjLTAuNDE0MjEgMCAtMC43NSAwLjMzNTc4IC0wLjc1IDAuNzQ5OThzMC4zMzU3OSAwLjc1IDAuNzUgMC43NUgxMWMwLjQxNDIgMCAwLjc1IC0wLjMzNTggMC43NSAtMC43NXMtMC4zMzU4IC0wLjc0OTk4IC0wLjc1IC0wLjc0OTk4em0wIC0zLjMzNjkyYy0wLjQxNDIx";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
