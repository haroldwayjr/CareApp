const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a02_p3') || '';
const chunk = "MDAwXCIgZD1cIk0xNC4yNSA2YzAgMC41OTY3MyAwLjIzNzIgMS4xNjg4NiAwLjY1OTIgMS41OTA4MiAwLjQyMTkgMC40MjE5NiAwLjk5NDEgMC42NTkxOCAxLjU5MDggMC42NTkxOGg2djEzYzAgMS41MTg4IC0xLjIzMTIgMi43NSAtMi43NSAyLjc1SDQuMjVjLTEuNTE4NzggMCAtMi43NSAtMS4yMzEyIC0yLjc1IC0yLjc1VjIuNzVDMS41IDEuMjMxMjIgMi43MzEyMiAwIDQuMjUgMGgxMHptLTIuMjUyIDMuNzgzMmMtMC41NTIgMC4wMDAxNiAtMC45OTk4IDAuNDQ3OSAtMSAxdjUuMjcxNUg5LjA0MTAyYy0wLjMwMzE5IDAuMDAwMSAtMC41NzcyOCAwLjE4MjggLTAuNjkzMzYgMC40NjI5IC0wLjExNTk5IDAuMjgwMSAtMC4wNTExNyAwLjYwMjkgMC4xNjMwOCAw";
store.setSharedPluginData('careapp', 'a02_p3', prev + chunk);
return { key: 'a02_p3', piece: 1, totalLen: (prev+chunk).length, id: store.id };
