const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a05_p6') || '';
const chunk = "NTYzNSAtMC4zMTc0IDAuNzY2NiAtMC4yMDMxIDAuMjAzIC0wLjQ3ODUgMC4zMTczIC0wLjc2NTYgMC4zMTc0aC0yLjI1djIuMjVjLTAuMDAwMSAwLjI4NzEgLTAuMTE0NCAwLjU2MjYgLTAuMzE3NCAwLjc2NTYgLTAuMjAzMiAwLjIwMzIgLTAuNDc5MyAwLjMxNzQgLTAuNzY2NiAwLjMxNzRoLTEuNjY2Yy0wLjI4NzMgMCAtMC41NjM0IC0wLjExNDIgLTAuNzY2NiAtMC4zMTc0IC0wLjIwMyAtMC4yMDMgLTAuMzE3MyAtMC40Nzg1IC0wLjMxNzQgLTAuNzY1NnYtMi4yNUg3LjgzMzAxYy0wLjI4NzEzIC0wLjAwMDEgLTAuNTYyNTYgLTAuMTE0NCAtMC43NjU2MyAtMC4zMTc0IC0wLjIwMzE2IC0wLjIwMzEgLTAuMzE3MzggLTAuNDc5MiAtMC4zMTczOCAtMC43NjY2";
store.setSharedPluginData('careapp', 'a05_p6', prev + chunk);
return { key: 'a05_p6', piece: 1, totalLen: (prev+chunk).length, id: store.id };
