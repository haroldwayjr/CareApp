
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

const setName = "icon/navigation/compass";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Compass--Streamline-Ultimate\"> <g> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm3.29 7.29 2 -2a1 1 0 1 1 1.42 1.42l-2 2a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42Zm-10 -2a1 1 0 0 1 1.42 0l2 2a1 1 0 0 1 0 1.42 1 1 0 0 1 -1.42 0l-2 -2a1 1 0 0 1 0 -1.42Zm3.42 11.42 -2 2a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42l2 -2a1 1 0 0 1 1.42 1.42Zm10 2a1 1 0 0 1 -1.42 0l-2 -2a1 1 0 0 1 1.42 -1.42l2 2a1 1 0 0 1 0 1.42Zm3.52 -6.36L14.6 13.7a0.73 0.73 0 0 0 -0.51 0.51l-1.75 8a0.35 0.35 0 0 1 -0.35 0.27 0.37 0.37 0 0 1 -0.35 -0.27l-1.75 -8a0.72 0.72 0 0 0 -0.5 -0.51L2 12.35a0.36 0.36 0 0 1 0 -0.7l7.53 -1.4a0.54 0.54 0 0 0 0.47 -0.41l1.67 -8.07A0.37 0.37 0 0 1 12 1.5a0.35 0.35 0 0 1 0.35 0.27L14 9.84a0.54 0.54 0 0 0 0.42 0.41l7.79 1.4a0.37 0.37 0 0 1 0 0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
