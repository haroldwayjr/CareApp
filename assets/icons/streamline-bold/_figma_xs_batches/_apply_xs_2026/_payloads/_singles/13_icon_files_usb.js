
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

const setName = "icon/files/usb";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Usb-Port--Streamline-Ultimate\"> <g> <path d=\"M24 9a0.5 0.5 0 0 0 -0.5 -0.5H0.5A0.5 0.5 0 0 0 0 9v13.07a1.47 1.47 0 0 0 1.5 1.43h21a1.47 1.47 0 0 0 1.5 -1.43Zm-3.5 6h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1m1 3v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1m-9 -2a5 5 0 1 1 -5 -5 5 5 0 0 1 5 5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.5 7h23a0.52 0.52 0 0 0 0.44 -0.25 0.54 0.54 0 0 0 0 -0.51l-3 -5A1.52 1.52 0 0 0 19.58 0.5H4.42a1.52 1.52 0 0 0 -1.33 0.7l-3 5a0.54 0.54 0 0 0 0 0.51A0.52 0.52 0 0 0 0.5 7\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17 13a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 13a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17 19a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 19a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.81 16.29a1.72 1.72 0 0 0 -0.26 -2.58 0.68 0.68 0 0 0 -0.45 -0.21c-0.17 0 -0.38 0.1 -0.4 0.27a1.93 1.93 0 0 1 -1.55 1.57 3.16 3.16 0 0 0 -0.36 -2.65 1.72 1.72 0 0 0 -2.58 0.31 0.68 0.68 0 0 0 -0.21 0.4c0 0.17 0.1 0.38 0.27 0.4a1.93 1.93 0 0 1 1.57 1.55 3.16 3.16 0 0 0 -2.65 0.36 1.72 1.72 0 0 0 0.26 2.58 0.68 0.68 0 0 0 0.45 0.21c0.17 0 0.38 -0.1 0.4 -0.27a1.93 1.93 0 0 1 1.55 -1.57 3.16 3.16 0 0 0 0.36 2.65 1.72 1.72 0 0 0 2.58 -0.26 0.68 0.68 0 0 0 0.21 -0.45c0 -0.17 -0.1 -0.38 -0.27 -0.4a1.93 1.93 0 0 1 -1.57 -1.55 3.16 3.16 0 0 0 2.65 -0.36\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
