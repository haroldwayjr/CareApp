
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

const BATCH = [{"setName": "icon/misc/moon", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Astrology-Moon--Streamline-Ultimate\"> <path d=\"M10 0a12 12 0 0 0 -7.89 3 0.52 0.52 0 0 0 -0.11 0.54 0.51 0.51 0 0 0 0.57 0.25 8.46 8.46 0 1 1 0 16.42 0.51 0.51 0 0 0 -0.57 0.25 0.52 0.52 0 0 0 0.12 0.61A12 12 0 1 0 10 0\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/misc/mouse", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Mouse--Streamline-Ultimate\"> <path d=\"M23 1.32a1 1 0 0 0 -1 1V8c0 2.08 -1.2 3 -2.4 3s-2.39 -0.93 -2.39 -3V5.63c0 -4.17 -3.59 -5.63 -6 -5.63 -2.72 0 -5.48 1.64 -5.69 4.77a0.25 0.25 0 0 1 -0.25 0.23H3.5A3.5 3.5 0 0 0 0 8.5v9a6.5 6.5 0 0 0 13 0v-9A3.5 3.5 0 0 0 9.5 5H7.79a0.27 0.27 0 0 1 -0.19 -0.08 0.25 0.25 0 0 1 -0.06 -0.2C7.79 2.86 9.55 2 11.22 2c0.39 0 4 0.14 4 3.63V8c0 3.29 2.21 5 4.39 5S24 11.28 24 8V2.32a1 1 0 0 0 -1 -1M8 11.11a1.45 1.45 0 0 1 -1.5 1.39A1.45 1.45 0 0 1 5 11.11V8.89A1.45 1.45 0 0 1 6.5 7.5 1.45 1.45 0 0 1 8 8.89Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
