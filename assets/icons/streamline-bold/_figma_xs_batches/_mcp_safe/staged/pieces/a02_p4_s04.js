const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a02_p4';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "MC40OCAwbDEuNjEgNC41OWExIDEgMCAwIDAgMC45NCAwLjY3aDQuNDdhMC4yNiAwLjI2IDAgMCAxIDAuMjQgMC4xNyAwLjI1IDAuMjUgMCAwIDEgLTAuMDggMC4yN1pcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0yMi45MSAzaC0yVjFhMSAxIDAgMCAwIC0yIDB2MmgtMmExIDEgMCAwIDAgMCAyaDJ2MmExIDEgMCAwIDAgMiAwVjVoMmExIDEgMCAwIDAgMCAtMlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL2FjdGlvbnMvc2VuZC5hbHQiLCAibmFtZSI6ICJzZW5kLWFsdCIsICJjYXRlZ29yeSI6ICJhY3Rpb25zIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJTZW5kLUVtYWlsLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFNlbmQgRW1haWwgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBkPVwiTTIzLjgyIDEu";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
