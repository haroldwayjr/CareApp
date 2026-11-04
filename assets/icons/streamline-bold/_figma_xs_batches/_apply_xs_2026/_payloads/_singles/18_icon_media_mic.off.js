
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

const setName = "icon/media/mic.off";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Microphone-Off--Streamline-Ultimate\"> <g> <path d=\"M12 20a7.5 7.5 0 0 1 -7.5 -7.5V10a1 1 0 0 0 -2 0v2.5a9.51 9.51 0 0 0 8.28 9.42 0.26 0.26 0 0 1 0.22 0.25V23a1 1 0 0 0 2 0v-0.83a0.26 0.26 0 0 1 0.22 -0.25 9.58 9.58 0 0 0 3.86 -1.39 0.27 0.27 0 0 0 0.11 -0.19 0.25 0.25 0 0 0 -0.07 -0.2L16 19.05a0.24 0.24 0 0 0 -0.3 0A7.47 7.47 0 0 1 12 20\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.43 9.45a0.26 0.26 0 0 0 -0.28 -0.06 0.25 0.25 0 0 0 -0.15 0.23v2.88a6 6 0 0 0 8.47 5.5 0.22 0.22 0 0 0 0.14 -0.18 0.25 0.25 0 0 0 -0.07 -0.23Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m23.71 22.3 -4 -4a0.26 0.26 0 0 1 0 -0.32 9.48 9.48 0 0 0 1.79 -5.48V10a1 1 0 0 0 -2 0v2.5a7.4 7.4 0 0 1 -1.16 4 0.23 0.23 0 0 1 -0.18 0.11 0.24 0.24 0 0 1 -0.21 -0.07l-0.72 -0.72a0.26 0.26 0 0 1 0 -0.31 6 6 0 0 0 0.81 -3V6a6 6 0 0 0 -11.8 -1.69 0.24 0.24 0 0 1 -0.17 0.17 0.26 0.26 0 0 1 -0.24 -0.06L1.71 0.3A1 1 0 0 0 0.29 0.3a1 1 0 0 0 0 1.41l22 22a1 1 0 0 0 1.41 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
