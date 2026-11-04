
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

const BATCH = [{"setName": "icon/health/lab", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Laboratory-Sample--Streamline-Ultimate\"> <g> <path d=\"M23.25 9.68a1 1 0 0 0 -0.4 -1.35l-8.79 -4.77A1 1 0 0 0 12.7 4a1 1 0 0 0 0.41 1.35l0.89 0.45a0.5 0.5 0 0 1 0.2 0.68L12 10.43a4 4 0 0 0 0.18 4.3 0.49 0.49 0 0 1 0 0.54l-1.59 2.95a1 1 0 0 0 0.4 1.35 0.89 0.89 0 0 0 0.47 0.12 1 1 0 0 0 0.88 -0.52L14 16.23a0.48 0.48 0 0 1 0.5 -0.23 4 4 0 0 0 3.7 -2.2l2.14 -4a0.52 0.52 0 0 1 0.3 -0.24 0.5 0.5 0 0 1 0.38 0l0.88 0.48a1 1 0 0 0 1.35 -0.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.84 0.52a1 1 0 0 0 0.41 1.36l0.88 0.48a0.5 0.5 0 0 1 0.2 0.68l-0.24 0.43a0.5 0.5 0 0 0 0.2 0.68l1.76 1a0.5 0.5 0 0 0 0.38 0 0.48 0.48 0 0 0 0.3 -0.24l0.27 -0.45a0.53 0.53 0 0 1 0.29 -0.24 0.55 0.55 0 0 1 0.38 0l0.88 0.48a1 1 0 0 0 0.48 0.12A1 1 0 0 0 23.47 3L18.2 0.12a1 1 0 0 0 -1.36 0.4\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21 14a1 1 0 1 0 -1 1.75c1.26 0.7 2 1.54 2 2.3 0 1.89 -4.28 4 -10 4S2 19.89 2 18c0 -1.41 2.5 -3.22 7.13 -3.82a1 1 0 0 0 -0.26 -2C3.48 12.89 0 15.17 0 18c0 3.42 5.16 6 12 6s12 -2.58 12 -6c0 -1.54 -1.07 -3 -3 -4\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5 17.97a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.25 19.47a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18 17.97a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
;
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
