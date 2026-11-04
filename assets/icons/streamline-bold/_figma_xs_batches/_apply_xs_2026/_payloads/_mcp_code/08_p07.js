
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

const BATCH = [{"setName": "icon/actions/cut", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Scissors--Streamline-Ultimate\"> <path d=\"M20.75 14.12a4 4 0 0 0 -3.43 0.72 11.73 11.73 0 0 0 -1.12 -2.72 0.26 0.26 0 0 1 0 -0.24 11.73 11.73 0 0 0 1.12 -2.72 4 4 0 0 0 3.43 0.71A4 4 0 0 0 19.51 2a4.06 4.06 0 0 0 -3.76 4 10 10 0 0 1 -1 4.28 0.25 0.25 0 0 1 -0.41 0A11.47 11.47 0 0 0 5.75 6.5c-1.06 0 -4.29 0.34 -5.3 1.1a0.5 0.5 0 0 0 0.16 0.88l11.63 3.28a0.25 0.25 0 0 1 0 0.48L0.61 15.52a0.5 0.5 0 0 0 -0.16 0.88c1 0.76 4.24 1.1 5.3 1.1a11.47 11.47 0 0 0 8.59 -3.86 0.25 0.25 0 0 1 0.41 0 10 10 0 0 1 1 4.28 4.06 4.06 0 0 0 3.76 4 4 4 0 0 0 1.24 -7.87Zm-1 5.88a2 2 0 1 1 2 -2 2 2 0 0 1 -2 2Zm0 -16a2 2 0 1 1 -2 2 2 2 0 0 1 2 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/delete", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0ZM5.29 5.29a9.63 9.63 0 0 1 12.23-1 .26.26 0 0 1 0 .4L4.67 17.56a.27.27 0 0 1-.4 0 9.49 9.49 0 0 1 1-12.24Zm13.46 13.47a9.53 9.53 0 0 1-12.23 1 .26.26 0 0 1 0-.4L19.37 6.49a.26.26 0 0 1 .4 0 9.49 9.49 0 0 1-1 12.24Z\" fill=\"#000000\"/></svg>"}];
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
