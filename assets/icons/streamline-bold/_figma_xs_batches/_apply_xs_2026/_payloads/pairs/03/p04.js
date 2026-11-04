
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

const BATCH = [{"setName": "icon/misc/airplane", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Airplane-Mode--Streamline-Ultimate\"> <g> <path d=\"M14.58 19.51a0.25 0.25 0 0 1 -0.08 -0.18V13l-4.93 5a0.29 0.29 0 0 0 -0.07 0.18v1.19a0.25 0.25 0 0 1 -0.08 0.18L8 20.92a1.5 1.5 0 0 0 1 2.58 7.24 7.24 0 0 0 2.85 -1.39 0.24 0.24 0 0 1 0.3 0A7.24 7.24 0 0 0 15 23.5a1.5 1.5 0 0 0 1 -2.58Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.07 9.8a0.26 0.26 0 0 0 -0.35 0l-3.2 3.2c1.42 1 4.86 3.48 5.48 3.9a2.49 2.49 0 0 0 1.5 0.59A2 2 0 0 0 22.82 14Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.71 0.29a1 1 0 0 0 -1.42 0l-6.84 6.84 -0.95 -1V3a2.4 2.4 0 0 0 -0.2 -1 2.49 2.49 0 0 0 -4.6 0 2.4 2.4 0 0 0 -0.2 1v3.66l-3 2.65L1.18 14A2 2 0 0 0 3 17.45a0.19 0.19 0 0 0 0.12 -0.07L9 12.68a0.34 0.34 0 0 1 0.5 0.32 0.37 0.37 0 0 1 -0.1 0.24L0.29 22.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l22 -22a1 1 0 0 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/alarm", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alarm-Clock-1--Streamline-Ultimate\"> <path d=\"M19.09 0.25a4.82 4.82 0 0 0 -2.89 1 0.53 0.53 0 0 0 -0.2 0.36 0.47 0.47 0 0 0 0.15 0.39l2.38 2.39 -1.28 1.07a8.91 8.91 0 0 0 -10.5 0L5.47 4.35 7.85 2A0.47 0.47 0 0 0 8 1.57a0.49 0.49 0 0 0 -0.2 -0.36 4.82 4.82 0 0 0 -2.89 -1A4.91 4.91 0 0 0 0 5.16a4.82 4.82 0 0 0 1 2.89 0.49 0.49 0 0 0 0.36 0.2 0.47 0.47 0 0 0 0.35 -0.15l2.34 -2.34 1.21 1a9 9 0 0 0 1 12.82L3.79 22a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l2.7 -2.7a8.94 8.94 0 0 0 8.18 0l2.7 2.7a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42l-2.42 -2.41a9 9 0 0 0 0.95 -12.82l1.21 -1 2.34 2.33a0.47 0.47 0 0 0 0.35 0.15 0.49 0.49 0 0 0 0.36 -0.2 4.82 4.82 0 0 0 1 -2.89A4.91 4.91 0 0 0 19.09 0.25M15.5 13.5H12a0.76 0.76 0 0 1 -0.75 -0.75v-5.5a0.75 0.75 0 0 1 1.5 0V12h2.75a0.75 0.75 0 0 1 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
