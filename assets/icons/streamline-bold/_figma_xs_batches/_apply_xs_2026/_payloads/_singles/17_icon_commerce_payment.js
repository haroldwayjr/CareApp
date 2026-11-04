
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

const setName = "icon/commerce/payment";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Credit-Card-Payment--Streamline-Ultimate\"> <g> <path d=\"M3.93 5.6a1 1 0 0 0 1 -1V3.05A0.24 0.24 0 0 1 5 2.84a0.25 0.25 0 0 1 0.25 0l0.18 0.09a1 1 0 0 0 1 -0.06l0.78 -0.53a0.28 0.28 0 0 1 0.28 0l0.79 0.53a1 1 0 0 0 1 0.06l0.18 -0.09a0.23 0.23 0 0 1 0.24 0 0.24 0.24 0 0 1 0.12 0.21v1.57a1 1 0 1 0 2 0V1.85A1.47 1.47 0 0 0 9.63 0.54L9 0.85a0.25 0.25 0 0 1 -0.25 0L8.16 0.43a1.45 1.45 0 0 0 -1.62 0l-0.61 0.4a0.25 0.25 0 0 1 -0.25 0L5.07 0.54A1.47 1.47 0 0 0 3 1.85v2.77a1 1 0 0 0 0.93 0.98\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.5 2.29h-3.64a0.25 0.25 0 0 0 -0.25 0.25V12.8a0.25 0.25 0 0 0 0.25 0.25h3.64a1 1 0 0 0 1 -1V3.29a1 1 0 0 0 -1 -1M22 5.71a0.49 0.49 0 0 1 -1 0V4.24a0.49 0.49 0 0 1 1 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.63 2.54a0.25 0.25 0 0 0 -0.25 -0.25h-0.71a1 1 0 0 0 -1 1v8.76a1 1 0 0 0 1 1h0.71a0.25 0.25 0 0 0 0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.54 19.41h-0.73a0.25 0.25 0 0 1 -0.25 -0.25V16a1 1 0 1 0 -1.95 0v3.17a0.25 0.25 0 0 1 -0.25 0.25h-0.73a0.5 0.5 0 0 0 -0.35 0.84l2 2a0.5 0.5 0 0 0 0.35 0.14 0.49 0.49 0 0 0 0.34 -0.14l2 -2a0.5 0.5 0 0 0 -0.35 -0.84Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.27 6.33H3.44A2.94 2.94 0 0 0 0.5 9.27v11.61a2.87 2.87 0 0 0 2.79 2.94h8.13a2.87 2.87 0 0 0 2.78 -2.94V9.27a2.94 2.94 0 0 0 -2.93 -2.94m0.49 14h-1a0.74 0.74 0 1 1 0 -1.47h1a0.74 0.74 0 0 1 0 1.47m-3.92 -3.48h-1a0.73 0.73 0 1 1 0 -1.46h1a0.73 0.73 0 1 1 0 1.46m0.73 2.7a0.73 0.73 0 0 1 -0.73 0.73h-1a0.74 0.74 0 0 1 0 -1.47h1a0.73 0.73 0 0 1 0.73 0.74M3 15.39h1a0.73 0.73 0 0 1 0 1.46H3a0.73 0.73 0 1 1 0 -1.46m0 3.42h1a0.74 0.74 0 0 1 0 1.47H3a0.74 0.74 0 1 1 0 -1.47m8.81 -2h-1a0.73 0.73 0 1 1 0 -1.46h1a0.73 0.73 0 1 1 0 1.46M2.46 9.27a1 1 0 0 1 1 -1h7.83a1 1 0 0 1 1 1v1.94a1 1 0 0 1 -1 1H3.46a1 1 0 0 1 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
