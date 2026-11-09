const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a02_p1') || '';
const chunk = "b3g9XCIwIDAgMjQgMjRcIiBpZD1cIlNlbGVjdC0zZC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBTZWxlY3QgM2QgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBmaWxsPVwiIzAwMDAwMFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyLjk1MiA0Ljg5NWExIDEgMCAxIDEgLTIgMFYyLjQzMWwtMS44NTMgMC44OTJhMSAxIDAgMSAxIC0wLjg2OCAtMS44MDJMMTAuNTY2IDAuMzk3YzAuMDM5IC0wLjAxOCAwLjA3OCAtMC4wMzQgMC4xMTggLTAuMDQ4YTQuMTA0IDQuMTA0IDAgMCAxIDEuMjY1IC0wLjIyNGwwLjAwMyAwYTQuMSA0LjEgMCAwIDEgMS4yNjcgMC4yMjRj";
store.setSharedPluginData('careapp', 'a02_p1', prev + chunk);
return { key: 'a02_p1', piece: 1, totalLen: (prev+chunk).length, id: store.id };
