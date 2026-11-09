
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

const SVGS = {"icon/files/press": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Force-Touch-Press--Streamline-Ultimate\">\n  <desc>\n    Force Touch Press Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m23.2503 16.73 -2.44 -2.44c-0.5025 -0.5035 -1.1674 -0.8121 -1.8763 -0.8707 -0.7088 -0.0586 -1.4154 0.1366 -1.9937 0.5507l-1.64 1.17 -3.44 -3.43c-0.1386 -0.1403 -0.3037 -0.2517 -0.4856 -0.3277 -0.182 -0.0761 -0.3772 -0.1152 -0.5744 -0.1152s-0.3925 0.0391 -0.5744 0.1152c-0.182 0.076 -0.34705 0.1874 -0.48564 0.3277 -0.27848 0.2825 -0.4346 0.6632 -0.4346 1.06 0 0.3967 0.15612 0.7774 0.4346 1.06l5.00004 5 -1.25 0.42c-0.3782 0.1326 -0.6947 0.3991 -0.8898 0.7492 -0.195 0.3501 -0.2552 0.7595 -0.169 1.1509 0.0861 0.3913 0.3126 0.7376 0.6366 0.9734 0.3241 0.2359 0.7232 0.3448 1.1222 0.3065l3.73 -0.42 1.5042 1.2399\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8.53497 16.1817c-0.54733 -0.3161 -1.01469 -0.7537 -1.366 -1.2792 -0.35131 -0.5254 -0.57717 -1.1245 -0.66014 -1.7511 -0.08296 -0.6266 -0.02082 -1.2639 0.18164 -1.8626 0.20246 -0.5988 0.53981 -1.143 0.98601 -1.59063 0.4462 -0.44765 0.98931 -0.78677 1.5874 -0.99118 0.59809 -0.2044 1.23512 -0.26862 1.86202 -0.18769 0.6268 0.08093 1.2267 0.30484 1.7533 0.65444 0.5265 0.34959 0.9657 0.81553 1.2836 1.36186\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" d=\"M10.5 23.25H3.75c-1.65685 0 -3 -1.3431 -3 -3V3.75c0 -1.65685 1.34315 -3 3 -3h7.5c1.6569 0 3 1.34315 3 3v2.875\" stroke-width=\"1\"></path>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
