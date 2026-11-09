
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

const BATCH = [{"setName": "icon/misc/bluetooth", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bluetooth--Streamline-Ultimate\"> <g> <path d=\"M3.67 11.1H1a1 1 0 0 0 0 2h2.67a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 11.1h-2.67a1 1 0 0 0 0 2H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18 8.21a1 1 0 0 0 -0.4 -0.79L12.12 3.3a1 1 0 0 0 -1.6 0.8v5.27l-3.73 -3A1 1 0 1 0 5.55 8l5 3.93v0.16L5.51 16a1 1 0 0 0 1.24 1.57l3.77 -3v5.33a1 1 0 0 0 0.56 0.89 1 1 0 0 0 1 -0.09l5.5 -4.12a1 1 0 0 0 0 -1.59l-3.79 -3 3.79 -3a1 1 0 0 0 0.42 -0.78m-2.9 7.34a0.25 0.25 0 0 1 0.1 0.2 0.26 0.26 0 0 1 -0.1 0.2l-2.2 1.65a0.27 0.27 0 0 1 -0.26 0 0.26 0.26 0 0 1 -0.14 -0.22V14a0.26 0.26 0 0 1 0.41 -0.19Zm-2.19 -5.38a0.26 0.26 0 0 1 -0.41 -0.19V6.6a0.26 0.26 0 0 1 0.14 -0.22 0.27 0.27 0 0 1 0.26 0l2.2 1.65a0.24 0.24 0 0 1 0.1 0.19 0.25 0.25 0 0 1 -0.1 0.2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/battery", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M0.337891 0.342694c0.390521 -0.3905217 1.023539 -0.3905164 1.414059 0L7.16406 5.7548H18c0.7956 0 1.5585 0.3163 2.1211 0.87891 0.5626 0.5626 0.8789 1.32547 0.8789 2.12109v0.5h1.5c0.3978 0 0.7792 0.15815 1.0605 0.43946 0.2813 0.2813 0.4395 0.66274 0.4395 1.06054v2.5c0 0.3978 -0.1582 0.7793 -0.4395 1.0606 -0.2813 0.2812 -0.6627 0.4394 -1.0605 0.4394H21v0.5c0 0.7956 -0.3163 1.5585 -0.8789 2.1211 -0.2294 0.2294 -0.4937 0.4149 -0.7783 0.5576l4.3193 4.3194c0.3903 0.3905 0.3905 1.0236 0 1.414s-1.0236 0.3903 -1.4141 0L0.337891 1.75676c-0.3904786 -0.39049 -0.3904079 -1.023535 0 -1.414066M14.7236 18.2548H3c-0.79562 0 -1.55849 -0.3163 -2.121094 -0.8789C0.316322 16.8133 0.0000280534 16.0504 0 15.2548v-6.5c0 -0.79562 0.31633 -1.55849 0.878906 -2.12109 0.396214 -0.39621 0.892304 -0.66754 1.428714 -0.79492z\" stroke-width=\"1\"></path> </svg>"}];
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
