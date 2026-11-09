
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
function bindStrokes(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'LINE') {
      const hasStroke = Array.isArray(n.strokes) && n.strokes.length > 0;
      const hasFill = Array.isArray(n.fills) && n.fills.some(f => f.type === 'SOLID' && f.visible !== false);
      if (hasStroke || (!hasFill && n.type === 'VECTOR')) {
        n.fills = [];
        n.strokes = [figma.variables.setBoundVariableForPaint(
          { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault)];
        n.strokeWeight = 1.5;
        n.strokeJoin = 'ROUND';
        n.strokeCap = 'ROUND';
        try { n.strokeAlign = 'CENTER'; } catch (_) {}
      }
      if (hasFill && !hasStroke) {
        n.fills = [figma.variables.setBoundVariableForPaint(
          { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault)];
      }
    }
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
const SIZE_PX = { sm: 20, md: 24, lg: 32 };
function reimportRegular(set, svg) {
  const results = {};
  for (const [size, px] of Object.entries(SIZE_PX)) {
    const variant = set.children.find(c => c.name === 'Size=' + size);
    if (!variant) continue;
    variant.visible = true;
    for (const c of [...variant.children]) c.remove();
    const node = figma.createNodeFromSvg(svg);
    node.name = set.name.split('/').pop();
    node.resize(px, px);
    node.x = 0; node.y = 0;
    node.clipsContent = false;
    if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    variant.appendChild(node);
    try { variant.resizeWithoutConstraints(px, px); } catch (_) { try { variant.resize(px, px); } catch(__){} }
    bindStrokes(node);
    variant.clipsContent = false;
    results[size] = node.findAll(n => n.type==='VECTOR' || n.type==='ELLIPSE' || n.type==='LINE' || n.type==='BOOLEAN_OPERATION').length;
  }
  for (const c of set.children) c.visible = (c.name === 'Size=md');
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return results;
}

const SVGS = {"icon/health/mental.wellness": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Mindfulness-2--Streamline-Ultimate\">\n  <desc>\n    Mindfulness 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.67536 23.25v-6.265c-1.38177 -1.2801 -2.34542 -2.9471 -2.76512 -4.7833 -0.41969 -1.8362 -0.27593 -3.75636 0.41253 -5.50962 0.68845 -1.75326 1.88959 -3.25818 3.44657 -4.31823C7.32632 1.3138 9.16677 0.747884 11.0504 0.750006c7.139 0 8.68 5.878004 11.225 12.479994 0.0436 0.1137 0.0589 0.2362 0.0446 0.3571 -0.0143 0.1209 -0.0577 0.2365 -0.1266 0.3369 -0.0689 0.1003 -0.1611 0.1824 -0.2688 0.2392 -0.1077 0.0568 -0.2275 0.0866 -0.3492 0.0868h-1.9v3c0 0.7957 -0.3161 1.5587 -0.8787 2.1213 -0.5626 0.5626 -1.3257 0.8787 -2.1213 0.8787h-1.5v3\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16.4561 11.5651s-2.6232 3.279 -5.2463 3.279c-2.62323 0 -5.24642 -3.279 -5.24642 -3.279s2.62319 -3.27897 5.24642 -3.27897c2.6231 0 5.2463 3.27897 5.2463 3.27897Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.2094 11.9854c-0.2322 0 -0.4203 -0.1882 -0.4203 -0.4203s0.1881 -0.4203 0.4203 -0.4203\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.2096 11.9854c0.2321 0 0.4203 -0.1882 0.4203 -0.4203s-0.1882 -0.4203 -0.4203 -0.4203\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" d=\"M7.18555 6.99561 6.3335 5.85962\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" d=\"m15.3765 6.99561 0.852 -1.13599\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" d=\"m11.2095 5.85962 0 -1.408\" stroke-width=\"1\"></path>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
