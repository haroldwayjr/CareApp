
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

const BATCH = [{"setName": "icon/actions/power", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Power-Button--Streamline-Ultimate\"> <g> <path d=\"M10.5 10.92a1.5 1.5 0 1 0 3 0V1.5a1.5 1.5 0 0 0 -3 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.2 11.53a10.92 10.92 0 0 0 18.52 9.28 10.83 10.83 0 0 0 3.08 -9.28 11 11 0 0 0 -5.73 -8.13A1.5 1.5 0 1 0 15.63 6a8 8 0 0 1 4.2 6 7.84 7.84 0 0 1 -2.23 6.73 7.92 7.92 0 0 1 -11.2 0A7.83 7.83 0 0 1 4.17 12a8 8 0 0 1 4.19 -6 1.5 1.5 0 0 0 -1.44 -2.6 11 11 0 0 0 -5.72 8.13Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/print", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Printer--Streamline-Ultimate\"> <g> <path d=\"M15 18.61a0.48 0.48 0 0 1 -0.49 0.49h-3.7a0.49 0.49 0 1 1 0 -1h3.7a0.48 0.48 0 0 1 0.49 0.51Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.29 20.57a0.49 0.49 0 0 1 -0.49 0.49H8.71a0.49 0.49 0 0 1 0 -1h6.09a0.49 0.49 0 0 1 0.49 0.51Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.29 11.51a1 1 0 0 0 -1 -1H2.69a1 1 0 0 0 -1 1v5.88a1 1 0 0 0 1 1h2.92l-1.18 4.7a0.75 0.75 0 0 0 0.13 0.63 0.74 0.74 0 0 0 0.58 0.28h13.23a0.74 0.74 0 0 0 0.58 -0.28 0.71 0.71 0 0 0 0.13 -0.63l-1.18 -4.72h3.41a1 1 0 0 0 1 -1Zm-15.58 11a0.51 0.51 0 0 1 -0.39 -0.19 0.48 0.48 0 0 1 -0.08 -0.42l1.34 -5.39a0.5 0.5 0 0 1 0.48 -0.37h7.39a0.5 0.5 0 0 1 0.48 0.37l1.34 5.39a0.48 0.48 0 0 1 -0.08 0.42 0.51 0.51 0 0 1 -0.39 0.19Zm12.64 -8.82a0.74 0.74 0 1 1 0.73 -0.73 0.74 0.74 0 0 1 -0.73 0.75Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.26 6.25a1 1 0 0 0 -0.91 -0.62h-2.21V2.69a0.73 0.73 0 0 0 -0.21 -0.52L15 0.22a0.74 0.74 0 0 0 -0.55 -0.22H7.59a0.73 0.73 0 0 0 -0.73 0.73v4.9H4.65a1 1 0 0 0 -0.91 0.62L2.52 9.3a0.2 0.2 0 0 0 0 0.17 0.19 0.19 0 0 0 0.15 0.08h18.64a0.19 0.19 0 0 0 0.15 -0.08 0.2 0.2 0 0 0 0 -0.17ZM8.33 2a0.49 0.49 0 0 1 0.49 -0.49h5.12a0.5 0.5 0 0 1 0.35 0.14l1.24 1.24a0.52 0.52 0 0 1 0.14 0.35v3.13a0.49 0.49 0 0 1 -0.49 0.49H8.82a0.49 0.49 0 0 1 -0.49 -0.49Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];

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
