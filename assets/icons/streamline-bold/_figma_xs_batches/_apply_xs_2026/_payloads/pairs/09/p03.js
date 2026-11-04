
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

const BATCH = [{"setName": "icon/actions/locate", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Earth-Locate--Streamline-Ultimate\"> <g> <path d=\"M15.61 21.68a0.5 0.5 0 0 0 -0.55 -0.16A9.95 9.95 0 0 1 7.64 21a0.24 0.24 0 0 1 -0.14 -0.23v-1.16a2.46 2.46 0 0 1 0.89 -1.91A4.5 4.5 0 0 0 5.5 9.75H2.58a0.24 0.24 0 0 1 -0.19 -0.1 0.23 0.23 0 0 1 -0.05 -0.21 10 10 0 0 1 14.55 -6.16 0.25 0.25 0 0 1 0.12 0.28 0.26 0.26 0 0 1 -0.24 0.19h-2.52a2.75 2.75 0 0 0 0 5.5 2.53 2.53 0 0 1 1 0.2 0.51 0.51 0 0 0 0.45 0 6.46 6.46 0 0 1 7.22 0.39 0.5 0.5 0 0 0 0.79 -0.51A12 12 0 0 0 0 12c0 4.92 4 12 12 12a11.93 11.93 0 0 0 4.07 -0.71 0.52 0.52 0 0 0 0.31 -0.35 0.53 0.53 0 0 0 -0.1 -0.45c-0.22 -0.25 -0.44 -0.49 -0.67 -0.81\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 10a5 5 0 0 0 -5 5c0 3.17 4.46 7.66 4.65 7.85a0.48 0.48 0 0 0 0.7 0C19.54 22.66 24 18.17 24 15a5 5 0 0 0 -5 -5m0 6.75A1.75 1.75 0 1 1 20.75 15 1.76 1.76 0 0 1 19 16.75\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/login", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Login--Streamline-Ultimate\"> <path d=\"M15.09 13.5a0.5 0.5 0 0 0 -0.5 0.5v3.6a1 1 0 0 1 -0.57 0.9 1 1 0 0 1 -1.02 -0.12l-7 -5.6a1 1 0 0 1 0 -1.56l7 -5.6a1 1 0 0 1 1.63 0.78V10a0.5 0.5 0 0 0 0.5 0.5h8.32a0.51 0.51 0 0 0 0.5 -0.58A12 12 0 0 0 12 0a12 12 0 0 0 0.07 24 12 12 0 0 0 11.82 -9.92 0.51 0.51 0 0 0 -0.51 -0.58Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
