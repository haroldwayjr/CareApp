
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

const BATCH = [{"setName": "icon/health/mri", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Radiology-Scan-Mri--Streamline-Ultimate\"> <path d=\"M24 4.51A2.51 2.51 0 0 0 21.5 2l-3.8 0a0.25 0.25 0 0 1 -0.17 0A8.34 8.34 0 0 0 12 0a8.4 8.4 0 0 0 -5.52 1.94 0.25 0.25 0 0 1 -0.17 0.06H2.5A2.5 2.5 0 0 0 0 4.5v19a0.5 0.5 0 0 0 0.5 0.5h23a0.5 0.5 0 0 0 0.5 -0.5Zm-9.54 -0.12a0.52 0.52 0 0 1 0.31 0.29 0.47 0.47 0 0 1 0 0.43L14 6.45a0.5 0.5 0 0 1 -0.57 0.24 5.48 5.48 0 0 0 -2.86 0 0.49 0.49 0 0 1 -0.57 -0.24l-0.74 -1.34a0.47 0.47 0 0 1 0 -0.43 0.52 0.52 0 0 1 0.31 -0.29 8 8 0 0 1 4.92 0Zm2.84 15.34a1 1 0 0 1 0.2 0.6V21a1 1 0 0 1 -1 1h-9a1 1 0 0 1 -1 -1v-0.67a1 1 0 0 1 0.2 -0.6l2.5 -4.33a1 1 0 0 1 0.8 -0.4h4a1 1 0 0 1 0.8 0.4ZM7.17 5.63a0.51 0.51 0 0 1 0.41 -0.09 0.49 0.49 0 0 1 0.33 0.25l0.74 1.32a0.51 0.51 0 0 1 -0.12 0.63A5.48 5.48 0 0 0 6.5 12a5.37 5.37 0 0 0 0.89 3 0.51 0.51 0 0 1 0 0.53l-0.81 1.41a0.54 0.54 0 0 1 -0.4 0.25 0.52 0.52 0 0 1 -0.42 -0.19A8 8 0 0 1 7.17 5.63M18.24 17a0.52 0.52 0 0 1 -0.43 0.19 0.54 0.54 0 0 1 -0.4 -0.25l-0.81 -1.41a0.51 0.51 0 0 1 0 -0.53 5.37 5.37 0 0 0 0.89 -3 5.48 5.48 0 0 0 -2 -4.26 0.49 0.49 0 0 1 -0.12 -0.63l0.74 -1.32a0.49 0.49 0 0 1 0.33 -0.25 0.51 0.51 0 0 1 0.41 0.09A8 8 0 0 1 18.24 17\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
;
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
