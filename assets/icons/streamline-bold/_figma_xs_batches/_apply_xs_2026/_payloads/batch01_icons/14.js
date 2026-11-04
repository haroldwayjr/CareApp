
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

const BATCH = [{"setName": "icon/health/mental.health", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Mental-Health-2--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6.90042 0.440796c0.27614 0 0.5 0.223857 0.5 0.5V3.62575h2.68498c0.2762 0 0.5 0.22385 0.5 0.5v2.75014c0 0.27615 -0.2238 0.5 -0.5 0.5H7.40041v2.68501c0 0.2762 -0.22385 0.5 -0.5 0.5H4.15027c-0.27614 0 -0.5 -0.2238 -0.5 -0.5V7.37589H0.965332c-0.276142 0 -0.5 -0.22385 -0.5 -0.5V4.12575c0 -0.27615 0.223858 -0.5 0.5 -0.5H3.65027V0.940796c0 -0.276142 0.22386 -0.5 0.5 -0.5zM4.45509 13.3796c-0.0996 -0.4358 -0.16543 -0.8766 -0.19777 -1.3187H6.9004c0.0529 0 0.10531 -0.002 0.15718 -0.0061 0.21314 1.2234 1.62413 1.7629 2.83461 1.2774l6.60941 -2.6511c1.2815 -0.514 1.9321 -2.0138 1.0312 -3.0601 -1.42 -1.64916 -3.4584 -2.53179 -5.4474 -2.31395v-1.1813c0 -0.53396 -0.2092 -1.01905 -0.5502 -1.37774 0.4957 -0.08563 1 -0.12899 1.5077 -0.12844 1.6528 0.00004 3.0097 0.34109 4.1471 0.96735 1.1359 0.6255 2.024 1.51954 2.7636 2.5831 1.2109 1.74133 2.0601 4.00138 2.9487 6.36648l0.0001 0.0003 0.0007 0.0019c0.1818 0.4837 0.3652 0.9719 0.5537 1.4609l0.0003 0.0008c0.0677 0.1764 0.0914 0.3665 0.0693 0.5542 -0.0222 0.1876 -0.0896 0.367 -0.1965 0.5228 -0.1069 0.1557 -0.2501 0.2832 -0.4172 0.3713 -0.1671 0.0882 -0.3531 0.1344 -0.542 0.1347h-1.1846v2.1586c0 0.8377 -0.3328 1.6411 -0.9251 2.2335 -0.5924 0.5924 -1.3958 0.9251 -2.2335 0.9251h-0.8293v2.1587c0 0.2761 -0.2239 0.5 -0.5 0.5H7.39299c-0.27614 0 -0.5 -0.2239 -0.5 -0.5v-5.3375c-1.21265 -1.1814 -2.05998 -2.6888 -2.4379 -4.3422\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
;
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
