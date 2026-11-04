
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

const BATCH = [{"setName": "icon/navigation/home", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"House--Streamline-Ultimate\"> <path d=\"m23.61 8.71 -11 -8.5a1 1 0 0 0 -1.22 0l-11 8.5A1 1 0 0 0 0 9.5V23a1 1 0 0 0 1 1h22a1 1 0 0 0 1 -1V9.5a1 1 0 0 0 -0.39 -0.79Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/status/badge", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Badge--Streamline-Ultimate\"> <path d=\"m22.72 10.35 -1.84 -1.48a1.09 1.09 0 0 1 -0.4 -1l0.25 -2.34a2.09 2.09 0 0 0 -2.3 -2.31l-2.35 0.25a1.09 1.09 0 0 1 -1 -0.4l-1.45 -1.81a2.16 2.16 0 0 0 -3.26 0L8.89 3.1a1.09 1.09 0 0 1 -1 0.4l-2.32 -0.25a2.09 2.09 0 0 0 -2.3 2.31l0.25 2.34a1.09 1.09 0 0 1 -0.4 1l-1.84 1.45a2.09 2.09 0 0 0 0 3.26l1.84 1.48a1.1 1.1 0 0 1 0.4 1l-0.25 2.35a2.07 2.07 0 0 0 0.6 1.7 2 2 0 0 0 1.7 0.6l2.35 -0.25a1.09 1.09 0 0 1 1 0.4l1.48 1.84a2.09 2.09 0 0 0 3.26 0l1.48 -1.84a1.09 1.09 0 0 1 1 -0.4l2.35 0.25a2 2 0 0 0 1.7 -0.6 2.07 2.07 0 0 0 0.6 -1.7l-0.25 -2.35a1.1 1.1 0 0 1 0.4 -1l1.84 -1.48a2.09 2.09 0 0 0 0 -3.26Zm-10.32 4.7a1.79 1.79 0 0 1 -2.67 0.19L7.29 12.8a1 1 0 1 1 1.42 -1.42L11 13.63l3.91 -5.21a1 1 0 0 1 1.6 1.2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
