
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

const BATCH = [{"setName": "icon/actions/paste", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Copy-Paste--Streamline-Ultimate\"> <g> <path d=\"M13.4 4.73a0.24 0.24 0 0 0 0.2 0.26 1.09 1.09 0 0 1 0.82 1.11v1.4a1.24 1.24 0 0 0 1.25 1.24 1.23 1.23 0 0 0 1.24 -1.24V4a1.5 1.5 0 0 0 -1.49 -1.5h-1.73a0.29 0.29 0 0 0 -0.18 0.07 0.26 0.26 0 0 0 -0.07 0.18c0 0.45 0 1.47 -0.04 1.98\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9 21.26A1.23 1.23 0 0 0 7.71 20H3.48a1.07 1.07 0 0 1 -1 -1.14V6.1A1.08 1.08 0 0 1 3.33 5a0.25 0.25 0 0 0 0.2 -0.26l0 -2a0.25 0.25 0 0 0 -0.25 -0.25H1.5A1.5 1.5 0 0 0 0 4v17a1.5 1.5 0 0 0 1.49 1.5h6.22A1.24 1.24 0 0 0 9 21.26\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.94 4.47v-2a0.5 0.5 0 0 0 -0.5 -0.49h-0.76a0.26 0.26 0 0 1 -0.25 -0.22 2 2 0 0 0 -3.95 0 0.25 0.25 0 0 1 -0.25 0.24h-0.76a0.49 0.49 0 0 0 -0.47 0.48v2a0.49 0.49 0 0 0 0.49 0.5h6a0.5 0.5 0 0 0 0.45 -0.51\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 17.27h-4a0.75 0.75 0 0 0 0 1.5h4a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.29 14.54a0.76 0.76 0 0 0 0.75 0.75h2.49a0.75 0.75 0 0 0 0 -1.5H15a0.76 0.76 0 0 0 -0.71 0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.5 13.46a2 2 0 0 0 -0.58 -1.41l-1.41 -1.4a2 2 0 0 0 -1.41 -0.59h-7.61a2 2 0 0 0 -2 2V22a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2Zm-11 -0.4a1 1 0 0 1 1 -1h6.19a1 1 0 0 1 0.71 0.29l0.82 0.82a1 1 0 0 1 0.29 0.7V21a1 1 0 0 1 -1 1h-7a1 1 0 0 1 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/pin", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Pin--Streamline-Ultimate\"> <g> <path d=\"M23.49 6.27 17.73 0.51a1.48 1.48 0 0 0 -1.05 -0.43 1.5 1.5 0 0 0 -1.25 0.68l-4.1 6.45A7.47 7.47 0 0 0 5.86 8a1.47 1.47 0 0 0 -0.29 2.32l8.1 8.1a1.5 1.5 0 0 0 1.24 0.43 1.53 1.53 0 0 0 1.09 -0.71 7.49 7.49 0 0 0 0.8 -5.47l6.44 -4.1a1.48 1.48 0 0 0 0.25 -2.3Zm-6.2 -2.84 -2.12 3.33a0.5 0.5 0 1 1 -0.84 -0.54l2.12 -3.33a0.5 0.5 0 1 1 0.84 0.54Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.45 15.43 0.51 21.37a1.51 1.51 0 0 0 0 2.12 1.53 1.53 0 0 0 2.13 0l5.94 -5.94a1.5 1.5 0 0 0 -2.13 -2.12Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
