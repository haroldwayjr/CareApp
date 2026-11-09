
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

const BATCH = [{"setName": "icon/files/blog", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Blogger-Logo--Streamline-Ultimate\"> <path d=\"M24 10.31a1.54 1.54 0 0 0 -0.66 -1.19L23.22 9c-0.3 -0.24 -0.77 -0.26 -1.58 -0.28a4 4 0 0 1 -1.53 -0.2 2.75 2.75 0 0 1 -0.42 -1.49l0 -0.18a6.17 6.17 0 0 0 -0.6 -2.41L19 4.27A8.51 8.51 0 0 0 12.89 0h-5.1A7.8 7.8 0 0 0 0 7.79v8.51a7.79 7.79 0 0 0 7.79 7.79h8.37A7.83 7.83 0 0 0 24 16.31l0 -5.9a0.34 0.34 0 0 0 0 -0.1M8 6h4a2 2 0 0 1 0 4H8a2 2 0 0 1 0 -4m8 12H8a2 2 0 0 1 0 -4h8a2 2 0 0 1 0 4\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/bookmark", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Bookmark-3--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M17.3996 1.42712c1.2142 0 2.15 0.93583 2.15 2.15003V21.1052c0 0.571 -0.2976 1.0547 -0.7616 1.3003 -0.4549 0.2408 -1.0093 0.2218 -1.4743 -0.0572 -0.0153 -0.0092 -0.0303 -0.019 -0.0449 -0.0292l-5.2692 -3.6977 -5.26917 3.6977c-0.01463 0.0102 -0.02962 0.02 -0.04495 0.0292 -0.47898 0.2874 -1.04541 0.2849 -1.49442 0.0722 -0.46239 -0.219 -0.84145 -0.6866 -0.84145 -1.3153V3.57715c0 -1.2142 0.93577 -2.15003 2.15 -2.15003z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];

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
