
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

const setName = "icon/comms/phone.off";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Off--Streamline-Ultimate\"> <g> <path d=\"m19.2 14.71 -1.55 -1.55a1.55 1.55 0 0 0 -2.18 0.11l-0.57 0.58 -0.27 -0.22a0.26 0.26 0 0 0 -0.34 0l-2.1 2.11a0.26 0.26 0 0 0 0 0.37 20.62 20.62 0 0 0 3 2.16 2.37 2.37 0 0 0 2.92 -0.45l0.95 -0.94a1.55 1.55 0 0 0 0.14 -2.17\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0M2.09 10.65a10 10 0 0 1 16 -6.57 0.25 0.25 0 0 1 0 0.38l-6.26 6.27a0.25 0.25 0 0 1 -0.37 0L10.15 9.1l0.58 -0.57a1.55 1.55 0 0 0 0.11 -2.18L9.29 4.8a1.55 1.55 0 0 0 -2.18 0.11l-0.94 1a2.37 2.37 0 0 0 -0.45 2.92 48.21 48.21 0 0 0 3.35 4.37 0.26 0.26 0 0 1 0 0.34l-4.61 4.58a0.25 0.25 0 0 1 -0.38 0 10 10 0 0 1 -1.99 -7.47m19.82 2.7a10 10 0 0 1 -16 6.57 0.25 0.25 0 0 1 0 -0.38L19.54 5.88a0.25 0.25 0 0 1 0.38 0 10 10 0 0 1 1.99 7.47\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
