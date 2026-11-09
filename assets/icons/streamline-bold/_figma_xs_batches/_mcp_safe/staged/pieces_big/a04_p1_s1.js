const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a04_p1') || '';
const chunk = "MVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTguNzEgMi43OSA4IDIuMDlhMSAxIDAgMCAwIC0xLjQxIDAgMSAxIDAgMCAwIDAgMS40MWwwLjcgMC43MWExIDEgMCAwIDAgMS40MiAwIDEgMSAwIDAgMCAwIC0xLjQyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNi41IDYuNWgtMWExIDEgMCAwIDAgMCAyaDFhMSAxIDAgMCAwIDAgLTJcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMSAxNC4yNWgyYTAuNzUgMC43NSAwIDAgMCAwIC0xLjVoLTJhMC43NSAwLjc1IDAgMCAwIDAgMS41XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Ut";
store.setSharedPluginData('careapp', 'a04_p1', prev + chunk);
return { key: 'a04_p1', piece: 1, totalLen: (prev+chunk).length, id: store.id };
