
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

const SVGS = {"icon/health/bandage": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Bandage--Streamline-Ultimate\">\n  <desc>\n    Bandage Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8.99297 2.37097 21.726 15.105c0.4421 0.4331 0.7939 0.9495 1.0351 1.5195 0.2412 0.5699 0.3671 1.182 0.3702 1.8009 0.0032 0.6189 -0.1163 1.2323 -0.3517 1.8046 -0.2354 0.5724 -0.5819 1.0925 -1.0195 1.5301 -0.4376 0.4376 -0.9577 0.7841 -1.5301 1.0195 -0.5723 0.2354 -1.1857 0.3549 -1.8046 0.3517 -0.6189 -0.0031 -1.231 -0.129 -1.8009 -0.3702 -0.57 -0.2412 -1.0864 -0.593 -1.5195 -1.0351L2.37097 8.99297C1.49284 8.11484 0.999512 6.92384 0.999512 5.68197c0 -1.24186 0.493328 -2.43287 1.371458 -3.311 0.87813 -0.87813 2.06914 -1.371458 3.311 -1.371458 1.24187 0 2.43287 0.493328 3.311 1.371458v0Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.5769 6.95574 6.95557 13.5771l3.56523 3.5652 6.6213 -6.6213 -3.5652 -3.56526Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M4.36499 6.77667c-0.20711 0 -0.375 -0.16789 -0.375 -0.375 0 -0.2071 0.16789 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M4.36499 6.77667c0.20711 0 0.375 -0.16789 0.375 -0.375 0 -0.2071 -0.16789 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M8.43896 6.77667c-0.2071 0 -0.375 -0.16789 -0.375 -0.375 0 -0.2071 0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M8.43896 6.77667c0.20711 0 0.375 -0.16789 0.375 -0.375 0 -0.2071 -0.16789 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <g>\n    <path stroke=\"#000000\" d=\"M15.5702 17.982c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n    <path stroke=\"#000000\" d=\"M15.5702 17.982c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  </g>\n  <g>\n    <path stroke=\"#000000\" d=\"M19.6442 17.982c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n    <path stroke=\"#000000\" d=\"M19.6442 17.982c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  </g>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
