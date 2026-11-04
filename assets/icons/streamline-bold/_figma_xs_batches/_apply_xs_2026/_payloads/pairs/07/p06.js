
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

const BATCH = [{"setName":"icon/misc/weather","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Weather-Rain--Streamline-Ultimate\"> <g> <g> <path d=\"M22.09 12.07a0.25 0.25 0 0 1 -0.09 -0.19 7 7 0 0 0 -13.66 -2 0.23 0.23 0 0 1 -0.22 0.17A5.5 5.5 0 0 0 5.34 20a0.28 0.28 0 0 0 0.18 0A2.59 2.59 0 0 1 6 20h0.12a0.25 0.25 0 0 0 0.22 -0.11 1.42 1.42 0 0 1 0.25 -0.3l0.51 -0.51a0.25 0.25 0 0 0 0.06 -0.22 0.25 0.25 0 0 0 -0.16 -0.19A3.5 3.5 0 0 1 8.5 12l0.5 0a1 1 0 0 0 1.11 -0.83A5 5 0 0 1 20 12l0 0.43a1 1 0 0 0 0.5 1 3 3 0 0 1 0.57 4.8 0.29 0.29 0 0 0 -0.08 0.14 1.89 1.89 0 0 1 -0.56 1.08L19 20.88a0.08 0.08 0 0 0 0 0.08 0.1 0.1 0 0 0 0 0.04 5 5 0 0 0 3.09 -8.93\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.47 21.53a0.75 0.75 0 0 0 1.06 0l3 -3a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.53 18.53a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06 0.75 0.75 0 0 0 1.06 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.53 18.53a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06 0.75 0.75 0 0 0 1.06 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> <path d=\"M8.25 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2.88 4.3a1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.42l-0.71 -0.7a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 8.25a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.08 2.42a1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 -0.29 0.67A0.25 0.25 0 0 0 12 4a8.75 8.75 0 0 1 2.12 -0.5 0.23 0.23 0 0 0 0.22 -0.19 1 1 0 0 0 -0.26 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.46 9.54a0.25 0.25 0 0 0 0.12 -0.29 2.76 2.76 0 0 1 -0.1 -0.77 3 3 0 0 1 3 -3 2.91 2.91 0 0 1 1.1 0.21 0.28 0.28 0 0 0 0.25 0 8 8 0 0 1 1.37 -0.92 0.23 0.23 0 0 0 0.13 -0.21 0.22 0.22 0 0 0 -0.11 -0.22 5 5 0 0 0 -7.74 4.14 5.13 5.13 0 0 0 0.33 1.8 0.26 0.26 0 0 0 0.18 0.16 0.23 0.23 0 0 0 0.22 -0.06 7.19 7.19 0 0 1 1.25 -0.84\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"},{"setName":"icon/misc/wifi","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wifi--Streamline-Ultimate\"> <g> <path d=\"M4.05 9.92a1.24 1.24 0 0 0 0 1.76 1.23 1.23 0 0 0 1.76 0 8.77 8.77 0 0 1 12.38 0 1.25 1.25 0 0 0 1.77 0 1.27 1.27 0 0 0 0 -1.76 11.26 11.26 0 0 0 -15.91 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.78 6.09a15.25 15.25 0 0 0 -21.56 0A1.25 1.25 0 0 0 3 7.86a12.78 12.78 0 0 1 18 0 1.25 1.25 0 0 0 1.76 -1.77Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.38 12a7.27 7.27 0 0 0 -7.51 1.71 1.27 1.27 0 0 0 0 1.77 1.25 1.25 0 0 0 0.89 0.37 1.21 1.21 0 0 0 0.88 -0.37 4.75 4.75 0 0 1 6.53 -0.15 1.53 1.53 0 0 0 1.07 0.52 1.26 1.26 0 0 0 0.89 -2.14A7.18 7.18 0 0 0 14.38 12\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9.5 19.87a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
