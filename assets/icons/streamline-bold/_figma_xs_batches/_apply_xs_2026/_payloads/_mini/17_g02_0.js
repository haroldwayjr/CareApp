
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

const BATCH = [{"setName": "icon/commerce/store", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shop-Open--Streamline-Ultimate\"> <g> <path d=\"M3 19.92a2.37 2.37 0 0 0 2.37 -2.38v-3a2.38 2.38 0 0 0 -4.75 0v3A2.38 2.38 0 0 0 3 19.92m-0.63 -2.38v-3a0.63 0.63 0 0 1 1.25 0v3a0.63 0.63 0 1 1 -1.25 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.5 12.17a0.87 0.87 0 0 0 -0.88 0.87v1.24a0.25 0.25 0 0 1 -0.47 0.11l-0.87 -1.74a0.87 0.87 0 0 0 -1 -0.46 0.88 0.88 0 0 0 -0.68 0.85v6a0.88 0.88 0 1 0 1.75 0v-1.23a0.24 0.24 0 0 1 0.2 -0.24 0.25 0.25 0 0 1 0.28 0.13l0.87 1.74a0.86 0.86 0 0 0 0.78 0.48l0.2 0a0.89 0.89 0 0 0 0.67 -0.86V13a0.87 0.87 0 0 0 -0.85 -0.83\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.37 14a0.13 0.13 0 0 1 0.13 -0.12h2a0.88 0.88 0 0 0 0 -1.75h-2A1.88 1.88 0 0 0 12.62 14v4a1.88 1.88 0 0 0 1.88 1.88h2a0.88 0.88 0 0 0 0 -1.75h-2a0.13 0.13 0 0 1 -0.13 -0.13v-0.87a0.25 0.25 0 0 1 0.25 -0.25h0.88a0.88 0.88 0 0 0 0 -1.75h-0.88a0.25 0.25 0 0 1 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.5 19.92a0.87 0.87 0 0 0 0.87 -0.92v-1.83a0.25 0.25 0 0 1 0.25 -0.25H9a2.38 2.38 0 0 0 0 -4.75H7.5a0.87 0.87 0 0 0 -0.88 0.87v6a0.87 0.87 0 0 0 0.88 0.88m0.87 -5.75a0.25 0.25 0 0 1 0.25 -0.25H9a0.63 0.63 0 0 1 0 1.25h-0.38a0.25 0.25 0 0 1 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.5 22h-17a1 1 0 0 0 0 2h17a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.75 5.48a0.13 0.13 0 0 0 0 -0.06c-0.12 -0.42 -1.2 -4.33 -1.44 -5.24a0.26 0.26 0 0 0 -0.25 -0.18H13a0.25 0.25 0 0 0 -0.25 0.25v9.36a0.25 0.25 0 0 0 0.14 0.23 4.81 4.81 0 0 0 2.47 0.46 4.91 4.91 0 0 0 2.38 -0.85Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M24 5.07 22.24 1a1.51 1.51 0 0 0 -1.36 -1h-2.75a0.24 0.24 0 0 0 -0.19 0.1 0.25 0.25 0 0 0 -0.05 0.22l1.33 4.83a0.64 0.64 0 0 1 0 0.2v3.57a0.25 0.25 0 0 0 0.16 0.23 3.34 3.34 0 0 0 4.59 -3v-0.88a0.74 0.74 0 0 0 0.03 -0.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.25 0.25A0.25 0.25 0 0 0 11 0H7.93a0.26 0.26 0 0 0 -0.24 0.18C7.45 1.09 6.37 5 6.26 5.42a0.13 0.13 0 0 0 0 0.06V9.3a0.24 0.24 0 0 0 0.11 0.21 4.94 4.94 0 0 0 2.29 0.79h0.4a4.68 4.68 0 0 0 2.06 -0.47 0.26 0.26 0 0 0 0.14 -0.23Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M4.75 5.35a1.23 1.23 0 0 1 0 -0.2L6.1 0.32a0.24 0.24 0 0 0 0 -0.22 0.26 0.26 0 0 0 -0.2 -0.1H3.12a1.51 1.51 0 0 0 -1.36 1L0 5.07a0.79 0.79 0 0 0 0 0.2v0.91A3.24 3.24 0 0 0 2 9.1a3.31 3.31 0 0 0 2.6 0.05 0.25 0.25 0 0 0 0.16 -0.23Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/commerce/wallet", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Money-Wallet--Streamline-Ultimate\"> <g> <path d=\"M19.62 18.5a3.75 3.75 0 0 1 0 -7.5h2.26a0.25 0.25 0 0 0 0.24 -0.25v-2.5a2.5 2.5 0 0 0 -2.5 -2.5h-17a2.51 2.51 0 0 0 -2.5 2.5v13a2.51 2.51 0 0 0 2.5 2.5h17a2.5 2.5 0 0 0 2.5 -2.5v-2.5a0.25 0.25 0 0 0 -0.24 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.62 12.5h-3a2.25 2.25 0 0 0 0 4.5h3a1.51 1.51 0 0 0 1.26 -1.5V14a1.51 1.51 0 0 0 -1.26 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.81 1.18a1.21 1.21 0 0 0 -0.56 -0.76 1.24 1.24 0 0 0 -0.94 -0.13L5.44 3.76a0.24 0.24 0 0 0 -0.18 0.24 0.25 0.25 0 0 0 0.24 0.22l14.77 0a0.24 0.24 0 0 0 0.19 -0.1 0.23 0.23 0 0 0 0.05 -0.12Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
