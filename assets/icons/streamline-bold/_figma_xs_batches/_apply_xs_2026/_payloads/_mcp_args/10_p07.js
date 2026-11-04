
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

const BATCH = [{"setName": "icon/actions/swap", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Exchange--Streamline-Ultimate\"> <g> <path d=\"M13 10.5a3 3 0 0 1 1.57 0.46c0.1 0.06 0.34 0.1 0.38 -0.09a1.5 1.5 0 0 0 0.05 -0.37v-7A1.5 1.5 0 0 0 13.5 2h-7a0.49 0.49 0 0 1 -0.4 -0.2L5.2 0.6A1.49 1.49 0 0 0 4 0H1.5A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h6.28a0.25 0.25 0 0 0 0.22 -0.11 3 3 0 0 1 2.5 -1.39Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.5 14h-7a0.48 0.48 0 0 1 -0.4 -0.2l-0.9 -1.2A1.49 1.49 0 0 0 13 12h-2.5A1.5 1.5 0 0 0 9 13.5v9a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5 -1.5v-7a1.5 1.5 0 0 0 -1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.35 17.15a0.48 0.48 0 0 0 -0.54 -0.15 0.5 0.5 0 0 0 -0.31 0.46v1a0.25 0.25 0 0 1 -0.25 0.25H2.5a0.76 0.76 0 0 1 -0.75 -0.71v-1.5a0.76 0.76 0 0 0 -0.75 -0.75 0.76 0.76 0 0 0 -0.75 0.75V18a2.25 2.25 0 0 0 2.25 2.25h1.75a0.25 0.25 0 0 1 0.25 0.25v1a0.5 0.5 0 0 0 0.31 0.46A0.43 0.43 0 0 0 5 22a0.47 0.47 0 0 0 0.35 -0.15l2 -2a0.48 0.48 0 0 0 0 -0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.65 6.85A0.47 0.47 0 0 0 19 7a0.43 0.43 0 0 0 0.19 0 0.5 0.5 0 0 0 0.31 -0.46v-1a0.25 0.25 0 0 1 0.25 -0.25h1.75a0.76 0.76 0 0 1 0.75 0.75V7.5a0.75 0.75 0 0 0 1.5 0V6a2.25 2.25 0 0 0 -2.25 -2.25h-1.75a0.25 0.25 0 0 1 -0.25 -0.25v-1a0.5 0.5 0 0 0 -0.31 -0.5 0.48 0.48 0 0 0 -0.54 0.11l-2 2a0.48 0.48 0 0 0 0 0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/sync", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Synchronize-Arrow-2--Streamline-Ultimate\"> <g> <path d=\"M12.57 1.26a10.8 10.8 0 0 0 -9.75 7.13 0.26 0.26 0 0 1 -0.27 0.17L0.86 8.31a0.52 0.52 0 0 0 -0.49 0.21 0.51 0.51 0 0 0 0 0.53L3 13.75a0.51 0.51 0 0 0 0.4 0.25 0.51 0.51 0 0 0 0.42 -0.15l3.77 -3.74a0.5 0.5 0 0 0 -0.28 -0.85L5.59 9a0.29 0.29 0 0 1 -0.18 -0.13 0.24 0.24 0 0 1 0 -0.22 8.32 8.32 0 0 1 7.26 -4.9 8.25 8.25 0 1 1 0.61 16.49 1.25 1.25 0 1 0 0.09 2.49 10.75 10.75 0 1 0 -0.79 -21.48Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.46 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];

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
