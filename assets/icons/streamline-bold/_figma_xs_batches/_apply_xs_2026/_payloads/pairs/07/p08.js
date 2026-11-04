
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

const BATCH = [{"setName":"icon/misc/wrench","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wrench--Streamline-Ultimate\"> <path d=\"M23.58 5a0.5 0.5 0 0 0 -0.36 -0.34 0.5 0.5 0 0 0 -0.47 0.13l-3.56 3.55a0.48 0.48 0 0 1 -0.39 0.15l-2.6 -0.24a0.49 0.49 0 0 1 -0.45 -0.45l-0.24 -2.6a0.52 0.52 0 0 1 0.15 -0.4l3.56 -3.55a0.53 0.53 0 0 0 0.13 -0.48 0.48 0.48 0 0 0 -0.35 -0.35 7.17 7.17 0 0 0 -7.13 1.84 7 7 0 0 0 -1.59 7.51 0.5 0.5 0 0 1 -0.11 0.53L0.91 19.56a2.6 2.6 0 0 0 -0.6 2.85 2.52 2.52 0 0 0 4.06 0.76l9.33 -9.34a0.49 0.49 0 0 1 0.53 -0.1 7 7 0 0 0 7.5 -1.57A7.19 7.19 0 0 0 23.58 5\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"},{"setName":"icon/misc/zoom.in","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Zoom-In--Streamline-Ultimate\"> <g> <path d=\"m23.41 20.59 -5.07 -5.08A9.91 9.91 0 0 0 20 10a10 10 0 1 0 -10 10 9.91 9.91 0 0 0 5.51 -1.66l5.08 5.08a2 2 0 0 0 2.82 0 2 2 0 0 0 0 -2.83M10 1.75A8.25 8.25 0 1 1 1.75 10 8.26 8.26 0 0 1 10 1.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10 16.75A6.75 6.75 0 1 0 3.25 10 6.75 6.75 0 0 0 10 16.75M7 9h2V7a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1 -2 0v-2H7a1 1 0 0 1 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
