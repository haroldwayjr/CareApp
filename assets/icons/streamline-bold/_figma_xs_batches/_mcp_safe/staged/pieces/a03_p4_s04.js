const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a03_p4';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "OTYyOSAtNC4zMjE5OSAwIC04LjAwMzYzIC0yLjc1MjYgLTkuMzgyNiAtNi42MDM1IC0wLjE4NjE5IC0wLjUyIC0wLjc1ODYzIC0wLjc5MDUgLTEuMjc4NTkgLTAuNjA0MyAtMC41MTk5NTEgMC4xODYyIC0wLjc5MDUxOSAwLjc1ODYgLTAuNjA0MzI5IDEuMjc4NUMyLjM4OTE3IDIwLjY1NDUgNi44MDY5NSAyMy45NjI5IDEyIDIzLjk2MjljNi42MDY5IDAgMTEuOTYyOSAtNS4zNTYgMTEuOTYyOSAtMTEuOTYyOSAwIC00LjQ3NDExIC0yLjQ1NjYgLTguMzczMTUgLTYuMDg5NyAtMTAuNDI0MTZNNi45MjEyNyAzLjQyNjhjMC40NzQ4NyAtMC4yODE5OCAwLjYzMTI0IC0wLjg5NTUzIDAuMzQ5MjYgLTEuMzcwNCAtMC4yODE5OCAtMC40NzQ4OCAtMC44OTU1NCAtMC42MzEyNSAtMS4zNzA0MSAtMC4zNDkyNyAtMS4xNzMxMyAwLjY5NjYxIC0yLjIxNjUzIDEuNTg3NzcgLTMuMDg2MDUgMi42Mjg5MyAtMC4zNTQwMSAwLjQyMzkgLTAuMjk3MzYgMS4wNTQ1MyAwLjEyNjU0IDEuNDA4NTQgMC40MjM5IDAuMzU0MDIgMS4wNTQ1MyAwLjI5NzM3IDEuNDA4NTQgLTAuMTI2NTMgMC43MjUwOCAtMC44NjgyMiAxLjU5NDk4IC0xLjYxMTA0IDIuNTcyMTIgLTIuMTkxMjdNMi42";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
