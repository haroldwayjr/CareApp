
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

const BATCH = [{"setName": "icon/files/wiki", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wikipedia-Logo--Streamline-Ultimate\"> <path d=\"M23 4h-3a1 1 0 1 0 0 2h0.26l-5.15 10.63L13 11.76 16 6h0.53a1 1 0 0 0 0 -2h-3a1 1 0 1 0 0 2h0.21l-1.81 3.41L10.42 6h0.08a1 1 0 0 0 0 -2h-3a1 1 0 0 0 0 2h0.74l2.51 5.71 -2.57 4.92L3.88 6h0.62a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2h0.72l5.42 13.39A1 1 0 0 0 8 20h0.05a1 1 0 0 0 0.95 -0.52L11.78 14l2.37 5.39A1 1 0 0 0 15 20a1 1 0 0 0 0.9 -0.57L22.49 6H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/arrow.down", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Down--Streamline-Ultimate\"> <path d=\"M23.29 10.24a1.4 1.4 0 0 0 -2 0.13l-7.45 8.46a0.25 0.25 0 0 1 -0.28 0.07 0.26 0.26 0 0 1 -0.16 -0.23V1.41a1.41 1.41 0 0 0 -2.82 0v17.26a0.26 0.26 0 0 1 -0.16 0.23 0.25 0.25 0 0 1 -0.28 -0.07L2.7 10.37a1.41 1.41 0 0 0 -2.12 1.86l9.65 11a2.36 2.36 0 0 0 3.54 0l9.65 -11a1.41 1.41 0 0 0 -0.13 -1.99Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
