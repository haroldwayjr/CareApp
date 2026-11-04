
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

const BATCH = [{"setName": "icon/files/portfolio", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M13.5 1.25c1.6569 0 3 1.34315 3 3v1.5h4c1.933 0 3.5 1.567 3.5 3.5v10c0 1.933 -1.567 3.5 -3.5 3.5h-17c-1.933 0 -3.5 -1.567 -3.5 -3.5v-10c1.289e-7 -1.933 1.567 -3.5 3.5 -3.5h4v-1.5c0 -1.65685 1.34315 -3 3 -3zm-1.5 13c-2.77614 0 -5 2.2239 -5 5 0 0.2761 0.22386 0.5 0.5 0.5h9c0.2761 0 0.5 -0.2239 0.5 -0.5 0 -2.7761 -2.2239 -5 -5 -5m0 -6c-1.3807 0 -2.5 1.11929 -2.5 2.5 0 1.3807 1.1193 2.5 2.5 2.5s2.5 -1.1193 2.5 -2.5c0 -1.38071 -1.1193 -2.5 -2.5 -2.5m-1.5 -5c-0.55228 0 -1 0.44772 -1 1v1.5h5v-1.5c0 -0.55228 -0.4477 -1 -1 -1z\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/postcard", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Envelope-Postcard--Streamline-Ultimate\"> <g> <path d=\"M22 7.25H2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2m-1 3.5v4a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.5 -0.5v-4a0.5 0.5 0 0 1 0.5 -0.5h4a0.5 0.5 0 0 1 0.5 0.5M4.5 17h9a0.75 0.75 0 0 1 0 1.5h-9a0.75 0.75 0 0 1 0 -1.5m-0.75 -2.75a0.76 0.76 0 0 1 0.75 -0.75h2a0.75 0.75 0 0 1 0 1.5h-2a0.76 0.76 0 0 1 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.5 5.75h17a1 1 0 0 0 0 -2h-17a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 2.75h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];

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
