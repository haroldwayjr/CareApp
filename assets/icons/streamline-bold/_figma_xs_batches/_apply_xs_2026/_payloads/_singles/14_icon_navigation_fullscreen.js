
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

const setName = "icon/navigation/fullscreen";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Expand-Full--Streamline-Ultimate\"> <g> <path d=\"M23.75 2.45a2.21 2.21 0 0 0 -2.2 -2.2h-5.73a1.25 1.25 0 0 0 0 2.5H21a0.25 0.25 0 0 1 0.25 0.25v3.27a1.25 1.25 0 0 0 2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.25 6.27a1.25 1.25 0 0 0 2.5 0V3A0.25 0.25 0 0 1 3 2.75h5.18a1.25 1.25 0 0 0 0 -2.5H2.45a2.21 2.21 0 0 0 -2.2 2.2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.75 21.54v-3.81a1.25 1.25 0 0 0 -2.5 0V21a0.25 0.25 0 0 1 -0.25 0.25h-5.18a1.25 1.25 0 0 0 0 2.5h5.73a2.21 2.21 0 0 0 2.2 -2.21Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.25 21.54a2.21 2.21 0 0 0 2.2 2.21h5.73a1.25 1.25 0 0 0 0 -2.5H3a0.25 0.25 0 0 1 -0.25 -0.25v-3.27a1.25 1.25 0 0 0 -2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.22 8.14h9.55s1.95 0 1.95 1.95v3.83s0 1.95 -1.95 1.95H7.22s-1.95 0 -1.95 -1.95v-3.83s0 -1.95 1.95 -1.95\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
