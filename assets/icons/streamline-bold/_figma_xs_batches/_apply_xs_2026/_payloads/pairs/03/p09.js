
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

const BATCH = [{"setName": "icon/misc/barcode.scan", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Barcode-Scan--Streamline-Ultimate\"> <g> <path d=\"M1 8a1 1 0 0 0 1 -1l0 -1.74a0.27 0.27 0 0 1 0 -0.18 0.25 0.25 0 0 1 0.21 -0.08h1.66a1 1 0 0 0 0 -2H2a2 2 0 0 0 -2 2v2a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.87 19H2.25a0.25 0.25 0 0 1 -0.25 -0.25V17a1 1 0 0 0 -2 0v2a2 2 0 0 0 2 2h1.87a1 1 0 1 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 16a1 1 0 0 0 -1 1l0 1.74a0.27 0.27 0 0 1 -0.07 0.18 0.25 0.25 0 0 1 -0.18 0.08h-1.62a1 1 0 1 0 0 2H22a2 2 0 0 0 2 -2v-2a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 3h-1.87a1 1 0 0 0 0 2h1.62a0.25 0.25 0 0 1 0.25 0.25V7a1 1 0 0 0 2 0V5a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20 15.5V8a1 1 0 0 0 -2 0v7.5a1 1 0 0 0 2 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/battery.low", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Charging-Battery-Low-1--Streamline-Ultimate\"> <path d=\"M22.5 9H21V7.5A1.5 1.5 0 0 0 19.5 6h-18A1.5 1.5 0 0 0 0 7.5v9A1.5 1.5 0 0 0 1.5 18h18a1.5 1.5 0 0 0 1.5 -1.5V15h1.5a1.5 1.5 0 0 0 1.5 -1.5v-3A1.5 1.5 0 0 0 22.5 9m-13 0.5v5a0.5 0.5 0 0 1 -0.5 0.5H7.5a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5H9a0.5 0.5 0 0 1 0.5 0.5m-4 0v5a0.5 0.5 0 0 1 -0.5 0.5H3.5a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5H5a0.5 0.5 0 0 1 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
