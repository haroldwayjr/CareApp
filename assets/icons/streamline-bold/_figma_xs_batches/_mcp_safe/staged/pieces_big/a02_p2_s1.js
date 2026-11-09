const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a02_p2') || '';
const chunk = "cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk01LjM1IDE3LjE1YTAuNDggMC40OCAwIDAgMCAtMC41NCAtMC4xNSAwLjUgMC41IDAgMCAwIC0wLjMxIDAuNDZ2MWEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgMC4yNUgyLjVhMC43NiAwLjc2IDAgMCAxIC0wLjc1IC0wLjcxdi0xLjVhMC43NiAwLjc2IDAgMCAwIC0wLjc1IC0wLjc1IDAuNzYgMC43NiAwIDAgMCAtMC43NSAwLjc1VjE4YTIuMjUgMi4yNSAwIDAgMCAyLjI1IDIuMjVoMS43NWEwLjI1IDAuMjUgMCAwIDEgMC4yNSAwLjI1djFhMC41IDAuNSAwIDAgMCAwLjMxIDAuNDZBMC40MyAwLjQzIDAgMCAwIDUgMjJhMC40NyAwLjQ3IDAgMCAwIDAuMzUgLTAuMTVsMiAtMmEwLjQ4IDAuNDgg";
store.setSharedPluginData('careapp', 'a02_p2', prev + chunk);
return { key: 'a02_p2', piece: 1, totalLen: (prev+chunk).length, id: store.id };
