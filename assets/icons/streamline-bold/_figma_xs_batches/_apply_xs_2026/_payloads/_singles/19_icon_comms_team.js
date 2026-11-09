
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

const setName = "icon/comms/team";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Team-Idea--Streamline-Ultimate\"> <g> <path d=\"M9.9 10.2a0.26 0.26 0 0 1 0.1 0.2v0.6a0.5 0.5 0 0 0 0.5 0.5h3a0.5 0.5 0 0 0 0.5 -0.5v-0.6a0.26 0.26 0 0 1 0.1 -0.2 3.4 3.4 0 0 0 1.4 -2.7A3.6 3.6 0 0 0 12 4a3.6 3.6 0 0 0 -3.5 3.5 3.4 3.4 0 0 0 1.4 2.7\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.41 3.5a1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.5 8.5a1 1 0 0 0 0 -2h-1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.71 2.79 8 2.09a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41l0.7 0.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.5 6.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11 14.25h2a0.75 0.75 0 0 0 0 -1.5h-2a0.75 0.75 0 0 0 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.5 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.33 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23A3.6 3.6 0 0 1 3.5 21.2a3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.5 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.83 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23A3.6 3.6 0 0 1 12 21.2a3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.33 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23 3.6 3.6 0 0 1 3.38 -2.47 3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
