
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

const BATCH = [{"setName": "icon/media/rotate", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rotate--Streamline-Ultimate\"> <g> <path d=\"M10.66 3.33a2 2 0 0 0 -2.82 0L0.58 10.59a2 2 0 0 0 0 2.82l7.26 7.26a2 2 0 0 0 2.82 0l7.26 -7.26a2 2 0 0 0 0 -2.82ZM9.6 18.9a0.51 0.51 0 0 1 -0.71 0l-6.54 -6.55a0.5 0.5 0 0 1 0 -0.7L8.9 5.1a0.5 0.5 0 0 1 0.7 0l6.55 6.55a0.51 0.51 0 0 1 0 0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M24 12a3 3 0 0 0 -0.88 -2.12l-1.41 -1.42 0.35 -0.35a0.5 0.5 0 0 0 -0.28 -0.85l-2.48 -0.35a0.49 0.49 0 0 0 -0.56 0.56l0.35 2.53a0.5 0.5 0 0 0 0.85 0.28l0.35 -0.35 1.42 1.41a1 1 0 0 1 0 1.42l-1.42 1.41 -0.35 -0.35a0.5 0.5 0 0 0 -0.85 0.28l-0.35 2.48a0.49 0.49 0 0 0 0.56 0.56l2.48 -0.35a0.5 0.5 0 0 0 0.28 -0.85l-0.35 -0.35 1.41 -1.42A3 3 0 0 0 24 12\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/skip.back", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Previous--Streamline-Ultimate\"> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5 15.38a1 1 0 0 1 -1.67 0.74l-3.75 -3.38a1 1 0 0 1 0 -1.48l3.75 -3.38a1 1 0 0 1 1.67 0.74ZM10 8v8a1 1 0 0 1 -1 1H8a1 1 0 0 1 -1 -1V8a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
