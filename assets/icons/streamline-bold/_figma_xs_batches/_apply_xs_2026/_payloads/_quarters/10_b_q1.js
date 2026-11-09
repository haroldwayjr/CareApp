
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

const BATCH = [{"setName": "icon/actions/sync", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Synchronize-Arrow-2--Streamline-Ultimate\"> <g> <path d=\"M12.57 1.26a10.8 10.8 0 0 0 -9.75 7.13 0.26 0.26 0 0 1 -0.27 0.17L0.86 8.31a0.52 0.52 0 0 0 -0.49 0.21 0.51 0.51 0 0 0 0 0.53L3 13.75a0.51 0.51 0 0 0 0.4 0.25 0.51 0.51 0 0 0 0.42 -0.15l3.77 -3.74a0.5 0.5 0 0 0 -0.28 -0.85L5.59 9a0.29 0.29 0 0 1 -0.18 -0.13 0.24 0.24 0 0 1 0 -0.22 8.32 8.32 0 0 1 7.26 -4.9 8.25 8.25 0 1 1 0.61 16.49 1.25 1.25 0 1 0 0.09 2.49 10.75 10.75 0 1 0 -0.79 -21.48Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.46 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/trash", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bin--Streamline-Ultimate\"> <g> <path d=\"M19.5 7.5h-15A0.5 0.5 0 0 0 4 8v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V8a0.5 0.5 0 0 0 -0.5 -0.5Zm-9.25 13a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Zm5 0a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 4h-4.75a0.25 0.25 0 0 1 -0.25 -0.25V2.5A2.5 2.5 0 0 0 14.5 0h-5A2.5 2.5 0 0 0 7 2.5v1.25a0.25 0.25 0 0 1 -0.25 0.25H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0 -2ZM9 3.75V2.5a0.5 0.5 0 0 1 0.5 -0.5h5a0.5 0.5 0 0 1 0.5 0.5v1.25a0.25 0.25 0 0 1 -0.25 0.25h-5.5A0.25 0.25 0 0 1 9 3.75Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/undo", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Undo--Streamline-Ultimate\"> <path d=\"M17.79 3.77a12.54 12.54 0 0 0 -13 -0.86 0.24 0.24 0 0 1 -0.29 -0.05L1.94 0.27a0.53 0.53 0 0 0 -0.55 -0.11 0.51 0.51 0 0 0 -0.31 0.46v6.7a0.51 0.51 0 0 0 0.5 0.5h6.7a0.5 0.5 0 0 0 0.46 -0.31 0.49 0.49 0 0 0 -0.11 -0.51L6.78 5.11a0.22 0.22 0 0 1 -0.06 -0.22 0.23 0.23 0 0 1 0.15 -0.18 9.94 9.94 0 0 1 9.46 1.1 9.74 9.74 0 0 1 0.1 15.8 1.25 1.25 0 0 0 -0.27 1.75 1.22 1.22 0 0 0 1 0.51 1.25 1.25 0 0 0 0.73 -0.24 12.25 12.25 0 0 0 -0.11 -19.86Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/upload", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Upload-Menu--Streamline-Ultimate\"> <g> <path d=\"M16.42 16.38a1 1 0 0 0 -0.21 -1.09l-3.5 -3.5a1 1 0 0 0 -1.42 0l-3.5 3.5a1 1 0 0 0 -0.21 1.09 1 1 0 0 0 0.92 0.62h1.75a0.25 0.25 0 0 1 0.25 0.25v5.25a1.5 1.5 0 0 0 3 0v-5.25a0.25 0.25 0 0 1 0.25 -0.25h1.75a1 1 0 0 0 0.92 -0.62Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 2h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 5.5h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 9h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/check.circle", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Circle-1--Streamline-Ultimate\"> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm6.93 8.2 -6.85 9.29a1 1 0 0 1 -1.43 0.19l-4.89 -3.91a1 1 0 0 1 -0.15 -1.41A1 1 0 0 1 7 12.21l4.08 3.26L17.32 7a1 1 0 0 1 1.39 -0.21 1 1 0 0 1 0.22 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
