const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a02_p0') || '';
const chunk = "PiJ9LCB7InNldE5hbWUiOiAiaWNvbi9hY3Rpb25zL3Bhc3RlIiwgIm5hbWUiOiAicGFzdGUiLCAiY2F0ZWdvcnkiOiAiYWN0aW9ucyIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiQ29weS1QYXN0ZS0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBDb3B5IFBhc3RlIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPHBhdGggZD1cIk0xMy40IDQuNzNhMC4yNCAwLjI0IDAgMCAwIDAuMiAwLjI2IDEuMDkgMS4wOSAwIDAgMSAwLjgyIDEuMTF2MS40YTEuMjQgMS4yNCAwIDAgMCAx";
store.setSharedPluginData('careapp', 'a02_p0', prev + chunk);
return { key: 'a02_p0', piece: 1, totalLen: (prev+chunk).length, id: store.id };
