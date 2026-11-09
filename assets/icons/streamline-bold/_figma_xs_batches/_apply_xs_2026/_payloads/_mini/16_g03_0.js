
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

const BATCH = [{"setName": "icon/commerce/bank", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Blood-Bank--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M8.166 10.797a4.03 4.03 0 0 0 1.262 -2.913c0 -3.501 -3.691 -7.62 -4.31 -7.62 -0.618 0 -4.31 4.119 -4.31 7.62a4.03 4.03 0 0 0 1.263 2.913 4.413 4.413 0 0 0 3.048 1.206 4.413 4.413 0 0 0 3.047 -1.206m0.513 1.528v2.673H8.67v3.655a0.75 0.75 0 0 1 -1.5 0v-3.655l-2.435 0a0.75 0.75 0 0 0 -0.75 0.75v7.4c0 0.415 0.335 0.75 0.75 0.75H9.41l0.018 0h2.815v-3.736a0.5 0.5 0 0 1 0.5 -0.5h2.297a0.5 0.5 0 0 1 0.5 0.5v3.737h2.816l0.015 0h4.678a0.75 0.75 0 0 0 0.75 -0.75v-7.4a0.75 0.75 0 0 0 -0.75 -0.75l-2.46 0v3.654a0.75 0.75 0 0 1 -1.5 0v-4.566c0 -0.056 0.005 -0.11 0.017 -0.162v-3.647a0.75 0.75 0 0 0 -0.75 -0.75h-7.683a5.59 5.59 0 0 1 -1.995 2.797Zm5.95 -0.979h-1.345a0.5 0.5 0 0 0 -0.5 0.5v1.136h-1.2a0.5 0.5 0 0 0 -0.5 0.5v1.346a0.5 0.5 0 0 0 0.5 0.5h1.2v1.137a0.5 0.5 0 0 0 0.5 0.5h1.346a0.5 0.5 0 0 0 0.5 -0.5v-1.137h1.072a0.5 0.5 0 0 0 0.5 -0.5v-1.346a0.5 0.5 0 0 0 -0.5 -0.5H15.13v-1.136a0.5 0.5 0 0 0 -0.5 -0.5Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/commerce/barcode", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Barcode--Streamline-Ultimate\"> <g> <path d=\"M5 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21 3H3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3 -3V6a3 3 0 0 0 -3 -3m1 15a1 1 0 0 1 -1 1H3a1 1 0 0 1 -1 -1V6a1 1 0 0 1 1 -1h18a1 1 0 0 1 1 1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
