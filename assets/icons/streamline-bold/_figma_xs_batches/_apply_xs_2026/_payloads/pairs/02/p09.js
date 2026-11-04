
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

const BATCH = [{"setName": "icon/health/syringe", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Medical-Instrument-Syringe--Streamline-Ultimate\"> <path d=\"M18.39 7a0.51 0.51 0 0 1 0.55 -0.1 3.41 3.41 0 0 0 1.36 0.28 3.5 3.5 0 1 0 -3.5 -3.5 3.41 3.41 0 0 0 0.28 1.36 0.51 0.51 0 0 1 -0.1 0.55L15.64 7a0.51 0.51 0 0 1 -0.71 0l-0.22 -0.22a0.5 0.5 0 0 1 -0.1 -0.55 3.47 3.47 0 0 0 -0.74 -3.82 3.58 3.58 0 0 0 -4.95 0 3.49 3.49 0 0 0 -1 2.48 1 1 0 0 0 2 0 1.5 1.5 0 0 1 0.44 -1.06 1.53 1.53 0 0 1 2.12 0 1.5 1.5 0 0 1 0 2.12L9.12 9.22l-4.95 4.95a4 4 0 0 0 -0.77 4.54 0.5 0.5 0 0 1 -0.09 0.57L0.5 22.09a1 1 0 1 0 1.41 1.41l2.81 -2.81a0.5 0.5 0 0 1 0.57 -0.09 4 4 0 0 0 4.54 -0.77l4.95 -4.95 3.33 -3.33a1.5 1.5 0 1 1 1.06 2.56 1 1 0 0 0 0 2 3.5 3.5 0 0 0 2.47 -6 3.47 3.47 0 0 0 -3.82 -0.73 0.51 0.51 0 0 1 -0.55 -0.11l-0.22 -0.22a0.51 0.51 0 0 1 -0.15 -0.35 0.53 0.53 0 0 1 0.15 -0.36Zm1.91 -4.8a1.5 1.5 0 1 1 -1.5 1.5 1.51 1.51 0 0 1 1.5 -1.5m-4.66 8.29a0.51 0.51 0 0 1 0 0.7l-1.21 1.21a0.5 0.5 0 0 1 -0.71 0l-1.06 -1.06 -1.06 -1.06a0.5 0.5 0 0 1 0 -0.71l1.21 -1.21a0.51 0.51 0 0 1 0.7 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/thermometer", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Temperature-Thermometer--Streamline-Ultimate\"> <g> <path d=\"M16.56 14.1a0.23 0.23 0 0 1 -0.06 -0.16V4.5a4.5 4.5 0 0 0 -9 0v9.44a0.23 0.23 0 0 1 -0.06 0.16 6 6 0 1 0 9.12 0M12 22a4 4 0 0 1 -2.8 -6.86 1 1 0 0 0 0.3 -0.71V4.5a2.5 2.5 0 0 1 5 0v9.93a1 1 0 0 0 0.3 0.71A4 4 0 0 1 12 22\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.11 16.34a0.26 0.26 0 0 1 -0.11 -0.21V7a1 1 0 0 0 -2 0v9.13a0.26 0.26 0 0 1 -0.11 0.21 2 2 0 1 0 2.22 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
