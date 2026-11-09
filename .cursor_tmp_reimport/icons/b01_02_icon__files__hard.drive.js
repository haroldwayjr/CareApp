
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

const SVGS = {"icon/files/hard.drive": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Hard-Drive--Streamline-Ultimate\">\n  <desc>\n    Hard Drive Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.25 18c0 1.1935 -0.4741 2.3381 -1.318 3.182 -0.8439 0.8439 -1.9885 1.318 -3.182 1.318H5.25c-1.19347 0 -2.33807 -0.4741 -3.18198 -1.318C1.22411 20.3381 0.75 19.1935 0.75 18s0.47411 -2.3381 1.31802 -3.182C2.91193 13.9741 4.05653 13.5 5.25 13.5h13.5c1.1935 0 2.3381 0.4741 3.182 1.318 0.8439 0.8439 1.318 1.9885 1.318 3.182v0Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M15 18.375c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M15 18.375c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M18.375 18.375c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M18.375 18.375c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.131 16.973 20.043 3.815c-0.1544 -0.65856 -0.5269 -1.2456 -1.057 -1.66583 -0.53 -0.42024 -1.1866 -0.649 -1.863 -0.64917H6.87802c-0.6766 -0.00006 -1.33336 0.22861 -1.86362 0.64886S4.11151 3.15627 3.95702 3.815L0.869019 16.973\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5.25 18H9\" stroke-width=\"1\"></path>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
