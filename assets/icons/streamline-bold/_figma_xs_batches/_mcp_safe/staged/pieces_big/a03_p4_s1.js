const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a03_p4') || '';
const chunk = "MTEuOTYyOSAwIC00LjQ3NDExIC0yLjQ1NjYgLTguMzczMTUgLTYuMDg5NyAtMTAuNDI0MTZNNi45MjEyNyAzLjQyNjhjMC40NzQ4NyAtMC4yODE5OCAwLjYzMTI0IC0wLjg5NTUzIDAuMzQ5MjYgLTEuMzcwNCAtMC4yODE5OCAtMC40NzQ4OCAtMC44OTU1NCAtMC42MzEyNSAtMS4zNzA0MSAtMC4zNDkyNyAtMS4xNzMxMyAwLjY5NjYxIC0yLjIxNjUzIDEuNTg3NzcgLTMuMDg2MDUgMi42Mjg5MyAtMC4zNTQwMSAwLjQyMzkgLTAuMjk3MzYgMS4wNTQ1MyAwLjEyNjU0IDEuNDA4NTQgMC40MjM5IDAuMzU0MDIgMS4wNTQ1MyAwLjI5NzM3IDEuNDA4NTQgLTAuMTI2NTMgMC43MjUwOCAtMC44NjgyMiAxLjU5NDk4IC0xLjYxMTA0IDIuNTcyMTIgLTIuMTkxMjdNMi42";
store.setSharedPluginData('careapp', 'a03_p4', prev + chunk);
return { key: 'a03_p4', piece: 1, totalLen: (prev+chunk).length, id: store.id };
