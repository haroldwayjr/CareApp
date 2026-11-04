
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

const setName = "icon/commerce/coins";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Accounting-Coins--Streamline-Ultimate\"> <g> <path d=\"M7.67 9.21A0.23 0.23 0 0 0 7.42 9 7.5 7.5 0 1 0 15 16.57a0.23 0.23 0 0 0 -0.2 -0.24 9 9 0 0 1 -7.13 -7.12m1.73 5a0.75 0.75 0 0 1 -0.75 0.75h-1.9a0.51 0.51 0 0 0 -0.5 0.51 0.48 0.48 0 0 0 0.32 0.46l1.92 0.77a2 2 0 0 1 -0.3 3.8 0.26 0.26 0 0 0 -0.19 0.25V21a0.75 0.75 0 0 1 -1.5 0v-0.17a0.25 0.25 0 0 0 -0.25 -0.25h-0.4a0.75 0.75 0 0 1 0 -1.5h1.9a0.5 0.5 0 0 0 0.5 -0.5 0.48 0.48 0 0 0 -0.31 -0.46L6 17.34a2 2 0 0 1 -1.26 -1.85 2 2 0 0 1 1.56 -2 0.24 0.24 0 0 0 0.19 -0.24v-0.23a0.75 0.75 0 0 1 1.5 0v0.16a0.25 0.25 0 0 0 0.25 0.25h0.4a0.76 0.76 0 0 1 0.76 0.8Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.5 0A7.5 7.5 0 1 0 24 7.5 7.5 7.5 0 0 0 16.5 0m0 13.21a0.76 0.76 0 0 1 -0.75 -0.75V12a0.25 0.25 0 0 0 -0.25 -0.25h-0.75a0.75 0.75 0 0 1 0 -1.5h2.37a0.82 0.82 0 0 0 0.82 -0.82 0.8 0.8 0 0 0 -0.52 -0.75l-2.4 -1a2.29 2.29 0 0 1 -1.46 -2.14 2.32 2.32 0 0 1 2 -2.29 0.24 0.24 0 0 0 0.19 -0.25v-0.5a0.75 0.75 0 1 1 1.5 0V3a0.25 0.25 0 0 0 0.25 0.25h0.75a0.75 0.75 0 0 1 0 1.5h-2.37a0.82 0.82 0 0 0 -0.82 0.82 0.8 0.8 0 0 0 0.52 0.75l2.4 1a2.29 2.29 0 0 1 1.46 2.14 2.32 2.32 0 0 1 -2 2.29 0.24 0.24 0 0 0 -0.21 0.24v0.5a0.76 0.76 0 0 1 -0.73 0.72\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
