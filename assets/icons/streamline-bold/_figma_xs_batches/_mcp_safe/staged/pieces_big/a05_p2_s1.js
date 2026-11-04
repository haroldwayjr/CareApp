const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a05_p2') || '';
const chunk = "MDMgMi4yNDQwMSAtMS4wNzAyIDQuMzc3ODQgLTIuNDc0MSA2LjE0MDQ0IC0wLjA2NTggMC4xMDA1IC0wLjEwNTEgMC4yMTYyIC0wLjExNDIgMC4zMzYyIC0wLjAwOTYgMC4xMjY5IDAuMDE0OSAwLjI1NCAwLjA3MSAwLjM2ODEgMC4wMDUgMC4wMTAxIDAuMDA5NyAwLjAyMDMgMC4wMTQyIDAuMDMwNiAwLjcxNzUgMS42NDI0IDEuMDgzOSAzLjQxNjYgMS4wNzU3IDUuMjA4OXYxLjc5MTNjMCAwLjY3MzEgLTAuMjY3NCAxLjMxODYgLTAuNzQzMyAxLjc5NDVzLTEuMTIxNCAwLjc0MzMgLTEuNzk0NSAwLjc0MzMgLTEuMzE4NiAtMC4yNjc0IC0xLjc5NDUgLTAuNzQzM2MtMC40NzYgLTAuNDc1OSAtMC43NDM0IC0xLjEyMTQgLTAuNzQzNCAtMS43OTQ1IDAgLTAuMDE5";
store.setSharedPluginData('careapp', 'a05_p2', prev + chunk);
return { key: 'a05_p2', piece: 1, totalLen: (prev+chunk).length, id: store.id };
