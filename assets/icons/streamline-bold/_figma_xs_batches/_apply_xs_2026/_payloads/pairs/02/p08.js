
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

const BATCH = [{"setName": "icon/health/surgery", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Surgery-Liposuction--Streamline-Ultimate\"> <g> <path d=\"M18 9.49a7.41 7.41 0 0 1 -5.36 -2.26c-0.2 -0.21 -0.38 -0.43 -0.56 -0.65H12c-0.18 0.22 -0.36 0.44 -0.56 0.65a7.44 7.44 0 0 1 -9.17 1.2c-0.6 8 -3.51 11.08 -0.19 14.67h0.68c0.2 -0.21 0.4 -0.41 0.58 -0.63a0.51 0.51 0 0 1 0.71 0 0.49 0.49 0 0 1 0.06 0.67h15.82a0.5 0.5 0 0 1 0.07 -0.67 0.5 0.5 0 0 1 0.7 0c0.19 0.22 0.38 0.42 0.59 0.63h0.94c3.34 -3.61 0.38 -6.72 -0.2 -14.82A7.45 7.45 0 0 1 18 9.49M6.93 18a11.75 11.75 0 0 1 -0.88 2.23 0.49 0.49 0 0 1 -0.44 0.27 0.64 0.64 0 0 1 -0.23 0 0.52 0.52 0 0 1 -0.22 -0.68 11.11 11.11 0 0 0 0.81 -2 0.49 0.49 0 0 1 0.61 -0.34 0.5 0.5 0 0 1 0.35 0.52m-0.06 -3a0.51 0.51 0 0 1 -0.5 -0.49 12.93 12.93 0 0 0 -0.26 -2.19 0.51 0.51 0 0 1 0.39 -0.59 0.5 0.5 0 0 1 0.59 0.39 13 13 0 0 1 0.28 2.36 0.5 0.5 0 0 1 -0.5 0.46Zm9.76 -0.52a15 15 0 0 1 0.28 -2.36 0.51 0.51 0 0 1 0.59 -0.39 0.5 0.5 0 0 1 0.39 0.59 12.93 12.93 0 0 0 -0.26 2.19 0.5 0.5 0 0 1 -0.5 0.49 0.51 0.51 0 0 1 -0.5 -0.58Zm2 6a0.59 0.59 0 0 1 -0.22 0 0.5 0.5 0 0 1 -0.45 -0.27 11.7 11.7 0 0 1 -0.89 -2.21 0.49 0.49 0 0 1 0.34 -0.61 0.5 0.5 0 0 1 0.62 0.34 10.4 10.4 0 0 0 0.8 2 0.5 0.5 0 0 1 -0.22 0.69Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6 8a6 6 0 0 0 6 -6.13A6 6 0 1 0 23.93 2a6.18 6.18 0 0 0 -0.2 -1.56H0.27A6.18 6.18 0 0 0 0.07 2 6 6 0 0 0 6 8m12 -4.81a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1m-12 0a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/health/symptoms", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Smiley-Fever--Streamline-Ultimate\"> <g> <path d=\"M15.41 16.71a0.26 0.26 0 0 0 0.31 0l3.57 -2.37a0.25 0.25 0 0 0 0.07 -0.34l-0.56 -0.86a0.26 0.26 0 0 0 -0.35 -0.08l-3.91 2.53a0.24 0.24 0 0 0 -0.11 0.21 0.26 0.26 0 0 0 0.11 0.21 6.29 6.29 0 0 1 0.87 0.7\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5.36 6.45a2.69 2.69 0 0 0 -2.11 -1 1 1 0 0 1 0 -2c1.15 0 3.14 0.55 3.89 2.05a1 1 0 0 1 -0.44 1.34 0.93 0.93 0 0 1 -0.45 0.11 1 1 0 0 1 -0.89 -0.5m0.14 3.05A1.5 1.5 0 1 1 16 8a1.5 1.5 0 0 1 1.5 1.5m-9.25 -6a1 1 0 0 1 0 2 2.69 2.69 0 0 0 -2.11 1 1 1 0 0 1 -0.89 0.5 0.93 0.93 0 0 1 -0.45 -0.11 1 1 0 0 1 -0.44 -1.34C5.11 4.05 7.1 3.5 8.25 3.5m1.25 6A1.5 1.5 0 1 1 8 8a1.5 1.5 0 0 1 1.5 1.5M22 14.39l-5.32 3.52a0.25 0.25 0 0 0 -0.1 0.28 1 1 0 0 1 -0.4 1.14 1 1 0 0 1 -1.41 -0.33 4.49 4.49 0 0 0 -6.61 -1 1 1 0 0 1 -1.27 -1.55A6.55 6.55 0 0 1 11 15a6.34 6.34 0 0 1 1.38 0.15 0.25 0.25 0 0 0 0.19 0l7 -4.49A2.25 2.25 0 0 1 22 14.39\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
