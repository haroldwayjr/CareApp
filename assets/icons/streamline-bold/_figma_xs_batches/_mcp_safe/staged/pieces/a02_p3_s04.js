const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a02_p3';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "dmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJJbXBvcnQtRmlsZS0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBJbXBvcnQgRmlsZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZD1cIk0xNC4yNSA2YzAgMC41OTY3MyAwLjIzNzIgMS4xNjg4NiAwLjY1OTIgMS41OTA4MiAwLjQyMTkgMC40MjE5NiAwLjk5NDEgMC42NTkxOCAxLjU5MDggMC42NTkxOGg2djEzYzAgMS41MTg4IC0xLjIzMTIgMi43NSAtMi43NSAyLjc1SDQuMjVjLTEuNTE4NzggMCAtMi43NSAtMS4yMzEyIC0yLjc1IC0yLjc1VjIuNzVDMS41IDEuMjMxMjIgMi43MzEyMiAwIDQuMjUgMGgxMHptLTIuMjUyIDMuNzgzMmMtMC41NTIgMC4wMDAxNiAtMC45OTk4IDAuNDQ3OSAtMSAxdjUuMjcxNUg5LjA0MTAyYy0wLjMwMzE5IDAuMDAwMSAtMC41NzcyOCAwLjE4MjggLTAuNjkzMzYgMC40NjI5IC0wLjExNTk5IDAuMjgwMSAtMC4wNTExNyAwLjYwMjkgMC4xNjMwOCAw";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
