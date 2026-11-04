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

const sets0 = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
let notesSet = sets0.find(s => s.name === 'icon/files/notes');
let notesAddSet = sets0.find(s => s.name === 'icon/files/notes.add');
const created = { notesAdd: false, gridPlaced: false, categoryRow: false, shifted: 0 };
if (!notesSet) {
  return { ok: false, reason: 'missing-notes-set' };
}
if (!notesAddSet) {
  notesAddSet = notesSet.clone();
  notesAddSet.name = 'icon/files/notes.add';
  created.notesAdd = true;
  const grid = notesSet.parent;
  if (grid && 'children' in grid) {
    const insertX = notesSet.x + 32;
    for (const c of [...grid.children]) {
      if (c.id !== notesAddSet.id && c.x >= insertX) {
        c.x = c.x + 32;
        created.shifted += 1;
      }
    }
    if (notesAddSet.parent !== grid) grid.appendChild(notesAddSet);
    notesAddSet.x = insertX;
    notesAddSet.y = notesSet.y;
    created.gridPlaced = true;
  }
  const rowNotes = page.findOne(n => n.name === 'row/notes' && n.type === 'FRAME');
  if (rowNotes && rowNotes.parent) {
    const col = rowNotes.parent;
    const newRow = rowNotes.clone();
    newRow.name = 'row/notes.add';
    const idx = col.children.indexOf(rowNotes);
    col.insertChild(Math.min(idx + 1, col.children.length), newRow);
    const inst = newRow.findOne(n => n.type === 'INSTANCE');
    const label = newRow.findOne(n => n.type === 'TEXT');
    const xs = notesAddSet.children.find(c => c.name === 'Size=xs, Style=outline');
    if (inst && xs) {
      inst.swapComponent(xs);
      inst.name = 'icon/files/notes.add';
    }
    if (label && 'characters' in label) {
      const fonts = label.getStyledTextSegments(['fontName']).map(s => s.fontName);
      for (const f of fonts) await figma.loadFontAsync(f);
      label.characters = 'notes.add';
      label.name = 'notes.add';
    }
    created.categoryRow = true;
    created.categoryRowId = newRow.id;
  }
}

const BATCH = [{"figma": "icon/files/notes", "regularName": "Notes Book Text", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Notes-Book-Text--Streamline-Streamline-3.0\"> <desc> Notes Book Text Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>notes-book-text</title> <path d=\"M23.25 21.643a1.557 1.557 0 0 1 -1.5 1.607H2.25a1.557 1.557 0 0 1 -1.5 -1.607V5.357a1.557 1.557 0 0 1 1.5 -1.607h19.5a1.557 1.557 0 0 1 1.5 1.607Z\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m5.25 0.75 0 4.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m9.75 0.75 0 4.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m14.25 0.75 0 4.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m18.75 0.75 0 4.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m6.75 9.75 10.5 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m6.75 14.25 10.5 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m6.75 18.75 5.25 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Notes-Book-Text--Streamline-Streamline-3.0\"> <desc> Notes Book Text Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M18.5 10.5a1 1 0 0 0 -1 -1h-11a1 1 0 0 0 0 2h11a1 1 0 0 0 1 -1Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M18.5 14.5a1 1 0 0 0 -1 -1h-11a1 1 0 0 0 0 2h11a1 1 0 0 0 1 -1Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M14.5 17.5h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0 -2Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M23 4.5a2 2 0 0 0 -2 -2h-1.75a0.25 0.25 0 0 1 -0.25 -0.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-3.5a0.25 0.25 0 0 1 -0.25 -0.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-3.5A0.25 0.25 0 0 1 7 2.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25H3a2 2 0 0 0 -2 2V22a2 2 0 0 0 2 2h18a2 2 0 0 0 2 -2Zm-2 17.25a0.25 0.25 0 0 1 -0.25 0.25H3.25a0.25 0.25 0 0 1 -0.25 -0.25v-17a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25v0.75a1 1 0 0 0 2 0v-0.75a0.25 0.25 0 0 1 0.25 -0.25h3.5a0.25 0.25 0 0 1 0.25 0.25v0.75a1 1 0 0 0 2 0v-0.75a0.25 0.25 0 0 1 0.25 -0.25h3.5a0.25 0.25 0 0 1 0.25 0.25v0.75a1 1 0 0 0 2 0v-0.75a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </g> </svg>"}, {"figma": "icon/files/notes.add", "regularName": "Notes Add", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Notes-Add--Streamline-Streamline-3.0\"> <desc> Notes Add Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>notes-add</title> <path d=\"M11.25 17.25a6 6 0 1 0 12 0 6 6 0 1 0 -12 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m17.25 14.25 0 6\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m14.25 17.25 6 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M8.25 20.25h-6a1.464 1.464 0 0 1 -1.5 -1.5V3.857a1.557 1.557 0 0 1 1.5 -1.607h15a1.557 1.557 0 0 1 1.5 1.607V8.25\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m5.25 0.75 0 4.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m9.75 0.75 0 4.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m14.25 0.75 0 4.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Notes-Add--Streamline-Streamline-3.0\"> <desc> Notes Add Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M17.5 11a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5Zm2.5 7.25h-1.5a0.25 0.25 0 0 0 -0.25 0.25V20a0.75 0.75 0 0 1 -1.5 0v-1.5a0.25 0.25 0 0 0 -0.25 -0.25H15a0.75 0.75 0 0 1 0 -1.5h1.5a0.25 0.25 0 0 0 0.25 -0.25V15a0.75 0.75 0 0 1 1.5 0v1.5a0.25 0.25 0 0 0 0.25 0.25H20a0.75 0.75 0 0 1 0 1.5Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M12 4.75V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1a0.25 0.25 0 0 1 0.25 0.25v4.7a0.24 0.24 0 0 0 0.3 0.24 8.7 8.7 0 0 1 1.46 -0.19 0.24 0.24 0 0 0 0.24 -0.24V4.5a2 2 0 0 0 -2 -2h-1.25a0.25 0.25 0 0 1 -0.25 -0.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-1.5a0.25 0.25 0 0 1 -0.25 -0.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-1.5A0.25 0.25 0 0 1 6 2.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25H2a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h7.45a0.24 0.24 0 0 0 0.24 -0.3 8.7 8.7 0 0 1 -0.19 -1.46 0.24 0.24 0 0 0 -0.24 -0.24h-7a0.25 0.25 0 0 1 -0.26 -0.25V4.75a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </g> </svg>"}];
const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
const results = [];
const mutatedNodeIds = [];
for (const item of BATCH) {
  const set = sets.find(s => s.name === item.figma);
  if (!set) { results.push({ figma: item.figma, ok: false, reason: 'missing-set' }); continue; }
  applyOutline(set, item.outline, !!item.filledOnOutline);
  applyBoldXs(set, item.bold);
  parkSet(set);
  set.description = item.filledOnOutline
    ? ('Streamline Bold 3.0 — ' + item.regularName + ' (intentional fill on outline slots)')
    : ('Streamline Regular 3.0 — ' + item.regularName);
  results.push({ figma: item.figma, ok: true, id: set.id, description: set.description });
  mutatedNodeIds.push(set.id);
}
if (notesAddSet) mutatedNodeIds.push(notesAddSet.id);
return {
  created,
  createdNodeIds: created.notesAdd && notesAddSet ? [notesAddSet.id] : [],
  mutatedNodeIds,
  n: results.length,
  failed: results.filter(r => !r.ok),
  ok: results.filter(r => r.ok),
};
