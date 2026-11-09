
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

const BATCH = [{"setName": "icon/files/document", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Document--Streamline-Ultimate\"> <path d=\"M6.48 20.67a9.4 9.4 0 0 1 -6.13 -2.29 1 1 0 0 1 -0.35 -0.76V4.35a1 1 0 0 1 1 -1h22a1 1 0 0 1 1 1v13.27a1 1 0 0 1 -1.62 0.79l-0.15 -0.12a7.63 7.63 0 0 0 -9.6 0.11l-0.49 0.37a9.41 9.41 0 0 1 -5.66 1.9M2 17.15a7.4 7.4 0 0 0 8.94 0l0.46 -0.35A9.59 9.59 0 0 1 22 15.77V5.35H2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/drawer", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Drawer-Open--Streamline-Ultimate\"> <path d=\"m23.88 11.26 -3.07 -5.5a2 2 0 0 0 -1.7 -1H4.9a2 2 0 0 0 -1.7 1l-3.07 5.5a1.4 1.4 0 0 0 -0.13 0.49v6a1.5 1.5 0 0 0 1.5 1.5h21a1.5 1.5 0 0 0 1.5 -1.5v-6a1.29 1.29 0 0 0 -0.12 -0.49m-19 -4.38a0.25 0.25 0 0 1 0.22 -0.13l13.86 0a0.25 0.25 0 0 1 0.22 0.13l2.24 4a0.25 0.25 0 0 1 0 0.25 0.27 0.27 0 0 1 -0.22 0.12h-3.7a1.5 1.5 0 0 0 -1.06 0.44 1.52 1.52 0 0 0 -0.44 1.06 1.5 1.5 0 0 1 -1.5 1.5h-5a1.5 1.5 0 0 1 -1.5 -1.5 1.5 1.5 0 0 0 -1.5 -1.5H2.84a0.26 0.26 0 0 1 -0.21 -0.12 0.25 0.25 0 0 1 0 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
