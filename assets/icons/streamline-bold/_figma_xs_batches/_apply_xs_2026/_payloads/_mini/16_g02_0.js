
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

const BATCH = [{"setName": "icon/status/success", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Circle--Streamline-Ultimate\"> <g> <path d=\"M12.84 18.32a3 3 0 0 1 -4.45 0.24L4.87 15a3.1 3.1 0 0 1 -0.23 -4.24A3 3 0 0 1 9 10.68l1.08 1.08a0.25 0.25 0 0 0 0.37 0l4.44 -5.51a0.25 0.25 0 0 0 -0.07 -0.37 9.67 9.67 0 0 0 -6.28 -1.37 9.75 9.75 0 1 0 10.83 11.35 9.89 9.89 0 0 0 -0.32 -4.62 0.26 0.26 0 0 0 -0.44 -0.08Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.44 0.39a1.5 1.5 0 0 0 -2.11 0.23L10.39 14.2l-2.46 -2.46a1.51 1.51 0 0 0 -2.12 0 1.49 1.49 0 0 0 0 2.12l3.64 3.64a1.51 1.51 0 0 0 2.22 -0.12l12 -14.88a1.51 1.51 0 0 0 -0.23 -2.11\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/status/unlock", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock-Unlock--Streamline-Ultimate\"> <path d=\"M19.5 9.5h-0.75V6.75A6.75 6.75 0 0 0 5.53 4.81a1.25 1.25 0 0 0 2.4 0.72 4.25 4.25 0 0 1 8.32 1.22V9a0.5 0.5 0 0 1 -0.5 0.5H4.5a2 2 0 0 0 -2 2V22a2 2 0 0 0 2 2h15a2 2 0 0 0 2 -2V11.5a2 2 0 0 0 -2 -2m-9.5 6a2 2 0 0 1 4 0 2 2 0 0 1 -1 1.72v2.28a1 1 0 0 1 -2 0v-2.28a2 2 0 0 1 -1 -1.72\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
