
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

const BATCH = [{"setName": "icon/misc/watch", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Watch-Time--Streamline-Ultimate\"> <g> <path d=\"M20 12a8 8 0 0 0 -4 -6.92V1.5A1.5 1.5 0 0 0 14.5 0h-5A1.5 1.5 0 0 0 8 1.5v3.58a8 8 0 0 0 0 13.85v3.57A1.5 1.5 0 0 0 9.5 24h5a1.5 1.5 0 0 0 1.5 -1.5v-3.57A8 8 0 0 0 20 12m-8 6a6 6 0 1 1 6 -6 6 6 0 0 1 -6 6\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12.75 11.69V9a0.75 0.75 0 0 0 -1.5 0v3a0.75 0.75 0 0 0 0.22 0.53L14 15a0.76 0.76 0 0 0 1 0 0.75 0.75 0 0 0 0 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/water", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Water-Straw--Streamline-Ultimate\"> <path d=\"M17.91 2h2.34a1 1 0 0 0 0 -2h-2.34a5 5 0 0 0 -4.86 3.84 0.22 0.22 0 0 1 -0.2 0.16h-8.6a1.39 1.39 0 0 0 -1.12 0.51 1.42 1.42 0 0 0 -0.35 1.23c1.52 9.17 0.88 5.32 2.62 15.75A3 3 0 0 0 8.35 24h6.8a3 3 0 0 0 3 -2.51c1.73 -10.43 1.09 -6.59 2.62 -15.73a1.41 1.41 0 0 0 -0.3 -1.18A1.44 1.44 0 0 0 19.25 4h-3.78a0.24 0.24 0 0 1 -0.21 -0.12 0.23 0.23 0 0 1 0 -0.24A3 3 0 0 1 17.91 2m-6.64 9.6a0.25 0.25 0 0 1 -0.3 0.19 3.61 3.61 0 0 1 -2.2 -1.41A1 1 0 0 0 8 10a1 1 0 0 0 -0.8 0.41 3.85 3.85 0 0 1 -1.07 1 0.26 0.26 0 0 1 -0.24 0 0.27 0.27 0 0 1 -0.14 -0.19L4.9 6.29a0.21 0.21 0 0 1 0 -0.2 0.25 0.25 0 0 1 0.24 -0.09h7.1a0.23 0.23 0 0 1 0.19 0.09 0.25 0.25 0 0 1 0.05 0.22Zm5.08 -1.21a1 1 0 0 0 -1.61 0 3.62 3.62 0 0 1 -0.89 0.86 0.26 0.26 0 0 1 -0.29 0 0.26 0.26 0 0 1 -0.1 -0.26l1.1 -4.79a0.25 0.25 0 0 1 0.24 -0.2h3.56a0.25 0.25 0 0 1 0.2 0.09 0.28 0.28 0 0 1 0.05 0.2l-0.81 4.89a0.29 0.29 0 0 1 -0.15 0.19 0.24 0.24 0 0 1 -0.23 0 3.7 3.7 0 0 1 -1.07 -0.98\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
