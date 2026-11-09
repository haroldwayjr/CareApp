
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

const BATCH = [{"setName": "icon/actions/save", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Floppy-Disk--Streamline-Ultimate\"> <g> <path d=\"M22 0H5.91A2 2 0 0 0 4.5 0.59L0.59 4.5A2 2 0 0 0 0 5.91V22a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2Zm-3.5 2a0.5 0.5 0 0 1 0.5 0.5v4A1.5 1.5 0 0 1 17.5 8h-10A1.5 1.5 0 0 1 6 6.5v-4a0.5 0.5 0 0 1 0.5 -0.5ZM5 22a0.5 0.5 0 0 1 -0.5 -0.5v-8A1.5 1.5 0 0 1 6 12h13a1.5 1.5 0 0 1 1.5 1.5v8a0.5 0.5 0 0 1 -0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15 4.25v1.5a0.75 0.75 0 0 0 1.5 0v-1.5a0.75 0.75 0 0 0 -1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7 16.25h6.5a0.75 0.75 0 0 0 0 -1.5H7a0.75 0.75 0 0 0 0 1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7 20.25h11a0.75 0.75 0 0 0 0 -1.5H7a0.75 0.75 0 0 0 0 1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/search.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Search-1--Streamline-Ultimate\"> <path d=\"M23.41 20.59 18.77 16a10.25 10.25 0 1 0 -8.52 4.56 10.14 10.14 0 0 0 5.69 -1.74l4.65 4.65a2 2 0 0 0 2.82 0 2 2 0 0 0 0 -2.88ZM10.25 3A7.25 7.25 0 1 1 3 10.26 7.26 7.26 0 0 1 10.25 3Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
