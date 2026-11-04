
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

const SVGS = {"icon/files/server": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Server--Streamline-Ultimate\">\n  <desc>\n    Server Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.501 8.25024h1.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M18.001 8.25024h1.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M5.625 14.6252c-0.20711 0 -0.375 -0.1678 -0.375 -0.375 0 -0.2071 0.16789 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M5.625 14.6252c0.20711 0 0.375 -0.1678 0.375 -0.375 0 -0.2071 -0.16789 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M5.625 8.62524c-0.20711 0 -0.375 -0.16789 -0.375 -0.375 0 -0.2071 0.16789 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M5.625 8.62524c0.20711 0 0.375 -0.16789 0.375 -0.375 0 -0.2071 -0.16789 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.501 14.2502h1.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M18.001 14.2502h1.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12.001 17.2502v6\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.50098 23.2502H19.501\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M1.14001 23.2502c-0.207102 0 -0.374995 -0.1678 -0.374995 -0.375 0 -0.2071 0.167893 -0.375 0.374995 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M1.14001 23.2502c0.20711 0 0.375 -0.1678 0.375 -0.375 0 -0.2071 -0.16789 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M22.876 23.2502c-0.2071 0 -0.375 -0.1678 -0.375 -0.375 0 -0.2071 0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M22.876 23.2502c0.2071 0 0.375 -0.1678 0.375 -0.375 0 -0.2071 -0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.251 14.2502c0 0.7957 -0.3161 1.5588 -0.8787 2.1214s-1.3257 0.8786 -2.1213 0.8786H3.75098c-0.79565 0 -1.55871 -0.316 -2.12132 -0.8786 -0.56261 -0.5626 -0.878683 -1.3257 -0.878683 -2.1214 0 -0.7956 0.316073 -1.5587 0.878683 -2.1213 0.56261 -0.5626 1.32567 -0.8787 2.12132 -0.8787H20.251c0.7956 0 1.5587 0.3161 2.1213 0.8787 0.5626 0.5626 0.8787 1.3257 0.8787 2.1213v0Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.251 8.25024c0 0.79565 -0.3161 1.55872 -0.8787 2.12136 -0.5626 0.5626 -1.3257 0.8786 -2.1213 0.8786H3.75098c-0.79565 0 -1.55871 -0.316 -2.12132 -0.8786 -0.56261 -0.56264 -0.878683 -1.32571 -0.878683 -2.12136 0 -0.79565 0.316073 -1.55871 0.878683 -2.12132 0.56261 -0.56261 1.32567 -0.87868 2.12132 -0.87868H20.251c0.7956 0 1.5587 0.31607 2.1213 0.87868 0.5626 0.56261 0.8787 1.32567 0.8787 2.12132v0Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m1.27905 6.55024 1.936 -3.485c0.38971 -0.70163 0.95997 -1.28627 1.65169 -1.69332C5.55846 0.964872 6.34646 0.750231 7.14905 0.750244h9.70005c0.8026 -0.000013 1.5905 0.214628 2.2823 0.621676 0.6917 0.40705 1.2619 0.99169 1.6517 1.69332l1.94 3.485\" stroke-width=\"1\"></path>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
