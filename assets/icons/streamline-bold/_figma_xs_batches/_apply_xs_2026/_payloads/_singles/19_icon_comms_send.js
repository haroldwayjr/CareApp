
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

const setName = "icon/comms/send";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Send-Email-2--Streamline-Ultimate\"> <g> <path d=\"M23 0.64a0.49 0.49 0 0 0 -0.17 -0.51 0.51 0.51 0 0 0 -0.54 0L1.78 10.82A1.45 1.45 0 0 0 1 12.05a1.48 1.48 0 0 0 0.68 1.3l4.56 2.88a0.24 0.24 0 0 0 0.3 0L18.7 5.34a0.25 0.25 0 0 1 0.37 0.34L9.35 17.86a0.25 0.25 0 0 0 -0.06 0.2 0.3 0.3 0 0 0 0.12 0.17l6.43 4.07a1.48 1.48 0 0 0 1.32 0.11 1.43 1.43 0 0 0 0.87 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.88 19.18a0.25 0.25 0 0 0 -0.25 0 0.26 0.26 0 0 0 -0.13 0.22V23a1 1 0 0 0 1 1 1 1 0 0 0 0.71 -0.3l2 -2a0.27 0.27 0 0 0 0.07 -0.21 0.25 0.25 0 0 0 -0.12 -0.18Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
