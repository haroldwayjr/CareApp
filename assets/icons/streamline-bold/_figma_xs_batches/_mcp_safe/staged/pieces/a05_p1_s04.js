const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a05_p1';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "MC4yOTI5IDAuMTg3NSAtMC4xODc1IDAuMjkyOSAtMC40NDE5IDAuMjkzIC0wLjcwNzEgMCAtMC4xOTc3IC0wLjA1ODIgLTAuMzkxMiAtMC4xNjggLTAuNTU1NiAtMC4xMDk5IC0wLjE2NDUgLTAuMjY2NSAtMC4yOTI1IC0wLjQ0OTIgLTAuMzY4MnMtMC4zODQyIC0wLjA5NjIgLTAuNTc4MSAtMC4wNTc2bTAuMTk1MyAtNS4wMTg2Yy0wLjE5ODggMC4wMDAxIC0wLjM4OTcgMC4wNzkyIC0wLjUzMDMgMC4yMTk4IC0wLjE0MDUgMC4xNDA2IC0wLjIxOTcgMC4zMzE0IC0wLjIxOTcgMC41MzAydjIuNWMwIDAuMTk4OSAwLjA3OTEgMC4zODk3IDAuMjE5NyAwLjUzMDNzMC4zMzE1IDAuMjE5NyAwLjUzMDMgMC4yMTk3IDAuMzg5NiAtMC4wNzkyIDAuNTMwMyAtMC4yMTk3YzAuMTQwNiAtMC4xNDA2IDAuMjE5NiAtMC4zMzE0IDAuMjE5NyAtMC41MzAzdi0yLjVjMCAtMC4xOTg5IC0wLjA3OTEgLTAuMzg5NiAtMC4yMTk3IC0wLjUzMDIgLTAuMTQwNyAtMC4xNDA3IC0wLjMzMTQgLTAuMjE5OCAtMC41MzAzIC0wLjIxOThNMC40MjQ2ODMgNy4zODg5MkMtMS42NjAwOCAyLjY4NzE1IDQuMzMwOTkgLTMuNjkxODggOS45NTU5MyAyLjY4NTc5IDE2LjI0MzcgLTQuNDQzMzcg";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
