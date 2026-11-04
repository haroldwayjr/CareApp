
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

const BATCH = [{"setName": "icon/health/oxygen", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Oxygen-Tank-O2-1--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M3.34815 0.948242c-0.55229 0 -1 0.447718 -1 0.999998 0 0.55229 0.44771 1 1 1h0.43823l0 1.39917h-0.97965c-0.19904 0 -0.38993 0.07913 -0.5306 0.21995 -0.14068 0.14082 -0.2196 0.33179 -0.2194 0.53084l0.0026 2.48064C0.957933 8.31835 0.225111 9.56773 0.20105 10.9905c0.035803 -0.0039 0.072174 -0.0059 0.109009 -0.0059l8.953231 0c0.03702 0 0.07357 0.002 0.10955 0.006 -0.02403 -1.42258 -0.75661 -2.6718 -1.8577 -3.41137l0.00034 -0.32389c0.04123 0.00518 0.08324 0.00784 0.12588 0.00784l1.87671 0v0.43836c0 0.55228 0.44771 1 1.00003 1 0.5523 0 1 -0.44772 1 -1V4.82495c0 -0.55228 -0.4477 -1 -1 -1 -0.55232 0 -1.00003 0.44772 -1.00003 1v0.43823l-1.87671 0c-0.04192 0 -0.08324 0.00258 -0.1238 0.00759l0.00018 -0.17257c0.00021 -0.19905 -0.07872 -0.39002 -0.21939 -0.53084 -0.14068 -0.14082 -0.33156 -0.21995 -0.53061 -0.21995h-0.98136V2.94824h0.43835c0.55229 0 1 -0.44771 1 -1 0 -0.55228 -0.44771 -0.999998 -1 -0.999998zM0.205212 16.9219l-0.003213 -3.9431c0.035497 0.0039 0.07155 0.0058 0.10806 0.0058l8.953231 0c0.03669 0 0.07293 -0.002 0.1086 -0.0058l-0.00321 3.9432c-0.03463 -0.0036 -0.0698 -0.0055 -0.10539 -0.0055l-8.953231 0c-0.035409 0 -0.070388 0.0018 -0.104847 0.0054m0.001621 1.9893 0.000751 0.922C0.208696 21.1976 1.31505 22.303 2.67942 22.303h4.21505c1.36437 0 2.47073 -1.1054 2.47184 -2.4698l0.00075 -0.922c-0.03411 0.0035 -0.06873 0.0053 -0.10377 0.0053H0.310059c-0.034854 0 -0.069291 -0.0018 -0.103226 -0.0053M14.1031 10.6914c-0.8741 0 -1.5827 0.7086 -1.5827 1.5828v3.6959c0 0.8741 0.7086 1.5827 1.5827 1.5827h0.7421c0.8742 0 1.5828 -0.7086 1.5828 -1.5827v-3.6959c0 -0.8742 -0.7086 -1.5828 -1.5828 -1.5828zm-3.5827 1.5828c0 -1.9787 1.604 -3.58279 3.5827 -3.58279h0.7421c1.9787 0 3.5828 1.60409 3.5828 3.58279v3.6959c0 1.9787 -1.6041 3.5827 -3.5828 3.5827h-0.7421c-1.9787 0 -3.5827 -1.604 -3.5827 -3.5827zm10.434 4.7741c-0.9471 0 -1.7501 0.6058 -2.0477 1.4478 -0.1841 0.5208 0.0888 1.0921 0.6096 1.2761 0.5207 0.1841 1.092 -0.0888 1.276 -0.6096 0.0241 -0.0679 0.089 -0.1143 0.1621 -0.1143h0.8115c0.0779 0 0.1412 0.0633 0.1412 0.1412 0 0.0561 -0.0333 0.1069 -0.0846 0.1294l-1.7385 0.7606c-0.7904 0.3458 -1.3012 1.1267 -1.3012 1.9895v0.6657c0 0.5523 0.4478 1 1 1h3.1243c0.5522 0 1 -0.4477 1 -1s-0.4478 -1 -1 -1h-1.6167l1.3337 -0.5835c0.7794 -0.341 1.283 -1.111 1.283 -1.9617 0 -1.1825 -0.9587 -2.1412 -2.1412 -2.1412z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/patient", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Patient-Care--Streamline-Ultimate\"> <g> <path d=\"M20 17.78 16.47 19a0.29 0.29 0 0 0 -0.15 0.14 2 2 0 0 1 -1.82 1.19h-4a0.5 0.5 0 0 1 0 -1h4a1 1 0 0 0 0 -2H11c-0.31 0 -1.51 -1.5 -4 -1.5H5a4.06 4.06 0 0 0 -1.79 0.42l-3 1.51a0.24 0.24 0 0 0 -0.14 0.22v5.4a0.25 0.25 0 0 0 0.25 0.25 0.28 0.28 0 0 0 0.13 0l3.22 -2a1 1 0 0 1 0.86 -0.1c10 3.36 6.63 3.37 17.86 -2.31a0.52 0.52 0 0 0 0.24 -0.69 0.75 0.75 0 0 0 -0.14 -0.17 2.48 2.48 0 0 0 -2.49 -0.58\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.5 8.91a4.43 4.43 0 0 0 -2 0.45 0.38 0.38 0 0 0 -0.18 0.5 6.84 6.84 0 0 1 1 3.52 0.37 0.37 0 0 0 0.37 0.37h4.87a0.38 0.38 0 0 0 0.38 -0.37 4.49 4.49 0 0 0 -4.44 -4.47\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.65 5.72a2.81 2.81 0 1 0 5.62 0 2.81 2.81 0 1 0 -5.62 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.07 3.84a3.56 3.56 0 1 0 7.12 0 3.56 3.56 0 1 0 -7.12 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.25 13.41a5.63 5.63 0 1 0 -11.25 0 0.38 0.38 0 0 0 0.38 0.37h10.5a0.38 0.38 0 0 0 0.37 -0.37\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
