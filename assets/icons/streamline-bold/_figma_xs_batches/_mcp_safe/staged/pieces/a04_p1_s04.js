const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a04_p1';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "MSAzLjVhMSAxIDAgMCAwIDAgLTEuNDEgMSAxIDAgMCAwIC0xLjQxIDBsLTAuNzEgMC43YTEgMSAwIDAgMCAwIDEuNDIgMSAxIDAgMCAwIDEuNDIgMFpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xOC41IDguNWExIDEgMCAwIDAgMCAtMmgtMWExIDEgMCAwIDAgMCAyWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTguNzEgMi43OSA4IDIuMDlhMSAxIDAgMCAwIC0xLjQxIDAgMSAxIDAgMCAwIDAgMS40MWwwLjcgMC43MWExIDEgMCAwIDAgMS40MiAwIDEgMSAwIDAgMCAwIC0xLjQyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNi41IDYuNWgtMWExIDEgMCAwIDAgMCAyaDFhMSAxIDAgMCAwIDAgLTJcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMSAxNC4yNWgyYTAuNzUgMC43NSAwIDAgMCAwIC0xLjVoLTJhMC43NSAwLjc1IDAgMCAwIDAgMS41XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Ut";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
