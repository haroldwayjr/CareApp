const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a04_p0') || '';
const chunk = "IDAgMCAwLjM3IC0wLjQ5YzAgLTMuODEgLTEuMDcgLTYuNzYgLTMuMTggLTguNzZcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIm0yLjI5IDExLjUgNyAtNS43M0ExIDEgMCAwIDAgOCA0LjIzTDAuNTUgMTAuMzRhMS41IDEuNSAwIDAgMCAwIDIuMzJsNy4yNSA2YTEgMSAwIDEgMCAxLjI3IC0xLjU0WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL2NvbW1zL2NoYXQiLCAibmFtZSI6ICJjaGF0IiwgImNhdGVnb3J5IjogImNvbW1zIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5v";
store.setSharedPluginData('careapp', 'a04_p0', prev + chunk);
return { key: 'a04_p0', piece: 1, totalLen: (prev+chunk).length, id: store.id };
