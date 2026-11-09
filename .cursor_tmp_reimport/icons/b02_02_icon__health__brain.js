
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

const SVGS = {"icon/health/brain": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Brain--Streamline-Ultimate\">\n  <desc>\n    Brain Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M22.8 12a2.808 2.808 0 0 1 -2.614 2.8 3.493 3.493 0 0 1 -3.095 5.622 1.874 1.874 0 1 1 -3.677 0.592 2.819 2.819 0 0 1 -2.82 0 1.874 1.874 0 1 1 -3.677 -0.592A3.493 3.493 0 0 1 3.818 14.8a2.8 2.8 0 0 1 0 -5.592 3.493 3.493 0 0 1 3.1 -5.622 1.874 1.874 0 1 1 3.672 -0.596 2.819 2.819 0 0 1 2.82 0 1.874 1.874 0 1 1 3.677 0.592A3.493 3.493 0 0 1 20.182 9.2 2.808 2.808 0 0 1 22.8 12Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 13.597 0 0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 9.278 0 0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 4.959 0 0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 17.916 0 0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M6.602 8.339a1.408 1.408 0 1 0 2.816 0 1.408 1.408 0 1 0 -2.816 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M14.816 8.245a1.408 1.408 0 1 0 2.816 0 1.408 1.408 0 1 0 -2.816 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M5.898 16.694a1.408 1.408 0 1 0 2.816 0 1.408 1.408 0 1 0 -2.816 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M14.934 14.816a1.408 1.408 0 1 0 2.816 0 1.408 1.408 0 1 0 -2.816 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M6.133 11.625h0.938a0.938 0.938 0 0 0 0.939 -0.939v-0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
