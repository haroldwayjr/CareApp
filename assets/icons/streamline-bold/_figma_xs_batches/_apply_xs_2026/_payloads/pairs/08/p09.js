
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

const BATCH = [{"setName":"icon/actions/draft","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Workflow-Request-Draft--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6 7.365A3.752 3.752 0 0 0 5 0a3.75 3.75 0 0 0 -1 7.365v9.27A3.752 3.752 0 0 0 5 24a3.75 3.75 0 0 0 1 -7.365zm9.25 12.885a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1 -7.5 0m2.375 -6.833a1.375 1.375 0 1 0 2.75 0 1.375 1.375 0 0 0 -2.75 0m0 -4.833a1.375 1.375 0 1 0 2.75 0 1.375 1.375 0 0 0 -2.75 0m0 -4.834a1.375 1.375 0 1 0 2.75 0 1.375 1.375 0 0 0 -2.75 0\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"},{"setName":"icon/actions/duplicate","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Duplicate--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0 2C0 0.895429 0.895431 0 2 0h14c1.1046 0 2 0.895432 2 2v1.5c0 0.55228 -0.4477 1 -1 1s-1 -0.44772 -1 -1V2L2 2v14h1.5c0.55228 0 1 0.4477 1 1s-0.44772 1 -1 1H2c-1.10457 0 -2 -0.8954 -2 -2V2Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M8 6c-1.10457 0 -2 0.89543 -2 2v14c0 1.1046 0.89543 2 2 2h14c1.1046 0 2 -0.8954 2 -2V8c0 -1.10457 -0.8954 -2 -2 -2H8Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
