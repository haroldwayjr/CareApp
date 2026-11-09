
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

const BATCH = [{"setName": "icon/misc/qr.scan", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Iris-Scan--Streamline-Ultimate\"> <g> <path d=\"M8 12a4 4 0 1 0 4 -4 4 4 0 0 0 -4 4m5 0a1 1 0 1 1 -1 -1 1 1 0 0 1 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.89 13.36a0.23 0.23 0 0 0 -0.08 0.18 0.26 0.26 0 0 0 0.07 0.18l1.06 1.06a0.26 0.26 0 0 0 0.35 0c0.36 -0.34 0.71 -0.69 1 -1a2.6 2.6 0 0 0 0 -3.5c-0.31 -0.34 -0.66 -0.69 -1 -1a0.26 0.26 0 0 0 -0.35 0l-1.06 1.07a0.25 0.25 0 0 0 -0.08 0.18 0.3 0.3 0 0 0 0.08 0.18c0.35 0.32 0.67 0.64 1 1a0.58 0.58 0 0 1 0 0.78c-0.33 0.22 -0.65 0.51 -0.99 0.87\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.46 9.79a1 1 0 0 0 1.41 0 1 1 0 0 0 0 -1.41 0.32 0.32 0 0 1 -0.09 -0.26 0.35 0.35 0 0 1 0.16 -0.23 9.87 9.87 0 0 1 10.12 0 0.31 0.31 0 0 1 0.15 0.23 0.29 0.29 0 0 1 -0.08 0.26 1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0L23.29 5a1 1 0 1 0 -1.41 -1.41l-2.72 2.76a0.51 0.51 0 0 1 -0.61 0.08 12.06 12.06 0 0 0 -13.1 0 0.51 0.51 0 0 1 -0.61 -0.08L2.12 3.63A1 1 0 0 0 0.71 5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.71 14.78a0.26 0.26 0 0 0 0.35 0l1.06 -1.06a0.26 0.26 0 0 0 0.07 -0.18 0.23 0.23 0 0 0 -0.08 -0.18c-0.34 -0.32 -0.66 -0.65 -1 -1a0.6 0.6 0 0 1 0 -0.79c0.29 -0.31 0.62 -0.63 1 -0.95a0.31 0.31 0 0 0 0.09 -0.18 0.23 0.23 0 0 0 -0.08 -0.18L2.06 9.22a0.26 0.26 0 0 0 -0.35 0c-0.36 0.34 -0.71 0.69 -1 1a2.61 2.61 0 0 0 0 3.5c0.29 0.37 0.63 0.72 1 1.06\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.54 14.21a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41 0.33 0.33 0 0 1 0.09 0.28 0.32 0.32 0 0 1 -0.17 0.25 10 10 0 0 1 -10.1 0 0.31 0.31 0 0 1 -0.17 -0.24 0.33 0.33 0 0 1 0.09 -0.28 1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.41 0L0.71 19a1 1 0 0 0 1.41 1.41l2.72 -2.72a0.51 0.51 0 0 1 0.61 -0.08 12 12 0 0 0 13.1 0 0.51 0.51 0 0 1 0.61 0.08l2.72 2.72A1 1 0 0 0 23.29 19Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/rain", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rain-Umbrella--Streamline-Ultimate\"> <g> <path d=\"M11.32 16.9a0.25 0.25 0 0 0 -0.22 0 0.26 0.26 0 0 0 -0.1 0.2v4.11a2.75 2.75 0 0 0 5.5 0 1 1 0 0 0 -2 0 0.75 0.75 0 0 1 -1.5 0v-4.07a0.26 0.26 0 0 0 -0.1 -0.2 0.25 0.25 0 0 0 -0.22 0 2.36 2.36 0 0 1 -1.36 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 0a1 1 0 0 0 -1 1v0.32a0.25 0.25 0 0 1 -0.22 0.25A12.16 12.16 0 0 0 0 14v0.5a1 1 0 0 0 2 0c0 -0.53 0.7 -1 1.5 -1s1.5 0.5 1.5 1a1 1 0 0 0 2 0c0 -0.41 0.78 -1 2 -1s2 0.59 2 1a1 1 0 0 0 2 0c0 -0.41 0.78 -1 2 -1s2 0.59 2 1a1 1 0 0 0 2 0c0 -0.53 0.7 -1 1.5 -1s1.5 0.47 1.5 1a1 1 0 0 0 2 0V14A12.16 12.16 0 0 0 13.22 1.57a0.25 0.25 0 0 1 -0.22 -0.25V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
