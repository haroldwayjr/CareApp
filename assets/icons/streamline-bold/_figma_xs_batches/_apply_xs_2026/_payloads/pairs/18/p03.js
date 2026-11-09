
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

const BATCH = [{"setName": "icon/media/playlist", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Playlist--Streamline-Ultimate\"> <g> <path d=\"M18 2H6a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V4a2 2 0 0 0 -2 -2m-3.54 7 -3.41 1.1c-0.21 0 -0.3 0.15 -0.3 0.27v4.92A1.75 1.75 0 1 1 9 13.5h0.15a0.11 0.11 0 0 0 0.07 0 0.09 0.09 0 0 0 0 -0.07v-3.1a1.75 1.75 0 0 1 1.43 -1.72l3.41 -1.1a1.74 1.74 0 0 1 2.19 1.69v4.05a1.75 1.75 0 1 1 -1.75 -1.75 0.24 0.24 0 0 0 0.25 -0.25V9.2a0.25 0.25 0 0 0 -0.29 -0.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 6a1 1 0 0 0 -1 1v10.5a1 1 0 0 0 2 0V7a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 6a1 1 0 0 0 -1 1v10.5a1 1 0 0 0 2 0V7a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/record", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Record--Streamline-Ultimate\"> <g> <path d=\"M15 12.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2m-5 16.5a4 4 0 0 1 -3.46 -6h-3.08A4 4 0 1 1 7 8.5h10a4 4 0 0 1 0 8\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5 12.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
