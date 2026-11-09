
const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const colorVar = await figma.variables.getVariableByIdAsync('VariableID:34:2');
const FILL = { r: 0.062745, g: 0.094118, b: 0.156863 };
function paint(node) {
  node.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: FILL }, 'color', colorVar)];
  node.strokes = [];
}
function bindFills(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON') paint(n);
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function applyBoldXs(set, svg) {
  const xs = set.children.find(c => c.name === 'Size=xs');
  if (!xs) return { ok: false, reason: 'no-xs' };
  for (const c of [...xs.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = set.name.split('/').pop() + ' · bold';
  try { node.resize(16, 16); } catch (e) {}
  node.x = 0; node.y = 0;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  bindFills(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (e) { try { xs.resize(16, 16); } catch (e2) {} }
  xs.clipsContent = false;
  xs.visible = true;
  for (const v of set.children) v.visible = true;
  set.clipsContent = true;
  set.counterAxisAlignItems = 'MIN';
  set.primaryAxisAlignItems = 'MIN';
  if (set.layoutMode !== 'NONE') {
    set.primaryAxisSizingMode = 'FIXED';
    set.counterAxisSizingMode = 'FIXED';
  }
  set.resize(16, 16);
  try { set.layoutSizingHorizontal = 'FIXED'; set.layoutSizingVertical = 'FIXED'; } catch (e) {}
  return { ok: true };
}

const BATCH = [{"setName": "icon/misc/atom", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Science-Atom-Positive-Negative--Streamline-Ultimate\"> <g> <path d=\"M23.52 8.62a1 1 0 1 0 -1.92 0.56A10.28 10.28 0 0 1 22 12 10 10 0 1 1 12 2a10.34 10.34 0 0 1 2.42 0.29 1 1 0 0 0 1.21 -0.72A1 1 0 0 0 14.9 0.35 12.24 12.24 0 0 0 12 0a12 12 0 1 0 11.52 8.62\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 5.75A6.25 6.25 0 1 0 18.25 12 6.25 6.25 0 0 0 12 5.75M15 13h-1.5a0.5 0.5 0 0 0 -0.5 0.5V15a1 1 0 0 1 -2 0v-1.5a0.5 0.5 0 0 0 -0.5 -0.5H9a1 1 0 0 1 0 -2h1.5a0.5 0.5 0 0 0 0.5 -0.5V9a1 1 0 0 1 2 0v1.5a0.5 0.5 0 0 0 0.5 0.5H15a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.25 4a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/award", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Award-Star--Streamline-Ultimate\"> <g> <path d=\"M6.52 10.14 9.64 10l1.19 3a1.28 1.28 0 0 0 2.43 -0.15l1 -3.57 3.57 -1a1.27 1.27 0 0 0 1 -1.18A1.24 1.24 0 0 0 18 5.83l-3 -1.19 0.18 -3.14a1.28 1.28 0 0 0 -0.8 -1.19A1.26 1.26 0 0 0 13 0.6l-1.88 1.88 -3.3 -1.31a1.27 1.27 0 0 0 -1.31 0.32 1.29 1.29 0 0 0 -0.31 1.34l1.28 3.3L5.6 8a1.24 1.24 0 0 0 -0.29 1.36 1.27 1.27 0 0 0 1.2 0.77Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.28 19.78a1.51 1.51 0 0 0 -1.5 1.5v2a0.5 0.5 0 0 0 0.5 0.5h12a0.5 0.5 0 0 0 0.5 -0.5v-2a1.5 1.5 0 0 0 -1.5 -1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.28 18.28a0.5 0.5 0 0 0 0.5 -0.5v-1.5a1.84 1.84 0 0 0 -1.34 -1.72l-3 -0.76a0.53 0.53 0 0 0 -0.25 0l-3 0.76a1.84 1.84 0 0 0 -1.35 1.72v1.5a0.5 0.5 0 0 0 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
