
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

const BATCH = [{"setName":"icon/actions/archive","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Archive--Streamline-Ultimate\"> <g> <path d=\"M21.5 2.5h-19a2 2 0 0 0 -2 2v3a1 1 0 0 0 1 1h21a1 1 0 0 0 1 -1v-3a2 2 0 0 0 -2 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.5 10h-19a1 1 0 0 0 -1 1v8.5a2 2 0 0 0 2 2h17a2 2 0 0 0 2 -2V11a1 1 0 0 0 -1 -1Zm-6.25 3.5A1.25 1.25 0 0 1 14 14.75h-4a1.25 1.25 0 0 1 0 -2.5h4a1.25 1.25 0 0 1 1.25 1.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"},{"setName":"icon/actions/attach","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Attachment--Streamline-Ultimate\"> <path d=\"M21.84 3.46a7 7 0 0 0 -9.84 0L1.62 13.83a5.13 5.13 0 0 0 7.25 7.25l8.43 -8.43A3.29 3.29 0 1 0 12.65 8l-5.19 5.18a1 1 0 0 0 0 1.42 1 1 0 0 0 1.41 0l5.19 -5.19a1.3 1.3 0 0 1 2.21 0.91 1.32 1.32 0 0 1 -0.38 0.92l-8.43 8.43a3.13 3.13 0 0 1 -5.34 -2.21A3.09 3.09 0 0 1 3 15.25L13.41 4.87a5 5 0 0 1 7 7l-7.78 7.78a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l7.78 -7.78a7 7 0 0 0 0 -9.84Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
