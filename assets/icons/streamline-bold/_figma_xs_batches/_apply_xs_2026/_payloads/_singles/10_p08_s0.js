
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

const BATCH = [{"setName": "icon/actions/trash", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bin--Streamline-Ultimate\"> <g> <path d=\"M19.5 7.5h-15A0.5 0.5 0 0 0 4 8v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V8a0.5 0.5 0 0 0 -0.5 -0.5Zm-9.25 13a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Zm5 0a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 4h-4.75a0.25 0.25 0 0 1 -0.25 -0.25V2.5A2.5 2.5 0 0 0 14.5 0h-5A2.5 2.5 0 0 0 7 2.5v1.25a0.25 0.25 0 0 1 -0.25 0.25H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0 -2ZM9 3.75V2.5a0.5 0.5 0 0 1 0.5 -0.5h5a0.5 0.5 0 0 1 0.5 0.5v1.25a0.25 0.25 0 0 1 -0.25 0.25h-5.5A0.25 0.25 0 0 1 9 3.75Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];

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
