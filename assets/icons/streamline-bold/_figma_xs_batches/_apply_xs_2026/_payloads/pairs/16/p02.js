
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

const BATCH = [{"setName": "icon/status/shield.off", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Remove-Shield--Streamline-Ultimate\"> <path d=\"M20.42 0H3.58a1.5 1.5 0 0 0 -1.49 1.5v6.26a18.26 18.26 0 0 0 9.68 16.18 0.47 0.47 0 0 0 0.46 0 18.26 18.26 0 0 0 9.68 -16.18V1.5A1.5 1.5 0 0 0 20.42 0m-3.8 13.2a1 1 0 1 1 -1.41 1.42l-2.77 -2.77a0.51 0.51 0 0 0 -0.71 0L9 14.62a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42l2.77 -2.76a0.51 0.51 0 0 0 0 -0.71L7.55 7A1 1 0 1 1 9 5.55l2.76 2.77a0.51 0.51 0 0 0 0.71 0l2.77 -2.77a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-2.8 2.76a0.51 0.51 0 0 0 0 0.71Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/status/star", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rating-Star--Streamline-Ultimate\"> <path d=\"M23.56 8.73a1.51 1.51 0 0 0 -1.41 -1h-6.09a0.5 0.5 0 0 1 -0.47 -0.33l-2.18 -6.2A1.52 1.52 0 0 0 12 0.25a1.49 1.49 0 0 0 -1.4 1L8.41 7.42a0.5 0.5 0 0 1 -0.47 0.33H1.85a1.5 1.5 0 0 0 -1.41 1 1.52 1.52 0 0 0 0.45 1.65l5.18 4.3a0.5 0.5 0 0 1 0.16 0.54l-2.18 6.53a1.5 1.5 0 0 0 2.31 1.69l5.34 -3.92a0.49 0.49 0 0 1 0.59 0l5.35 3.92A1.5 1.5 0 0 0 20 21.77l-2.18 -6.53a0.5 0.5 0 0 1 0.16 -0.54l5.19 -4.31a1.51 1.51 0 0 0 0.39 -1.66\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
