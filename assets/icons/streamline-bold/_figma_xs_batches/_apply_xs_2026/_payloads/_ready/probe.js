const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
return { page: page.name, sets: page.findAllWithCriteria({types:['COMPONENT_SET']}).length };
