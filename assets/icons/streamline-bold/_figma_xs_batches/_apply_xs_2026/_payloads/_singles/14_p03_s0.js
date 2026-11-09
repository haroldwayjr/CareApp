
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

const BATCH = [{"setName": "icon/navigation/layers", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Layers--Streamline-Ultimate\"> <g> <path d=\"m0.79 6.86 10.8 4.7a1 1 0 0 0 0.82 0l10.8 -4.7a1 1 0 0 0 0.61 -0.93 1 1 0 0 0 -0.61 -0.93L12.41 0.29a1.06 1.06 0 0 0 -0.82 0L0.79 5a1 1 0 0 0 -0.61 0.94 1 1 0 0 0 0.61 0.92Zm11.42 4.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m0.59 10.77 10.81 4.7a1.53 1.53 0 0 0 0.6 0.12 1.41 1.41 0 0 0 0.6 -0.13l10.81 -4.69A1 1 0 1 0 22.62 9L12 13.58 1.38 9a1 1 0 0 0 -0.79 1.81Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.62 13.16 12 17.78 1.38 13.16A1 1 0 0 0 0.59 15l10.81 4.66a1.45 1.45 0 0 0 1.2 0L23.41 15a1 1 0 1 0 -0.79 -1.81Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.62 17.16 12 21.78 1.38 17.16A1 1 0 0 0 0.59 19l10.81 4.7a1.53 1.53 0 0 0 0.6 0.12 1.41 1.41 0 0 0 0.6 -0.13L23.41 19a1 1 0 0 0 -0.79 -1.81Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];

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
