const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a02_p2';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0yMi41IDE0aC03YTAuNDggMC40OCAwIDAgMSAtMC40IC0wLjJsLTAuOSAtMS4yQTEuNDkgMS40OSAwIDAgMCAxMyAxMmgtMi41QTEuNSAxLjUgMCAwIDAgOSAxMy41djlhMS41IDEuNSAwIDAgMCAxLjUgMS41aDEyYTEuNSAxLjUgMCAwIDAgMS41IC0xLjV2LTdhMS41IDEuNSAwIDAgMCAtMS41IC0xLjVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk01LjM1IDE3LjE1YTAuNDggMC40OCAwIDAgMCAtMC41NCAtMC4xNSAwLjUgMC41IDAgMCAwIC0wLjMxIDAuNDZ2MWEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgMC4yNUgyLjVhMC43NiAwLjc2IDAgMCAxIC0wLjc1IC0wLjcxdi0xLjVhMC43NiAwLjc2IDAgMCAwIC0wLjc1IC0wLjc1IDAuNzYgMC43NiAwIDAgMCAtMC43NSAwLjc1VjE4YTIuMjUgMi4yNSAwIDAgMCAyLjI1IDIuMjVoMS43NWEwLjI1IDAuMjUgMCAwIDEgMC4yNSAwLjI1djFhMC41IDAuNSAwIDAgMCAwLjMxIDAuNDZBMC40MyAwLjQzIDAgMCAwIDUgMjJhMC40NyAwLjQ3IDAgMCAwIDAuMzUgLTAuMTVsMiAtMmEwLjQ4IDAuNDgg";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
