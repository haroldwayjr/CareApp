
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

const BATCH = [{"setName": "icon/misc/bus", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bus--Streamline-Ultimate\"> <path d=\"M20.25 6.5a0.24 0.24 0 0 1 -0.25 -0.25V2.5A2.5 2.5 0 0 0 17.5 0h-11A2.5 2.5 0 0 0 4 2.5v3.75a0.25 0.25 0 0 1 -0.25 0.25H1.5A1.5 1.5 0 0 0 0 8v5a1.5 1.5 0 0 0 1.5 1.5 1 1 0 0 0 1 -1v-5h1.25a0.25 0.25 0 0 1 0.25 0.25v10.73A1.5 1.5 0 0 0 5.29 21a0.26 0.26 0 0 1 0.21 0.25V23a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-1.77a0.25 0.25 0 0 1 0.25 -0.23h4.5a0.25 0.25 0 0 1 0.25 0.25V23a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-1.79a0.26 0.26 0 0 1 0.21 -0.25A1.5 1.5 0 0 0 20 19.48V8.75a0.25 0.25 0 0 1 0.25 -0.25h1.25v5a1 1 0 0 0 1 1A1.5 1.5 0 0 0 24 13V8a1.5 1.5 0 0 0 -1.5 -1.5Zm-2.75 1a0.5 0.5 0 0 1 0.5 0.5v6a0.5 0.5 0 0 1 -0.5 0.5h-11A0.5 0.5 0 0 1 6 14V8a0.5 0.5 0 0 1 0.5 -0.5ZM9.5 4V3a0.5 0.5 0 0 1 0.5 -0.5h4a0.5 0.5 0 0 1 0.5 0.5v1a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.5 -0.5m0.75 14a0.76 0.76 0 0 1 -0.75 0.75h-3a0.75 0.75 0 0 1 0 -1.5h3a0.76 0.76 0 0 1 0.75 0.75m4.25 0.75a0.75 0.75 0 0 1 0 -1.5h3a0.75 0.75 0 0 1 0 1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/misc/cake", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cake-Flour--Streamline-Ultimate\"> <g> <path d=\"M18 10.5a4.51 4.51 0 0 1 -2.7 -0.9 0.48 0.48 0 0 0 -0.6 0 4.5 4.5 0 0 1 -5.4 0 0.48 0.48 0 0 0 -0.6 0 4.51 4.51 0 0 1 -2.7 0.9 4.44 4.44 0 0 1 -1.32 -0.2 0.52 0.52 0 0 0 -0.42 0.06 0.47 0.47 0 0 0 -0.22 0.37c-0.45 4.1 -1 9.8 -1 10.77A2.5 2.5 0 0 0 5.5 24h13a2.5 2.5 0 0 0 2.5 -2.5c0 -1 -0.59 -6.67 -1 -10.77a0.49 0.49 0 0 0 -0.22 -0.37 0.52 0.52 0 0 0 -0.42 -0.06 4.44 4.44 0 0 1 -1.36 0.2m-1.5 8a0.5 0.5 0 0 1 -0.5 0.5H8a0.5 0.5 0 0 1 -0.5 -0.5v-4A0.5 0.5 0 0 1 8 14h8a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.66 4.5a0.5 0.5 0 0 0 -0.48 0.36A4.12 4.12 0 0 0 3 6a3 3 0 0 0 5.76 1.17 0.26 0.26 0 0 1 0.48 0 3 3 0 0 0 5.52 0 0.26 0.26 0 0 1 0.48 0A3 3 0 0 0 21 6a4.12 4.12 0 0 0 -0.18 -1.14 0.5 0.5 0 0 0 -0.48 -0.36Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.5 0h17s1 0 1 1v1s0 1 -1 1h-17s-1 0 -1 -1V1s0 -1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
