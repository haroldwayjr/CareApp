
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

const BATCH = [{"setName":"icon/misc/smartphone","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Smartphone-Pay-Dollar-2--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M14.485 2.5a2.5 2.5 0 0 0 -2.5 -2.5h-9a2.5 2.5 0 0 0 -2.5 2.5v19a2.5 2.5 0 0 0 2.5 2.5h9.24a8.099 8.099 0 0 1 -3.243 -5H2.735a0.25 0.25 0 0 1 -0.25 -0.25V4.25a0.25 0.25 0 0 1 0.25 -0.25h9.5a0.25 0.25 0 0 1 0.25 0.25v4.133a1 1 0 0 0 2 0zM10.518 19a6.596 6.596 0 1 1 12.803 -3.191A6.596 6.596 0 0 1 10.518 19m-4.035 2.5a1 1 0 1 1 2 0 1 1 0 0 1 -2 0M17.7 15.093a1.528 1.528 0 0 0 -0.744 -0.145c-0.429 0 -0.793 0.138 -1.036 0.326 -0.245 0.19 -0.328 0.394 -0.328 0.545 0 0.148 0.08 0.342 0.32 0.524 0.241 0.182 0.607 0.317 1.044 0.317 0.728 0 1.418 0.216 1.943 0.607 0.528 0.393 0.92 0.994 0.92 1.723 0 0.728 -0.391 1.33 -0.917 1.725 -0.34 0.256 -0.75 0.439 -1.196 0.535v0.387a0.75 0.75 0 0 1 -1.5 0v-0.378a3.032 3.032 0 0 1 -1.757 -1.13 0.75 0.75 0 1 1 1.197 -0.904 1.528 1.528 0 0 0 1.31 0.605c0.439 0 0.805 -0.134 1.045 -0.314 0.238 -0.179 0.319 -0.372 0.319 -0.526s-0.08 -0.343 -0.317 -0.52c-0.239 -0.178 -0.606 -0.31 -1.047 -0.31 -0.733 0 -1.424 -0.225 -1.947 -0.62 -0.524 -0.395 -0.917 -0.996 -0.917 -1.72 0 -0.721 0.39 -1.329 0.909 -1.731 0.34 -0.264 0.753 -0.456 1.205 -0.558v-0.359a0.75 0.75 0 0 1 1.5 0v0.347a3.026 3.026 0 0 1 1.757 1.13 0.75 0.75 0 1 1 -1.197 0.904 1.528 1.528 0 0 0 -0.566 -0.46\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"},{"setName":"icon/misc/snow","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Weather-Snow--Streamline-Ultimate\"> <g> <g> <path d=\"M22.09 12.07a0.25 0.25 0 0 1 -0.09 -0.19 7 7 0 0 0 -13.66 -2 0.23 0.23 0 0 1 -0.22 0.17 5.5 5.5 0 0 0 -1.57 10.59 0.25 0.25 0 0 0 0.28 -0.07 0.24 0.24 0 0 0 0 -0.29A2.5 2.5 0 0 1 6.5 19a2 2 0 0 1 0 -0.43 0.25 0.25 0 0 0 -0.1 -0.24A3.5 3.5 0 0 1 8.5 12l0.5 0a1 1 0 0 0 1.11 -0.83A5 5 0 0 1 20 12l0 0.43a1 1 0 0 0 0.5 1 3 3 0 0 1 0.88 4.45 0.28 0.28 0 0 0 0 0.25 2.52 2.52 0 0 1 0 1.82 0.25 0.25 0 0 0 0.07 0.28 0.26 0.26 0 0 0 0.3 0 5 5 0 0 0 0.39 -8.14Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 21a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 21a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8 19a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 17a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 19a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 17a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18 19a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> <path d=\"M8.25 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2.88 4.3a1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.42l-0.71 -0.7a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 8.25a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.08 2.42a1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 -0.29 0.67A0.25 0.25 0 0 0 12 4a8.75 8.75 0 0 1 2.12 -0.5 0.23 0.23 0 0 0 0.22 -0.19 1 1 0 0 0 -0.26 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.46 9.54a0.25 0.25 0 0 0 0.12 -0.29 2.76 2.76 0 0 1 -0.1 -0.77 3 3 0 0 1 3 -3 2.91 2.91 0 0 1 1.1 0.21 0.28 0.28 0 0 0 0.25 0 8 8 0 0 1 1.37 -0.92 0.23 0.23 0 0 0 0.13 -0.21 0.22 0.22 0 0 0 -0.11 -0.22 5 5 0 0 0 -7.74 4.14 5.13 5.13 0 0 0 0.33 1.8 0.26 0.26 0 0 0 0.18 0.16 0.23 0.23 0 0 0 0.22 -0.06 7.19 7.19 0 0 1 1.25 -0.84\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
