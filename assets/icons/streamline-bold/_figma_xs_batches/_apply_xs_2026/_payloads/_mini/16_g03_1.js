
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

const BATCH = [{"setName": "icon/commerce/cart", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shopping-Cart--Streamline-Ultimate\"> <g> <path d=\"M3.75 21.75a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 21.75a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 0h-2.32a1.5 1.5 0 0 0 -1.48 1.25l-2.76 15.29a0.26 0.26 0 0 1 -0.25 0.21H5a0.5 0.5 0 0 1 0 -1h7.76a2.5 2.5 0 0 0 0 -5H3.5a0.5 0.5 0 0 1 0 -1h10.75a2.5 2.5 0 0 0 0 -5H1a1 1 0 0 0 0 2h13.25a0.5 0.5 0 0 1 0 1H3.5a2.5 2.5 0 0 0 0 5h9.26a0.5 0.5 0 0 1 0 1H5a2.5 2.5 0 0 0 0 5h11.82a1.5 1.5 0 0 0 1.48 -1.25l2.76 -15.29a0.26 0.26 0 0 1 0.25 -0.21H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/commerce/chart.bar", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Analytics-Bars--Streamline-Ultimate\"> <g> <path d=\"M1.25 17h3.5a0.25 0.25 0 0 0 0.25 -0.25v-2a1 1 0 0 0 -1 -1H2a1 1 0 0 0 -1 1v2a0.25 0.25 0 0 0 0.25 0.25\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8 8.75a1 1 0 0 0 -1 1v7a0.25 0.25 0 0 0 0.25 0.25h3.5a0.25 0.25 0 0 0 0.25 -0.25v-7a1 1 0 0 0 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14 10.75a1 1 0 0 0 -1 1v5a0.25 0.25 0 0 0 0.25 0.25h3.5a0.25 0.25 0 0 0 0.25 -0.25v-5a1 1 0 0 0 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.25 17h3.5a0.25 0.25 0 0 0 0.25 -0.25v-12a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v12a0.25 0.25 0 0 0 0.25 0.25\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 20.25h22a1 1 0 0 0 1 -1 1 1 0 0 0 -0.56 -0.9 1.05 1.05 0 0 0 -0.44 -0.1H1a1.05 1.05 0 0 0 -0.44 0.1 1 1 0 0 0 -0.56 0.9 1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
