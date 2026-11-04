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
const BATCH = [{"figma": "icon/status/star.filled", "regularName": "Rating Star", "filledOnOutline": true, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rating-Star--Streamline-Streamline-3.0\"> <desc> Rating Star Streamline Icon: https://streamlinehq.com </desc> <path d=\"M23.56 8.73a1.51 1.51 0 0 0 -1.41 -1h-6.09a0.5 0.5 0 0 1 -0.47 -0.33l-2.18 -6.2A1.52 1.52 0 0 0 12 0.25a1.49 1.49 0 0 0 -1.4 1L8.41 7.42a0.5 0.5 0 0 1 -0.47 0.33H1.85a1.5 1.5 0 0 0 -1.41 1 1.52 1.52 0 0 0 0.45 1.65l5.18 4.3a0.5 0.5 0 0 1 0.16 0.54l-2.18 6.53a1.5 1.5 0 0 0 2.31 1.69l5.34 -3.92a0.49 0.49 0 0 1 0.59 0l5.35 3.92A1.5 1.5 0 0 0 20 21.77l-2.18 -6.53a0.5 0.5 0 0 1 0.16 -0.54l5.19 -4.31a1.51 1.51 0 0 0 0.39 -1.66Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rating-Star--Streamline-Streamline-3.0\"> <desc> Rating Star Streamline Icon: https://streamlinehq.com </desc> <path d=\"M23.56 8.73a1.51 1.51 0 0 0 -1.41 -1h-6.09a0.5 0.5 0 0 1 -0.47 -0.33l-2.18 -6.2A1.52 1.52 0 0 0 12 0.25a1.49 1.49 0 0 0 -1.4 1L8.41 7.42a0.5 0.5 0 0 1 -0.47 0.33H1.85a1.5 1.5 0 0 0 -1.41 1 1.52 1.52 0 0 0 0.45 1.65l5.18 4.3a0.5 0.5 0 0 1 0.16 0.54l-2.18 6.53a1.5 1.5 0 0 0 2.31 1.69l5.34 -3.92a0.49 0.49 0 0 1 0.59 0l5.35 3.92A1.5 1.5 0 0 0 20 21.77l-2.18 -6.53a0.5 0.5 0 0 1 0.16 -0.54l5.19 -4.31a1.51 1.51 0 0 0 0.39 -1.66Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>"}, {"figma": "icon/status/success", "regularName": "Check Circle", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Circle--Streamline-Streamline-3.0\"> <desc> Check Circle Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>check-circle</title> <path d=\"m6.75 9 3.294 4.611a1.526 1.526 0 0 0 2.414 0.09L23.25 0.749\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M16.783 3.824A10.487 10.487 0 1 0 20.8 8.377\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Circle--Streamline-Streamline-3.0\"> <desc> Check Circle Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M12.84 18.32a3 3 0 0 1 -4.45 0.24L4.87 15a3.1 3.1 0 0 1 -0.23 -4.24A3 3 0 0 1 9 10.68l1.08 1.08a0.25 0.25 0 0 0 0.37 0l4.44 -5.51a0.25 0.25 0 0 0 -0.07 -0.37 9.67 9.67 0 0 0 -6.28 -1.37 9.75 9.75 0 1 0 10.83 11.35 9.89 9.89 0 0 0 -0.32 -4.62 0.26 0.26 0 0 0 -0.44 -0.08Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M23.44 0.39a1.5 1.5 0 0 0 -2.11 0.23L10.39 14.2l-2.46 -2.46a1.51 1.51 0 0 0 -2.12 0 1.49 1.49 0 0 0 0 2.12l3.64 3.64a1.51 1.51 0 0 0 2.22 -0.12l12 -14.88a1.51 1.51 0 0 0 -0.23 -2.11Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </g> </svg>"}, {"figma": "icon/status/unlock", "regularName": "Lock Unlock", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock-Unlock--Streamline-Streamline-3.0\"> <desc> Lock Unlock Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>lock-unlock</title> <path d=\"M0.75 9.75V6a5.25 5.25 0 0 1 10.5 0v3.75\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M8.25 9.75h13.5s1.5 0 1.5 1.5v10.5s0 1.5 -1.5 1.5H8.25s-1.5 0 -1.5 -1.5v-10.5s0 -1.5 1.5 -1.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m15 15 0 3\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock-Unlock--Streamline-Streamline-3.0\"> <desc> Lock Unlock Streamline Icon: https://streamlinehq.com </desc> <path d=\"M19.5 9.5h-0.75V6.75A6.75 6.75 0 0 0 5.53 4.81a1.25 1.25 0 0 0 2.4 0.72 4.25 4.25 0 0 1 8.32 1.22V9a0.5 0.5 0 0 1 -0.5 0.5H4.5a2 2 0 0 0 -2 2V22a2 2 0 0 0 2 2h15a2 2 0 0 0 2 -2V11.5a2 2 0 0 0 -2 -2Zm-9.5 6a2 2 0 0 1 4 0 2 2 0 0 1 -1 1.72v2.28a1 1 0 0 1 -2 0v-2.28a2 2 0 0 1 -1 -1.72Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>"}, {"figma": "icon/status/warning", "regularName": "Alert Circle", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Alert-Circle--Streamline-Streamline-3.0\"> <desc> Alert Circle Streamline Icon: https://streamlinehq.com </desc> <path stroke=\"#0F1828\" d=\"M12 17.25a0.375 0.375 0 0 1 0 -0.75\" stroke-width=\"1.5\"></path> <path stroke=\"#0F1828\" d=\"M12 17.25a0.375 0.375 0 0 0 0 -0.75\" stroke-width=\"1.5\"></path> <path stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M12 13.5V5.25\" stroke-width=\"1.5\"></path> <path stroke=\"#0F1828\" stroke-miterlimit=\"10\" d=\"M12 23.25c6.213 0 11.25 -5.037 11.25 -11.25S18.213 0.75 12 0.75 0.75 5.787 0.75 12 5.787 23.25 12 23.25Z\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Circle--Streamline-Streamline-3.0\"> <desc> Alert Circle Streamline Icon: https://streamlinehq.com </desc> <path d=\"M12 0a12.24 12.24 0 0 0 -8.53 3.65A11.85 11.85 0 0 0 0 12.21 11.78 11.78 0 0 0 11.8 24h0.2a12.11 12.11 0 0 0 12 -12.21A11.77 11.77 0 0 0 12 0Zm-1.5 16.54A1.48 1.48 0 0 1 12 15a1.53 1.53 0 0 1 1.52 1.47A1.47 1.47 0 0 1 12.05 18a1.53 1.53 0 0 1 -1.55 -1.46Zm0.5 -4v-6a1 1 0 0 1 2 0v6a1 1 0 0 1 -2 0Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>"}];

const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
const results = [];
for (const item of BATCH) {
  const set = sets.find(s => s.name === item.figma);
  if (!set) { results.push({ figma: item.figma, ok: false, reason: 'missing-set' }); continue; }
  applyOutline(set, item.outline, item.filledOnOutline);
  applyBoldXs(set, item.bold);
  parkSet(set);
  set.description = item.filledOnOutline
    ? ('Streamline Bold 3.0 — ' + item.regularName + ' (intentional fill on outline slots)')
    : ('Streamline Regular 3.0 — ' + item.regularName);
  results.push({ figma: item.figma, ok: true });
}
return { n: results.length, failed: results.filter(r => !r.ok), ok: results.filter(r => r.ok).map(r => r.figma) };
