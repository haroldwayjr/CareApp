
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

const setName = "icon/comms/users";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Multiple-Users-1--Streamline-Ultimate\"> <g> <path d=\"M15.87 10.46a0.49 0.49 0 0 0 0.29 -0.39 0.48 0.48 0 0 0 -0.16 -0.45 6.06 6.06 0 0 0 -1.45 -0.9 0.27 0.27 0 0 1 -0.15 -0.21 0.27 0.27 0 0 1 0.12 -0.23A4.5 4.5 0 0 0 12.05 0a4.53 4.53 0 0 0 -4.52 4.52 4.46 4.46 0 0 0 2.06 3.76 0.26 0.26 0 0 1 0.11 0.23 0.27 0.27 0 0 1 -0.15 0.21 6.66 6.66 0 0 0 -1.48 0.92 0.5 0.5 0 0 0 -0.17 0.46 0.48 0.48 0 0 0 0.29 0.38 6.12 6.12 0 0 1 2.35 1.86 0.47 0.47 0 0 0 0.39 0.2h2.14a0.47 0.47 0 0 0 0.39 -0.2 6 6 0 0 1 2.41 -1.88M9.67 3.7a0.26 0.26 0 0 1 0.16 -0.15 0.25 0.25 0 0 1 0.22 0 5.74 5.74 0 0 0 3.17 0.95 5.8 5.8 0 0 0 1 -0.1 0.26 0.26 0 0 1 0.3 0.26 2.51 2.51 0 0 1 -5 -0.16 2.48 2.48 0 0 1 0.15 -0.8\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.27 16a4.52 4.52 0 1 0 -7 3.76 0.24 0.24 0 0 1 0.13 0.24 0.24 0.24 0 0 1 -0.14 0.21 6.14 6.14 0 0 0 -1.09 0.62A6 6 0 0 0 0.32 22.9a0.75 0.75 0 0 0 0 0.74A0.77 0.77 0 0 0 1 24h9.54a0.77 0.77 0 0 0 0.65 -0.36 0.75 0.75 0 0 0 0 -0.74 6 6 0 0 0 -1.85 -2.1 6.14 6.14 0 0 0 -1.09 -0.62 0.24 0.24 0 0 1 -0.15 -0.18 0.24 0.24 0 0 1 0.11 -0.23A4.49 4.49 0 0 0 10.27 16m-6.89 -0.82a0.23 0.23 0 0 1 0.15 -0.18 0.24 0.24 0 0 1 0.22 0 5.74 5.74 0 0 0 3.17 1 5.91 5.91 0 0 0 1 -0.1 0.27 0.27 0 0 1 0.21 0.06 0.22 0.22 0 0 1 0.08 0.2 2.51 2.51 0 1 1 -4.87 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.83 20.8a6.14 6.14 0 0 0 -1.09 -0.62 0.24 0.24 0 0 1 -0.14 -0.18 0.24 0.24 0 0 1 0.11 -0.23 4.52 4.52 0 1 0 -4.92 0 0.24 0.24 0 0 1 0.11 0.23 0.24 0.24 0 0 1 -0.14 0.21 6.14 6.14 0 0 0 -1.09 0.62 6 6 0 0 0 -1.85 2.1 0.75 0.75 0 0 0 0 0.74 0.77 0.77 0 0 0 0.65 0.36H23a0.77 0.77 0 0 0 0.65 -0.36 0.75 0.75 0 0 0 0 -0.74 6 6 0 0 0 -1.82 -2.13m-5.95 -5.64A0.23 0.23 0 0 1 16 15a0.24 0.24 0 0 1 0.22 0 5.74 5.74 0 0 0 3.17 1 5.91 5.91 0 0 0 1 -0.1 0.27 0.27 0 0 1 0.21 0.06 0.22 0.22 0 0 1 0.08 0.2 2.51 2.51 0 1 1 -4.87 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
