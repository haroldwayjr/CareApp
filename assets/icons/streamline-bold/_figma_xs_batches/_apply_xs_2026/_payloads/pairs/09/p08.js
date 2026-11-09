
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

const BATCH = [{"setName": "icon/actions/quote.reply", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Quote--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23 2a1 1 0 1 0 0 -2H1a1 1 0 0 0 0 2h22ZM0 23a1 1 0 1 0 2 0l0 -11a1 1 0 1 0 -2 0v11Zm24 -11a1 1 0 0 1 -1 1H4.687a1 1 0 1 1 0 -2H23a1 1 0 0 1 1 1Zm-1 -4.5a1 1 0 1 0 0 -2l-22 0a1 1 0 0 0 0 2l22 0Zm1 10a1 1 0 0 1 -1 1H4.687a1 1 0 1 1 0 -2H23a1 1 0 0 1 1 1ZM23 24a1 1 0 1 0 0 -2H4.687a1 1 0 1 0 0 2H23Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/redo", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Redo--Streamline-Ultimate\"> <path d=\"M22.61 0.16a0.51 0.51 0 0 0 -0.55 0.11l-2.59 2.59a0.24 0.24 0 0 1 -0.29 0.05 12.54 12.54 0 0 0 -13 0.86 12.25 12.25 0 0 0 -0.08 19.86 1.25 1.25 0 0 0 0.73 0.24 1.22 1.22 0 0 0 1 -0.51 1.25 1.25 0 0 0 -0.27 -1.75 9.74 9.74 0 0 1 0.1 -15.8 10 10 0 0 1 9.46 -1.1 0.26 0.26 0 0 1 0.16 0.18 0.25 0.25 0 0 1 -0.07 0.22L15.37 7a0.49 0.49 0 0 0 -0.11 0.55 0.5 0.5 0 0 0 0.46 0.31h6.7a0.51 0.51 0 0 0 0.5 -0.5V0.62a0.51 0.51 0 0 0 -0.31 -0.46Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
