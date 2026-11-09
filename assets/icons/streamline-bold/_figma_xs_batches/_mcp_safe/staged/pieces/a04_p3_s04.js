const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a04_p3';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "biAgPGc+XG4gICAgPHBhdGggZD1cIk0xOC44OCA2LjQ1QTMgMyAwIDAgMSAxOC41IDVhMC4xNCAwLjE0IDAgMCAwIC0wLjA2IC0wLjEyIDAuMTYgMC4xNiAwIDAgMCAtMC4xMyAwbC01IDEuNGEwLjI1IDAuMjUgMCAwIDAgLTAuMTYgMC4xNCAwLjI0IDAuMjQgMCAwIDAgMCAwLjIyQTMgMyAwIDAgMSAxMy41IDhhMC4yMSAwLjIxIDAgMCAwIDAuMDggMC4xNyAwLjE5IDAuMTkgMCAwIDAgMC4xOCAwbDUgLTEuMzlhMC4yNCAwLjI0IDAgMCAwIDAuMTcgLTAuMTQgMC4yOCAwLjI4IDAgMCAwIC0wLjA1IC0wLjE5XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTguODIgMTZhMC4yOSAwLjI5IDAgMCAwIC0wLjE3IC0wLjE0bC00Ljg0IC0xLjEzYTAuMjggMC4yOCAwIDAgMCAtMC4yMiAwLjA1IDAuMjUgMC4yNSAwIDAgMCAtMC4wOSAwLjJWMTVhMi45NCAyLjk0IDAgMCAxIC0wLjI5IDEuMjkgMC4yNiAwLjI2IDAgMCAwIDAgMC4yMSAwLjI2IDAuMjYgMCAwIDAgMC4xNyAwLjE0bDQuODEgMS4xMmEwLjI4IDAuMjggMCAwIDAgMC4yMiAtMC4wNSAwLjI1IDAuMjUgMCAwIDAgMC4wOSAtMC4yIDMgMyAw";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
