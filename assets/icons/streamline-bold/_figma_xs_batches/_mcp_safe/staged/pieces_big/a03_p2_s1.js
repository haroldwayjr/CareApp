const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a03_p2') || '';
const chunk = "MS43NSAtMC43ODM1IC0xLjc1IC0xLjc1di00LjVjMCAtMC45NjY1IDAuNzgzNSAtMS43NSAxLjc1IC0xLjc1TTEyIDE4YzAuNTUyMyAwIDEgMC40NDc3IDEgMXMtMC40NDc3IDEgLTEgMUgyYy0wLjU1MjI4IDAgLTEgLTAuNDQ3NyAtMSAtMXMwLjQ0NzcyIC0xIDEgLTF6bTEwIDBjMC41NTIzIDAgMSAwLjQ0NzcgMSAxcy0wLjQ0NzcgMSAtMSAxaC0xLjVjLTAuNTUyMyAwIC0xIC0wLjQ0NzcgLTEgLTFzMC40NDc3IC0xIDEgLTF6TTEyIDFjMy43Mjc5IDAgNi43NSAzLjAyMjA4IDYuNzUgNi43NSAwIDMuNzI3OSAtMy4wMjIxIDYuNzUgLTYuNzUgNi43NSAtMy43Mjc5MiAwIC02Ljc1IC0zLjAyMjEgLTYuNzUgLTYuNzVDNS4yNSA0LjAyMjA4IDguMjcyMDggMSAx";
store.setSharedPluginData('careapp', 'a03_p2', prev + chunk);
return { key: 'a03_p2', piece: 1, totalLen: (prev+chunk).length, id: store.id };
