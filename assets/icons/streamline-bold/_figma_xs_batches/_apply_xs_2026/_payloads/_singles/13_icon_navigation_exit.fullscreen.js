
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

const setName = "icon/navigation/exit.fullscreen";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shrink--Streamline-Ultimate\"> <g> <path d=\"M23.38 0.62a1.24 1.24 0 0 0 -1.76 0l-3.77 3.76a0.24 0.24 0 0 1 -0.35 0l-1.33 -1.33a0.5 0.5 0 0 0 -0.85 0.36v4.77a0.5 0.5 0 0 0 0.5 0.5h4.77a0.49 0.49 0 0 0 0.46 -0.31 0.48 0.48 0 0 0 -0.11 -0.54L19.62 6.5a0.24 0.24 0 0 1 -0.07 -0.18 0.22 0.22 0 0 1 0.07 -0.17l3.76 -3.77a1.24 1.24 0 0 0 0 -1.76Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.62 23.38a1.21 1.21 0 0 0 0.88 0.37 1.21 1.21 0 0 0 0.88 -0.37l3.77 -3.76a0.24 0.24 0 0 1 0.35 0l1.33 1.32a0.47 0.47 0 0 0 0.35 0.15 0.41 0.41 0 0 0 0.19 0 0.5 0.5 0 0 0 0.31 -0.46v-4.81a0.5 0.5 0 0 0 -0.5 -0.5H3.41a0.49 0.49 0 0 0 -0.46 0.31 0.48 0.48 0 0 0 0.11 0.54l1.32 1.33a0.24 0.24 0 0 1 0 0.35L0.62 21.62a1.24 1.24 0 0 0 0 1.76Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.63 21.05a0.41 0.41 0 0 0 0.19 0 0.47 0.47 0 0 0 0.35 -0.15l1.33 -1.32a0.24 0.24 0 0 1 0.35 0l3.77 3.76a1.23 1.23 0 0 0 1.76 0 1.24 1.24 0 0 0 0 -1.76l-3.76 -3.77a0.24 0.24 0 0 1 0 -0.35l1.32 -1.33a0.48 0.48 0 0 0 0.11 -0.54 0.49 0.49 0 0 0 -0.46 -0.31h-4.77a0.5 0.5 0 0 0 -0.5 0.5v4.77a0.5 0.5 0 0 0 0.31 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.68 3.41a0.5 0.5 0 0 0 -0.85 -0.36L6.5 4.38a0.22 0.22 0 0 1 -0.17 0.07 0.24 0.24 0 0 1 -0.18 -0.07L2.38 0.62A1.24 1.24 0 0 0 0.62 2.38l3.76 3.77a0.24 0.24 0 0 1 0 0.35L3.06 7.83a0.48 0.48 0 0 0 -0.06 0.54 0.49 0.49 0 0 0 0.46 0.31h4.72a0.5 0.5 0 0 0 0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9.09 12a2.91 2.91 0 1 0 5.82 0 2.91 2.91 0 1 0 -5.82 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
