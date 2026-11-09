
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

const BATCH = [{"setName": "icon/misc/light.mode", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Light-Mode-Bw--Streamline-Ultimate\"> <g> <path d=\"M24 2a2 2 0 0 0 -2 -2H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2Zm-2 19.5a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-19a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.47 17a0.74 0.74 0 0 0 0.72 0.19 0.73 0.73 0 0 0 0.53 -0.52l0.54 -2a0.25 0.25 0 0 1 0.48 0l0.54 2a0.73 0.73 0 0 0 0.53 0.52 0.63 0.63 0 0 0 0.19 0 0.75 0.75 0 0 0 0.53 -0.22c1.11 -1.11 1.72 -3.22 1.72 -5.95V8.49a0.75 0.75 0 0 0 -1.5 0v2.58a12.08 12.08 0 0 1 -0.25 2.62 0.24 0.24 0 0 1 -0.23 0.2 0.25 0.25 0 0 1 -0.25 -0.18l-0.8 -2.92a0.75 0.75 0 0 0 -1.44 0L14 13.71a0.25 0.25 0 0 1 -0.25 0.18 0.24 0.24 0 0 1 -0.23 -0.2 12.08 12.08 0 0 1 -0.25 -2.62V8.49a0.75 0.75 0 0 0 -1.5 0v2.58c-0.02 2.73 0.59 4.84 1.7 5.93\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 17.24H7a2.75 2.75 0 0 0 2.05 -4.58 0.25 0.25 0 0 1 0 -0.34A2.75 2.75 0 0 0 7 7.74H5.5a0.75 0.75 0 0 0 -0.75 0.75v8a0.76 0.76 0 0 0 0.75 0.75m2.75 -2.75A1.25 1.25 0 0 1 7 15.74h-0.5a0.25 0.25 0 0 1 -0.25 -0.25v-2a0.25 0.25 0 0 1 0.25 -0.25H7a1.25 1.25 0 0 1 1.25 1.25m-2 -5a0.25 0.25 0 0 1 0.25 -0.25H7a1.25 1.25 0 1 1 0 2.5h-0.5a0.25 0.25 0 0 1 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/list", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"List-Add--Streamline-Ultimate\"> <g> <path d=\"M6 2.5h13.5a1 1 0 0 0 0 -2H6a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6 8.5h13.5a1 1 0 0 0 0 -2H6a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10 13.5a1 1 0 0 0 -1 -1H6a1 1 0 0 0 0 2h3a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2.5 0.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2.5 6.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2.5 12.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.5 11a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5m0.75 9a0.75 0.75 0 0 1 -1.5 0v-1.5a0.25 0.25 0 0 0 -0.25 -0.25H15a0.75 0.75 0 0 1 0 -1.5h1.5a0.25 0.25 0 0 0 0.25 -0.25V15a0.75 0.75 0 0 1 1.5 0v1.5a0.25 0.25 0 0 0 0.25 0.25H20a0.75 0.75 0 0 1 0 1.5h-1.5a0.25 0.25 0 0 0 -0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
