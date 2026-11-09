
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

const BATCH = [{"setName": "icon/misc/coffee", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Coffee-Jar--Streamline-Ultimate\"> <g> <path d=\"M5.5 3.5h13A0.5 0.5 0 0 0 19 3V1.5A1.5 1.5 0 0 0 17.5 0h-11A1.5 1.5 0 0 0 5 1.5V3a0.5 0.5 0 0 0 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m21 10.31 -2 -5a0.49 0.49 0 0 0 -0.5 -0.31h-13a0.49 0.49 0 0 0 -0.5 0.31l-2 5a0.43 0.43 0 0 0 0 0.19v11A2.5 2.5 0 0 0 5.5 24h13a2.5 2.5 0 0 0 2.5 -2.5v-11a0.43 0.43 0 0 0 0 -0.19M9.52 19.08a0.25 0.25 0 0 1 -0.34 0c-1.37 -1.35 -1.6 -3.94 -0.41 -6.31a5.81 5.81 0 0 1 4.79 -3.5 0.25 0.25 0 0 1 0.24 0.16 0.27 0.27 0 0 1 -0.08 0.28c-1.93 1.54 -2 3.55 -2.1 5.21 -0.17 3.58 -1.09 3.28 -2.1 4.16m6.71 -2.59A5.92 5.92 0 0 1 11.66 20a0.26 0.26 0 0 1 -0.24 -0.16 0.23 0.23 0 0 1 0.06 -0.28c1.48 -1.31 1.57 -3 1.64 -4.57 0.16 -3.57 1 -3.56 2.47 -4.72a0.25 0.25 0 0 1 0.34 0c1.27 1.4 1.45 3.91 0.3 6.22\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/ecology", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Ecology-Leaf--Streamline-Ultimate\"> <path d=\"M23.74 3.16a1 1 0 0 0 -0.6 -0.76 1 1 0 0 0 -1 0.1 13.5 13.5 0 0 1 -7.66 2C8.34 4.45 5.76 7 5.71 7a8.11 8.11 0 0 0 -3.28 6.49A8 8 0 0 0 3 16.57a0.51 0.51 0 0 1 -0.1 0.53L0.27 20a1 1 0 0 0 0 1.42 1 1 0 0 0 1.32 0.05C3.35 19.9 6.15 15.2 14 11.91a1 1 0 0 1 0.78 1.86 26.18 26.18 0 0 0 -8.43 5.54l-0.24 0.25A0.51 0.51 0 0 0 6 20a0.5 0.5 0 0 0 0.24 0.36 8 8 0 0 0 4.26 1.22A12.21 12.21 0 0 0 16.27 20C25 15.17 24.2 5.89 23.74 3.16\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
