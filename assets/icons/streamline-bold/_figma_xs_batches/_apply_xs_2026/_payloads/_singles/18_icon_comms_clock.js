
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

const setName = "icon/comms/clock";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Time-Play-Time-1--Streamline-Ultimate\"> <g> <path d=\"M19.88 12a6.19 6.19 0 1 0 3.7 7.94 6.2 6.2 0 0 0 -3.7 -7.94m-5 3.54a0.52 0.52 0 0 1 0.65 -0.3l0.92 0.34 -0.28 -0.94a0.51 0.51 0 0 1 0.33 -0.63 0.5 0.5 0 0 1 0.62 0.34l0.58 1.9a0.5 0.5 0 0 1 -0.65 0.61l-1.87 -0.68a0.5 0.5 0 0 1 -0.35 -0.68Zm4.81 4.61a2.54 2.54 0 0 1 -1.32 1.45 2.57 2.57 0 0 1 -1.08 0.24 2.41 2.41 0 0 1 -0.88 -0.16 2.56 2.56 0 0 1 -1.53 -3.29 0.5 0.5 0 0 1 0.64 -0.29 0.5 0.5 0 0 1 0.3 0.64 1.55 1.55 0 0 0 0.93 2 1.52 1.52 0 0 0 1.2 -0.05 1.57 1.57 0 0 0 0.8 -0.88 0.51 0.51 0 0 1 0.65 -0.3 0.5 0.5 0 0 1 0.24 0.6Zm1.9 -2.15a0.52 0.52 0 0 1 -0.47 0.33 0.47 0.47 0 0 1 -0.17 0l-1.7 -0.62a0.48 0.48 0 0 1 -0.32 -0.41 0.49 0.49 0 0 1 0.22 -0.48l1.51 -1a0.5 0.5 0 0 1 0.69 0.14 0.51 0.51 0 0 1 -0.14 0.7l-0.68 0.43 0.76 0.28a0.5 0.5 0 0 1 0.3 0.63\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.6 4.79a0.75 0.75 0 0 0 -0.75 -0.79 0.74 0.74 0 0 0 -0.75 0.75v5.35H7.43a0.75 0.75 0 0 0 0 1.5h3.42a0.76 0.76 0 0 0 0.75 -0.75Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9.36 20.08A9.35 9.35 0 1 1 20.1 9.51a0.75 0.75 0 1 0 1.48 -0.22A10.85 10.85 0 1 0 9.13 21.56h0.11a0.75 0.75 0 0 0 0.12 -1.49Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
