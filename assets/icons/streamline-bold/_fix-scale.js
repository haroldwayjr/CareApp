
const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const varByName = {};
for (const coll of collections) {
  for (const id of coll.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    varByName[v.name] = v;
  }
}
const iconDefault = varByName['icon/default'];
if (!iconDefault) throw new Error('missing icon/default');

function bindColor(node, field) {
  const paint = figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
  if (field === 'fills') node.fills = [paint];
  else node.strokes = [paint];
}

function fixNodeTree(root, { setStroke15 }) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) {
      n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    }
    if (n.type === 'FRAME' || n.type === 'GROUP' || n.type === 'COMPONENT') {
      // keep outer component unclipped so strokes aren't cut at 24; children scale
      if (n.type === 'FRAME' && n !== root) n.clipsContent = false;
    }
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'LINE') {
      const hasStroke = Array.isArray(n.strokes) && n.strokes.length > 0;
      const fills = Array.isArray(n.fills) ? n.fills : [];
      const hasFill = fills.some(f => f.type === 'SOLID' && f.visible !== false);
      if (hasStroke) {
        bindColor(n, 'strokes');
        if (setStroke15) n.strokeWeight = 1.5;
      }
      if (hasFill && !hasStroke) bindColor(n, 'fills');
      if (hasFill && hasStroke) {
        // stroke icon — clear fills
        n.fills = [];
        bindColor(n, 'strokes');
        if (setStroke15) n.strokeWeight = 1.5;
      }
    }
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
  if ('clipsContent' in root) root.clipsContent = false;
}

// Fix Stage B Core 500
const core = await figma.getNodeByIdAsync('49:2');
let fixedCore = 0;
function walkCore(n) {
  if (n.type === 'COMPONENT') {
    fixNodeTree(n, { setStroke15: true });
    // direct children scale
    if ('children' in n) {
      for (const c of n.children) {
        if ('constraints' in c) c.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
      }
    }
    fixedCore++;
  }
  if ('children' in n) for (const c of n.children) walkCore(c);
}
if (core) walkCore(core);

// Fix dual-style pilot sets
const pilot = page.findOne(n => n.name === 'Icons — Dual-style pilot');
const shelf = pilot && pilot.findOne(n => n.name === 'Component shelf (pilot)');
let fixedSets = 0;
if (shelf) {
  for (const set of shelf.children) {
    if (set.type !== 'COMPONENT_SET') continue;
    for (const variant of set.children) {
      const isBold = /Bold/i.test(variant.name);
      fixNodeTree(variant, { setStroke15: !isBold });
      if ('children' in variant) {
        for (const c of variant.children) {
          if ('constraints' in c) c.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
        }
      }
      fixedSets++;
    }
  }
}

return { fixedCore, fixedSets, mutatedNodeIds: [core && core.id, pilot && pilot.id].filter(Boolean) };
