
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

const setName = "icon/navigation/external.link";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Expand--Streamline-Ultimate\"> <g> <path d=\"M23.75 5.79a2.21 2.21 0 0 0 -2.2 -2.2H16.3a1.25 1.25 0 0 0 0 2.5H21a0.25 0.25 0 0 1 0.25 0.25v3.27a1.25 1.25 0 0 0 2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.25 9.61a1.25 1.25 0 0 0 2.5 0V6.34A0.25 0.25 0 0 1 3 6.09h4.7a1.25 1.25 0 0 0 0 -2.5H2.45a2.21 2.21 0 0 0 -2.2 2.2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.75 18.2v-3.81a1.25 1.25 0 0 0 -2.5 0v3.27a0.25 0.25 0 0 1 -0.25 0.25h-4.7a1.25 1.25 0 0 0 0 2.5h5.25a2.21 2.21 0 0 0 2.2 -2.21Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.25 18.2a2.21 2.21 0 0 0 2.2 2.21H7.7a1.25 1.25 0 0 0 0 -2.5H3a0.25 0.25 0 0 1 -0.25 -0.25v-3.27a1.25 1.25 0 0 0 -2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.75 8.61h10.5a2 2 0 0 1 2 2v2.86a2 2 0 0 1 -2 2H6.75a2 2 0 0 1 -2 -2v-2.9a2 2 0 0 1 2 -1.96Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
