const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a01_p2') || '';
const chunk = "bnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlVwbG9hZC1NZW51LS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFVwbG9hZCBNZW51IFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0xNi40MiAxNi4zOGExIDEgMCAwIDAgLTAuMjEgLTEuMDlsLTMuNSAtMy41YTEgMSAwIDAgMCAtMS40MiAwbC0zLjUgMy41YTEgMSAwIDAgMCAtMC4yMSAxLjA5IDEgMSAwIDAgMCAwLjkyIDAuNjJoMS43NWEwLjI1IDAuMjUgMCAwIDEgMC4yNSAwLjI1djUuMjVhMS41IDEuNSAwIDAgMCAzIDB2LTUuMjVhMC4y";
store.setSharedPluginData('careapp', 'a01_p2', prev + chunk);
return { key: 'a01_p2', piece: 1, totalLen: (prev+chunk).length, id: store.id };
