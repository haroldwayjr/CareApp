
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

const BATCH = [{"setName":"icon/actions/check","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-1--Streamline-Ultimate\"> <path d=\"M23.37 0.29a1.49 1.49 0 0 0 -2.09 0.34L7.25 20.2l-4.69 -4.69a1.5 1.5 0 0 0 -2.12 2.12l5.93 5.94a1.53 1.53 0 0 0 2.28 -0.19l15.07 -21a1.49 1.49 0 0 0 -0.35 -2.09Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"},{"setName":"icon/actions/clear","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Clear-Notification--Streamline-Ultimate\"> <g> <path d=\"M15 17.5a1 1 0 0 0 -1 1V20H2V3h12v1.5a1 1 0 0 0 2 0V3a3 3 0 0 0 -3 -3H3a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-2.5a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M4.5 7H15s0.5 0 0.5 0.5V10s0 0.5 -0.5 0.5H4.5s-0.5 0 -0.5 -0.5V7.5s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 12.5H16s0.5 0 0.5 0.5v2.5s0 0.5 -0.5 0.5H5.5s-0.5 0 -0.5 -0.5V13s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.5 7.75a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.5 11.5a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.25 14.5h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
