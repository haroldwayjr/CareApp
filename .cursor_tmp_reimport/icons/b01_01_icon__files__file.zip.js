
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

const SVGS = {"icon/files/file.zip": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Zip-File--Streamline-Ultimate\">\n  <desc>\n    Zip File Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.726 4.557c0.0342 0.27453 0.0096 0.55318 -0.0721 0.81749 -0.0817 0.2643 -0.2187 0.5082 -0.4019 0.71551 -0.1909 0.2074 -0.4228 0.37294 -0.681 0.48617 -0.2582 0.11324 -0.5371 0.1717 -0.81898 0.1717 -0.28192 0 -0.56078 -0.05846 -0.81896 -0.1717 -0.25818 -0.11323 -0.49007 -0.27877 -0.68104 -0.48617 -0.18318 -0.20731 -0.32017 -0.45121 -0.40189 -0.71551 -0.08172 -0.26431 -0.1063 -0.54296 -0.07211 -0.81749l0.472 -3.807H11.25l0.476 3.807Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M9.75 15c-0.20711 0 -0.375 -0.1679 -0.375 -0.375s0.16789 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M9.75 15c0.20711 0 0.375 -0.1679 0.375 -0.375s-0.16789 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M9.75 19.5c-0.20711 0 -0.375 -0.1679 -0.375 -0.375s0.16789 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M9.75 19.5c0.20711 0 0.375 -0.1679 0.375 -0.375s-0.16789 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <g>\n    <path stroke=\"#000000\" d=\"M9.75 10.5c-0.20711 0 -0.375 -0.1679 -0.375 -0.375 0 -0.20711 0.16789 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n    <path stroke=\"#000000\" d=\"M9.75 10.5c0.20711 0 0.375 -0.1679 0.375 -0.375 0 -0.20711 -0.16789 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  </g>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.25 23.25H3.75c-0.39782 0 -0.77936 -0.158 -1.06066 -0.4393 -0.2813 -0.2813 -0.43934 -0.6629 -0.43934 -1.0607V2.25c0 -0.39782 0.15804 -0.77936 0.43934 -1.06066C2.97064 0.908035 3.35218 0.75 3.75 0.75h13.629c0.3975 0.000085 0.7788 0.157982 1.06 0.439l2.872 2.872c0.281 0.2812 0.4389 0.66245 0.439 1.06V21.75c0 0.3978 -0.158 0.7794 -0.4393 1.0607s-0.6629 0.4393 -1.0607 0.4393Z\" stroke-width=\"1\"></path>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
