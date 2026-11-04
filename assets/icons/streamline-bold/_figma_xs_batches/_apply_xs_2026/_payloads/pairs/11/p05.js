
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

const BATCH = [{"setName": "icon/files/cloud.download", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cloud-Download--Streamline-Ultimate\"> <g> <path d=\"M24 10.66a5.82 5.82 0 0 0 -1.77 -4.16 5.7 5.7 0 0 0 -3.45 -1.59 0.25 0.25 0 0 1 -0.19 -0.12 7.68 7.68 0 0 0 -14.1 2.3 0.25 0.25 0 0 1 -0.22 0.19 4.66 4.66 0 0 0 -2.58 1A4.59 4.59 0 0 0 0 11.86a4.33 4.33 0 0 0 1.24 3.21 5.58 5.58 0 0 0 3.6 1.38 1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1 3.36 3.36 0 0 1 -2.17 -0.81A2.35 2.35 0 0 1 2 11.86a2.58 2.58 0 0 1 3.12 -2.53 1 1 0 0 0 0.81 -0.19 1 1 0 0 0 0.39 -0.73 5.68 5.68 0 0 1 10.82 -2.09 1 1 0 0 0 0.94 0.57 3.66 3.66 0 0 1 2.76 1.05A3.74 3.74 0 0 1 22 10.66a3.83 3.83 0 0 1 -3.44 3.79 1 1 0 0 0 0.26 2A5.82 5.82 0 0 0 24 10.66\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 17.45h-1.75a0.25 0.25 0 0 1 -0.25 -0.25V10a1.5 1.5 0 0 0 -3 0v7.2a0.25 0.25 0 0 1 -0.25 0.25H8.5a1 1 0 0 0 -0.71 1.7l3.5 3.5a1 1 0 0 0 1.42 0l3.5 -3.5a1 1 0 0 0 -0.71 -1.7\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/files/cloud.upload", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cloud-Upload--Streamline-Ultimate\"> <g> <path d=\"M24 10.41a5.82 5.82 0 0 0 -1.77 -4.16 5.7 5.7 0 0 0 -3.45 -1.59 0.25 0.25 0 0 1 -0.19 -0.12 7.68 7.68 0 0 0 -14.1 2.3 0.25 0.25 0 0 1 -0.22 0.16 4.66 4.66 0 0 0 -2.58 1A4.59 4.59 0 0 0 0 11.61a4.33 4.33 0 0 0 1.24 3.21 5.58 5.58 0 0 0 3.6 1.38 1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1 3.36 3.36 0 0 1 -2.17 -0.81A2.35 2.35 0 0 1 2 11.61a2.58 2.58 0 0 1 3.12 -2.53 1 1 0 0 0 0.81 -0.19 1 1 0 0 0 0.39 -0.73 5.68 5.68 0 0 1 10.82 -2.09 1 1 0 0 0 0.94 0.57 3.67 3.67 0 0 1 2.76 1.05A3.74 3.74 0 0 1 22 10.41a3.83 3.83 0 0 1 -3.44 3.79 1 1 0 0 0 0.26 2A5.82 5.82 0 0 0 24 10.41\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12.71 9a1 1 0 0 0 -1.42 0l-3.5 3.5a1 1 0 0 0 0.71 1.7h1.75a0.25 0.25 0 0 1 0.25 0.25v7.25a1.5 1.5 0 1 0 3 0v-7.25a0.25 0.25 0 0 1 0.25 -0.25h1.75a1 1 0 0 0 0.71 -1.71Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
