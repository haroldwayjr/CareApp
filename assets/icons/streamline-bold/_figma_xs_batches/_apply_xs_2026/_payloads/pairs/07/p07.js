
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

const BATCH = [{"setName":"icon/misc/wifi.off","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wifi-Off--Streamline-Ultimate\"> <g> <path d=\"M23.34 7.36a14.88 14.88 0 0 0 -1.67 -1.51 1 1 0 1 0 -1.23 1.58 13 13 0 0 1 1.46 1.31 1 1 0 0 0 0.72 0.31 1 1 0 0 0 0.69 -0.28 1 1 0 0 0 0.03 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9.28 20a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.34 9.4a1 1 0 1 0 -1.06 1.7 8.56 8.56 0 0 1 1.6 1.28 1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42 11.68 11.68 0 0 0 -1.96 -1.56\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.25 13.46a1 1 0 1 0 -0.5 1.93 5.09 5.09 0 0 1 2.31 1.31 1 1 0 0 0 0.7 0.3 1 1 0 0 0 0.71 -1.71 6.94 6.94 0 0 0 -3.22 -1.83\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.43 0.24A1 1 0 0 0 20 0.35L17.75 3A15.08 15.08 0 0 0 0.67 5.89a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0 13.08 13.08 0 0 1 14.3 -2.76l-2.06 2.38A11.08 11.08 0 0 0 3.5 9.72a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0 9 9 0 0 1 7.93 -2.49L1 22.35a1 1 0 0 0 0.11 1.41 1 1 0 0 0 0.65 0.24 1 1 0 0 0 0.76 -0.35l19 -22a1 1 0 0 0 -0.09 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"},{"setName":"icon/misc/wind","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wind-West--Streamline-Ultimate\"> <g> <path d=\"m9.33 10.47 8.5 3a0.51 0.51 0 0 0 0.17 0 0.52 0.52 0 0 0 0.38 -0.17 0.5 0.5 0 0 0 0.07 -0.55l-1.34 -2.67a0.28 0.28 0 0 1 0 -0.22l1.34 -2.67a0.5 0.5 0 0 0 -0.07 -0.55 0.52 0.52 0 0 0 -0.55 -0.14l-8.5 3a0.5 0.5 0 0 0 0 0.94Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M24 10a10 10 0 1 0 -19 4.36 0.24 0.24 0 0 0 0.23 0.14h1.53a0.27 0.27 0 0 0 0.24 -0.08 0.26 0.26 0 0 0 0 -0.19A1.77 1.77 0 0 1 7 14v-0.06a0.31 0.31 0 0 0 0 -0.13A7.9 7.9 0 0 1 6 10a8 8 0 1 1 8 8 0.18 0.18 0 0 0 -0.16 0.11 0.17 0.17 0 0 0 0.06 0.19 3.9 3.9 0 0 1 1.2 1.47 0.26 0.26 0 0 0 0.26 0.14A10 10 0 0 0 24 10\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.5 19H1a1 1 0 0 0 0 2h10.5a0.5 0.5 0 0 1 0 1 1 1 0 0 0 0 2 2.5 2.5 0 0 0 0 -5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 18h8.5a2.5 2.5 0 0 0 0 -5 1 1 0 0 0 0 2 0.5 0.5 0 0 1 0 1H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
