const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const colorVar = await figma.variables.getVariableByIdAsync('VariableID:34:2');
const FILL = { r: 0.062745, g: 0.094118, b: 0.156863 };
const PARK = {
  'Size=xs, Style=outline': { x: 0, y: 0, w: 16, h: 16 },
  'Size=sm, Style=outline': { x: 24, y: 0, w: 20, h: 20 },
  'Size=md, Style=outline': { x: 52, y: 0, w: 24, h: 24 },
  'Size=lg, Style=outline': { x: 84, y: 0, w: 32, h: 32 },
  'Size=xs, Style=bold': { x: 124, y: 0, w: 16, h: 16 },
};
const OUTLINE = {
  'Size=xs, Style=outline': { glyph: 14.5, inset: 0.75, sw: 1 },
  'Size=sm, Style=outline': { glyph: 18, inset: 1, sw: 1.5 },
  'Size=md, Style=outline': { glyph: 22, inset: 1, sw: 1.5 },
  'Size=lg, Style=outline': { glyph: 30, inset: 1, sw: 1.5 },
};
function bindStrokes(root, sw) {
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
          { type: 'SOLID', color: FILL }, 'color', colorVar)];
        n.strokeWeight = sw;
        n.strokeJoin = 'ROUND';
        n.strokeCap = 'ROUND';
        try { n.strokeAlign = 'CENTER'; } catch (_) {}
      }
    }
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function paintFill(node) {
  node.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: FILL }, 'color', colorVar)];
  node.strokes = [];
}
function bindFills(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON') paintFill(n);
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function evenodd(root) {
  const vectors = root.findAll(n => n.type === 'VECTOR');
  for (const v of vectors) {
    const vn = v.vectorNetwork;
    if (!vn || !vn.regions) continue;
    let changed = false;
    const regions = vn.regions.map(r => {
      if (r.loops && r.loops.length >= 2 && r.windingRule !== 'EVENODD') {
        changed = true;
        return Object.assign({}, r, { windingRule: 'EVENODD' });
      }
      return r;
    });
    if (changed) v.vectorNetwork = { vertices: vn.vertices, segments: vn.segments, regions };
  }
}
function applyOutline(set, svg, filledOnOutline) {
  const out = {};
  for (const [vname, cfg] of Object.entries(OUTLINE)) {
    const variant = set.children.find(c => c.name === vname);
    if (!variant) { out[vname] = 'missing'; continue; }
    for (const c of [...variant.children]) c.remove();
    const node = figma.createNodeFromSvg(svg);
    node.name = '_outline';
    try { node.resize(cfg.glyph, cfg.glyph); } catch (e) {}
    node.x = cfg.inset;
    node.y = cfg.inset;
    node.clipsContent = false;
    if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    variant.appendChild(node);
    if (filledOnOutline) {
      evenodd(node);
      bindFills(node);
    } else {
      bindStrokes(node, cfg.sw);
    }
    variant.clipsContent = false;
    variant.visible = true;
    const park = PARK[vname];
    try { variant.resizeWithoutConstraints(park.w, park.h); } catch (e) { try { variant.resize(park.w, park.h); } catch (e2) {} }
    variant.x = park.x;
    variant.y = park.y;
    out[vname] = true;
  }
  return out;
}
function applyBoldXs(set, svg) {
  const bold = set.children.find(c => c.name === 'Size=xs, Style=bold');
  if (!bold) return { ok: false, reason: 'no-bold' };
  for (const c of [...bold.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = '_bold';
  try { node.resize(14, 14); } catch (e) {}
  node.x = 1;
  node.y = 1;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  bold.appendChild(node);
  evenodd(node);
  bindFills(node);
  bold.clipsContent = false;
  bold.visible = true;
  const park = PARK['Size=xs, Style=bold'];
  try { bold.resizeWithoutConstraints(park.w, park.h); } catch (e) { try { bold.resize(park.w, park.h); } catch (e2) {} }
  bold.x = park.x;
  bold.y = park.y;
  return { ok: true };
}
function parkSet(set) {
  const w = set.width;
  const h = set.height;
  const x = set.x;
  const y = set.y;
  set.clipsContent = true;
  try { set.resizeWithoutConstraints(16, 16); } catch (e) {}
  for (const c of set.children) {
    const park = PARK[c.name];
    if (park) {
      c.visible = true;
      c.x = park.x;
      c.y = park.y;
    } else {
      c.visible = true;
    }
  }
  return { kept: { w, h, x, y }, after: { w: set.width, h: set.height, x: set.x, y: set.y } };
}
const BATCH =
