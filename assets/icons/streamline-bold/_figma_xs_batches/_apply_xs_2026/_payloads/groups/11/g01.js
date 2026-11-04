
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

const BATCH = [{"setName": "icon/files/blog", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Blogger-Logo--Streamline-Ultimate\"> <path d=\"M24 10.31a1.54 1.54 0 0 0 -0.66 -1.19L23.22 9c-0.3 -0.24 -0.77 -0.26 -1.58 -0.28a4 4 0 0 1 -1.53 -0.2 2.75 2.75 0 0 1 -0.42 -1.49l0 -0.18a6.17 6.17 0 0 0 -0.6 -2.41L19 4.27A8.51 8.51 0 0 0 12.89 0h-5.1A7.8 7.8 0 0 0 0 7.79v8.51a7.79 7.79 0 0 0 7.79 7.79h8.37A7.83 7.83 0 0 0 24 16.31l0 -5.9a0.34 0.34 0 0 0 0 -0.1M8 6h4a2 2 0 0 1 0 4H8a2 2 0 0 1 0 -4m8 12H8a2 2 0 0 1 0 -4h8a2 2 0 0 1 0 4\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/bookmark", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Bookmark-3--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M17.3996 1.42712c1.2142 0 2.15 0.93583 2.15 2.15003V21.1052c0 0.571 -0.2976 1.0547 -0.7616 1.3003 -0.4549 0.2408 -1.0093 0.2218 -1.4743 -0.0572 -0.0153 -0.0092 -0.0303 -0.019 -0.0449 -0.0292l-5.2692 -3.6977 -5.26917 3.6977c-0.01463 0.0102 -0.02962 0.02 -0.04495 0.0292 -0.47898 0.2874 -1.04541 0.2849 -1.49442 0.0722 -0.46239 -0.219 -0.84145 -0.6866 -0.84145 -1.3153V3.57715c0 -1.2142 0.93577 -2.15003 2.15 -2.15003z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/box.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Text-Box-2--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M3.27577 0.560547C1.77619 0.560547 0.560547 1.77619 0.560547 3.27577c0 1.14629 0.710333 2.12668 1.714843 2.52499l0 12.39924c-1.00451 0.3983 -1.714843 1.3787 -1.714843 2.525 0 1.4996 1.215643 2.7152 2.715223 2.7152 1.14658 0 2.12717 -0.7107 2.52529 -1.7156H18.1997c0.3981 1.0049 1.3787 1.7156 2.5253 1.7156 1.4996 0 2.7152 -1.2156 2.7152 -2.7152 0 -1.1466 -0.7107 -2.1272 -1.7156 -2.5253V5.80106c1.0049 -0.39812 1.7156 -1.37871 1.7156 -2.52529 0 -1.49958 -1.2156 -2.715223 -2.7152 -2.715223 -1.1463 0 -2.1267 0.710333 -2.525 1.714843l-12.39924 0C5.40245 1.27088 4.42206 0.560547 3.27577 0.560547M18.1997 4.27539l-12.39864 0c-0.27555 0.69553 -0.83014 1.25012 -1.52567 1.52567l0 12.39864c0.69528 0.2754 1.24972 0.8297 1.52537 1.5249H18.2c0.2755 -0.6949 0.8297 -1.2491 1.5246 -1.5246V5.80076c-0.6952 -0.27565 -1.2495 -0.83009 -1.5249 -1.52537M7.64648 7.24805c-0.55228 0 -1 0.44771 -1 1 0 0.55228 0.44772 1 1 1H12c0.5523 0 1 -0.44772 1 -1 0 -0.55229 -0.4477 -1 -1 -1zm-1 4.74995c0 -0.5522 0.44772 -1 1 -1h8.70702c0.5523 0 1 0.4478 1 1 0 0.5523 -0.4477 1 -1 1H7.64648c-0.55228 0 -1 -0.4477 -1 -1m1 2.75c-0.55228 0 -1 0.4478 -1 1 0 0.5523 0.44772 1 1 1h8.70702c0.5523 0 1 -0.4477 1 -1 0 -0.5522 -0.4477 -1 -1 -1z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/cabinet", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bathroom-Mirror-Cabinet--Streamline-Ultimate\"> <g> <path d=\"M23 13.44V2.4A1.45 1.45 0 0 0 21.6 1H2.4A1.45 1.45 0 0 0 1 2.4v11a1 1 0 1 0 0 1.92h1.8a1 1 0 0 0 0.12 -1.91V3.38a0.5 0.5 0 0 1 0.5 -0.5h17.2a0.5 0.5 0 0 1 0.5 0.5v10.06H21a1 1 0 0 0 0 1.92h2a1 1 0 0 0 0 -1.92\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.72 12.48a1 1 0 0 0 -1 -1H16.6a0.48 0.48 0 0 1 -0.43 -0.25 0.48 0.48 0 0 1 0 -0.49A4.39 4.39 0 0 0 16.8 9a0.47 0.47 0 0 0 -0.48 -0.48h-4.78A0.5 0.5 0 0 1 11 8V6.56a0.48 0.48 0 0 1 1 0 1 1 0 1 0 1.92 0 2.4 2.4 0 0 0 -4.8 0V8a0.5 0.5 0 0 1 -0.5 0.5h-0.94a0.47 0.47 0 0 0 -0.48 0.5 4.39 4.39 0 0 0 0.64 1.82 0.48 0.48 0 0 1 0 0.49 0.48 0.48 0 0 1 -0.43 0.25H6.24a1 1 0 0 0 -1 1v9.6a1 1 0 0 0 1 1h11.52a1 1 0 0 0 1 -1Zm-1.92 8.16a0.48 0.48 0 0 1 -0.48 0.48H7.68a0.48 0.48 0 0 1 -0.48 -0.48v-1.92a0.48 0.48 0 0 1 0.48 -0.48h8.64a0.48 0.48 0 0 1 0.48 0.48Zm0 -4.8a0.48 0.48 0 0 1 -0.48 0.48H7.68a0.48 0.48 0 0 1 -0.48 -0.48v-1.92a0.48 0.48 0 0 1 0.48 -0.48h8.64a0.48 0.48 0 0 1 0.48 0.48Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 14.4h-2a0.48 0.48 0 0 0 0 1h2a0.48 0.48 0 0 0 0 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 19.2h-2a0.48 0.48 0 0 0 0 1h2a0.48 0.48 0 0 0 0 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
