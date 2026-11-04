
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

const BATCH = [{"setName": "icon/misc/key", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Key-Lock--Streamline-Ultimate\"> <g> <path d=\"M22 6.5h-0.5V5a5 5 0 0 0 -10 0v1.5a2 2 0 0 0 -2 2v4.09a0.26 0.26 0 0 0 0.1 0.2 7.17 7.17 0 0 1 2.19 2.54 0.24 0.24 0 0 0 0.22 0.14h5.92A3 3 0 0 1 21 18.24a0.25 0.25 0 0 0 0.25 0.23H22a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -1.97M13.5 5a3 3 0 0 1 6 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-5.5a0.25 0.25 0 0 1 -0.25 -0.25Zm4 7.26v1.21a0.75 0.75 0 0 1 -1.5 0v-1.21a1.5 1.5 0 1 1 1.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.5 18.41A1.54 1.54 0 0 0 17.93 17h-7.1a5.54 5.54 0 0 0 -5.3 -4L5 13a5.6 5.6 0 0 0 -5 5.49A5.52 5.52 0 0 0 5.52 24a5.48 5.48 0 0 0 5.29 -4h0.51a0.25 0.25 0 0 1 0.22 0.13l0.94 1.66a0.48 0.48 0 0 0 0.43 0.25 0.5 0.5 0 0 0 0.43 -0.23l1.06 -1.69a0.24 0.24 0 0 1 0.21 -0.11h0.21a0.25 0.25 0 0 1 0.22 0.13l0.96 1.62a0.48 0.48 0 0 0 0.43 0.25 0.5 0.5 0 0 0 0.43 -0.23L18 20a1.51 1.51 0 0 0 1.5 -1.59m-15 1.32a1.25 1.25 0 1 1 1.25 -1.25 1.25 1.25 0 0 1 -1.25 1.25\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/keyboard", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Keyboard--Streamline-Ultimate\"> <path d=\"M21.5 13H4.75a0.25 0.25 0 0 1 -0.25 -0.25v-0.25a2 2 0 0 1 2 -2h13a4.5 4.5 0 0 0 0 -9H13a0.5 0.5 0 0 1 -0.5 -0.5 1 1 0 0 0 -2 0A2.5 2.5 0 0 0 13 3.5h6.5a2.5 2.5 0 0 1 0 5h-13a4 4 0 0 0 -4 4v0.26a0.25 0.25 0 0 1 -0.23 0.25A2.51 2.51 0 0 0 0 15.5v6A2.5 2.5 0 0 0 2.5 24h19a2.5 2.5 0 0 0 2.5 -2.5v-6a2.5 2.5 0 0 0 -2.5 -2.5m-0.25 7.5h-0.5a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1m0 -3h-0.5a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1m-14.75 2h11a0.5 0.5 0 0 1 0 1h-11a0.5 0.5 0 0 1 0 -1m-0.75 -2a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1Zm2.5 -0.5a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3 0a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3 0a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3.51 0.5a0.5 0.5 0 0 1 0 -1h0.49a0.5 0.5 0 0 1 0 1Zm-14.51 -1a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 0 -1Zm-0.5 3h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 0 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
