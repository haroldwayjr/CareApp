
const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const collections = await figma.variables.getLocalVariableCollectionsAsync();
let iconDefault = null;
for (const coll of collections) {
  for (const id of coll.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v && v.name === 'icon/default') iconDefault = v;
  }
}
const sets = page.findAll(n => n.type === 'COMPONENT_SET' && n.name.startsWith('icon/'));
let fixed = 0, vectors = 0, setsTouched = 0;
for (const set of sets) {
  let touched = false;
  for (const size of ['sm','md','lg']) {
    const variant = set.children.find(c => c.name === 'Size=' + size);
    if (!variant) continue;
    (function walk(n){
      if (n.type === 'VECTOR' || n.type === 'ELLIPSE' || n.type === 'LINE' || n.type === 'BOOLEAN_OPERATION') {
        const hasStroke = Array.isArray(n.strokes) && n.strokes.some(s => s.visible !== false);
        if (!hasStroke) return;
        vectors++;
        let changed = false;
        if (n.strokeJoin !== 'ROUND') { n.strokeJoin = 'ROUND'; changed = true; }
        if (n.strokeCap !== 'ROUND' && n.strokeCap !== 'NONE') { n.strokeCap = 'ROUND'; changed = true; }
        // normalize weight to 1.5 when close to 1 or already outline weight
        if (typeof n.strokeWeight === 'number' && (Math.abs(n.strokeWeight - 1) < 0.05 || Math.abs(n.strokeWeight - 1.5) < 0.05 || n.strokeWeight < 2)) {
          if (Math.abs(n.strokeWeight - 1.5) > 0.01) { n.strokeWeight = 1.5; changed = true; }
        }
        if (changed) fixed++;
        // ensure color binding preserved/set
        try {
          const paint = (Array.isArray(n.strokes) && n.strokes[0]) || { type:'SOLID', color:{r:0,g:0,b:0} };
          n.strokes = [figma.variables.setBoundVariableForPaint(
            { type:'SOLID', color: paint.color || {r:0,g:0,b:0}, opacity: paint.opacity == null ? 1 : paint.opacity },
            'color', iconDefault)];
        } catch(_){}
        touched = true;
      }
      if ('children' in n) for (const c of n.children) walk(c);
    })(variant);
  }
  if (touched) setsTouched++;
}
return { sets: sets.length, setsTouched, vectors, fixed };
