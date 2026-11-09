
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

const setName = "icon/commerce/chart.line";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Analytics-Graph--Streamline-Ultimate\"> <g> <path d=\"M18.88 6.45A3 3 0 0 1 18.5 5a0.14 0.14 0 0 0 -0.06 -0.12 0.16 0.16 0 0 0 -0.13 0l-5 1.4a0.25 0.25 0 0 0 -0.16 0.14 0.24 0.24 0 0 0 0 0.22A3 3 0 0 1 13.5 8a0.21 0.21 0 0 0 0.08 0.17 0.19 0.19 0 0 0 0.18 0l5 -1.39a0.24 0.24 0 0 0 0.17 -0.14 0.28 0.28 0 0 0 -0.05 -0.19\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.82 16a0.29 0.29 0 0 0 -0.17 -0.14l-4.84 -1.13a0.28 0.28 0 0 0 -0.22 0.05 0.25 0.25 0 0 0 -0.09 0.2V15a2.94 2.94 0 0 1 -0.29 1.29 0.26 0.26 0 0 0 0 0.21 0.26 0.26 0 0 0 0.17 0.14l4.81 1.12a0.28 0.28 0 0 0 0.22 -0.05 0.25 0.25 0 0 0 0.09 -0.2 3 3 0 0 1 0.31 -1.33 0.24 0.24 0 0 0 0.01 -0.18\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 0a1 1 0 0 0 -1 1v21.52A1.49 1.49 0 0 0 1.49 24H23a1 1 0 0 0 0 -2H2.25a0.25 0.25 0 0 1 -0.25 -0.25v-0.05a0.24 0.24 0 0 1 0.12 -0.21l6.31 -3.88a0.28 0.28 0 0 0 0.12 -0.19 0.24 0.24 0 0 0 -0.08 -0.21 3.13 3.13 0 0 1 -0.78 -1.15 0.25 0.25 0 0 0 -0.15 -0.15 0.26 0.26 0 0 0 -0.21 0L2.38 19a0.23 0.23 0 0 1 -0.25 0 0.24 0.24 0 0 1 -0.13 -0.24v-2.64a0.25 0.25 0 0 1 0.1 -0.2l6.63 -5.1a0.23 0.23 0 0 0 0.1 -0.2 0.26 0.26 0 0 0 -0.1 -0.2 3 3 0 0 1 -0.9 -1.06 0.28 0.28 0 0 0 -0.17 -0.13 0.31 0.31 0 0 0 -0.21 0L2.4 13.16A0.25 0.25 0 0 1 2 13V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.5 8a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.5 5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.5 17.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.5 15a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
