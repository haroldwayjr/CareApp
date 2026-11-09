
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

const SVGS = {"icon/health/surgery": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Surgery-Liposuction--Streamline-Ultimate\">\n  <desc>\n    Surgery Liposuction Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.9991 2.23547c0.0209 0.8017 -0.131 1.59852 -0.4453 2.33633 -0.3143 0.73781 -0.7838 1.39933 -1.3764 1.93963 -0.5927 0.5403 -1.29469 0.94673 -2.05835 1.19168 -0.76365 0.24495 -1.57108 0.32268 -2.36744 0.22792 -0.79636 -0.09476 -1.563 -0.35979 -2.24786 -0.7771 -0.68485 -0.41731 -1.27187 -0.97712 -1.72119 -1.64141 -0.44933 -0.66429 -0.75042 -1.41749 -0.882849 -2.20846C0.767286 2.51309 0.806637 1.70288 1.01509 0.928467\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M22.9831 0.928467c0.2096 0.774853 0.2498 1.585753 0.118 2.377563 -0.1318 0.7918 -0.4326 1.54592 -0.8819 2.21108 -0.4493 0.66516 -1.0366 1.22575 -1.722 1.64365 -0.6853 0.41789 -1.4526 0.68329 -2.2497 0.77813 -0.7971 0.09485 -1.6052 0.01692 -2.3695 -0.22849 -0.7643 -0.2454 -1.4667 -0.65252 -2.0596 -1.19367 -0.5928 -0.54115 -1.0622 -1.20363 -1.3761 -1.9424 -0.314 -0.73876 -0.4651 -1.53646 -0.4432 -2.33886\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M2.66009 23.0715c-3.324 -3.817 0.031 -7.063 0.266 -16.31003\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21.5841 23.0716c3.348 -3.844 -0.08 -7.11 -0.271 -16.51301\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.97109 22.5854c0.39378 -0.616 0.74365 -1.2589 1.047 -1.924\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6.96109 17.6345c0.13216 -0.7187 0.20474 -1.4472 0.217 -2.178\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6.90709 12.2985c-0.13706 -0.719 -0.31298 -1.4301 -0.527 -2.13\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.0231 22.5854c-0.3942 -0.6157 -0.7441 -1.2587 -1.047 -1.924\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.0321 17.6345c-0.1317 -0.7188 -0.2043 -1.4473 -0.217 -2.178\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.0861 12.2984c0.1381 -0.7178 0.314 -1.4278 0.527 -2.127\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M6.38009 4.94922c-0.27614 0 -0.5 -0.22386 -0.5 -0.5s0.22386 -0.5 0.5 -0.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M6.38009 4.94922c0.27615 0 0.5 -0.22386 0.5 -0.5s-0.22385 -0.5 -0.5 -0.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M17.5881 4.94922c-0.2761 0 -0.5 -0.22386 -0.5 -0.5s0.2239 -0.5 0.5 -0.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M17.5881 4.94922c0.2761 0 0.5 -0.22386 0.5 -0.5s-0.2239 -0.5 -0.5 -0.5\" stroke-width=\"1\"></path>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
