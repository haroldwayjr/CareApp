const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
return { probe: true, page: page && page.name, sets: page.findAll(n => n.type === 'COMPONENT_SET').length };
