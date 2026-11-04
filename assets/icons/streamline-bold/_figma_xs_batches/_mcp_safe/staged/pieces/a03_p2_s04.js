const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a03_p2';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "dHJhc3QiLCAiY2F0ZWdvcnkiOiAibWVkaWEiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPlxuICA8cGF0aCBmaWxsPVwiIzAwMDAwMFwiIGQ9XCJNMTYuMjUgMTVjMC45NjY1IDAgMS43NSAwLjc4MzUgMS43NSAxLjc1djQuNWMwIDAuOTY2NSAtMC43ODM1IDEuNzUgLTEuNzUgMS43NXMtMS43NSAtMC43ODM1IC0xLjc1IC0xLjc1di00LjVjMCAtMC45NjY1IDAuNzgzNSAtMS43NSAxLjc1IC0xLjc1TTEyIDE4YzAuNTUyMyAwIDEgMC40NDc3IDEgMXMtMC40NDc3IDEgLTEgMUgyYy0wLjU1MjI4IDAgLTEgLTAuNDQ3NyAtMSAtMXMwLjQ0NzcyIC0xIDEgLTF6bTEwIDBjMC41NTIzIDAgMSAwLjQ0NzcgMSAxcy0wLjQ0NzcgMSAtMSAxaC0xLjVjLTAuNTUyMyAwIC0xIC0wLjQ0NzcgLTEgLTFzMC40NDc3IC0xIDEgLTF6TTEyIDFjMy43Mjc5IDAgNi43NSAzLjAyMjA4IDYuNzUgNi43NSAwIDMuNzI3OSAtMy4wMjIxIDYuNzUgLTYuNzUgNi43NSAtMy43Mjc5MiAwIC02Ljc1IC0zLjAyMjEgLTYuNzUgLTYuNzVDNS4yNSA0LjAyMjA4IDguMjcyMDggMSAx";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
