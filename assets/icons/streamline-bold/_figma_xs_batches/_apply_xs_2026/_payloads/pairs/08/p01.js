
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

const BATCH = [{"setName":"icon/actions/browse","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"E-Commerce-Apparel-Browse--Streamline-Ultimate\"> <g> <path d=\"M16 16v-3.25a0.25 0.25 0 0 1 0.25 -0.25h1.25a0.49 0.49 0 0 0 0.39 -0.19 0.51 0.51 0 0 0 0.1 -0.43l-0.82 -3.24a1.49 1.49 0 0 0 -1.45 -1.14H13.5a0.5 0.5 0 0 0 -0.5 0.5 1 1 0 0 1 -2 0 0.5 0.5 0 0 0 -0.5 -0.5H8.28a1.49 1.49 0 0 0 -1.45 1.14L6 11.88a0.51 0.51 0 0 0 0.1 0.43 0.49 0.49 0 0 0 0.39 0.19h1.26a0.25 0.25 0 0 1 0.25 0.25V16a0.5 0.5 0 0 0 0.5 0.5h7a0.5 0.5 0 0 0 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m20.8 18.6 -2 -1.5a0.5 0.5 0 0 0 -0.8 0.4v0.5a0.25 0.25 0 0 1 -0.25 0.25H16.5a0.75 0.75 0 0 0 0 1.5h1.25A0.25 0.25 0 0 1 18 20v0.5a0.51 0.51 0 0 0 0.28 0.45 0.54 0.54 0 0 0 0.22 0.05 0.47 0.47 0 0 0 0.3 -0.1l2 -1.5a0.5 0.5 0 0 0 0 -0.8\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.5 18.25H6.25A0.25 0.25 0 0 1 6 18v-0.5a0.5 0.5 0 0 0 -0.8 -0.4l-2 1.5a0.5 0.5 0 0 0 0 0.8l2 1.5a0.47 0.47 0 0 0 0.3 0.1 0.54 0.54 0 0 0 0.22 0 0.51 0.51 0 0 0 0.28 -0.5V20a0.25 0.25 0 0 1 0.25 -0.25H7.5a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M24 2a2 2 0 0 0 -2 -2H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2ZM6 2.5a1 1 0 1 1 1 1 1 1 0 0 1 -1 -1m3.5 0a1 1 0 1 1 1 1 1 1 0 0 1 -1 -1m-6 -1a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1M2.5 22a0.5 0.5 0 0 1 -0.5 -0.5V6a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5v15.5a0.5 0.5 0 0 1 -0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"},{"setName":"icon/actions/cancel","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Lock-Cancel-Slash--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M16.15 5.93115c0 -2.0477 -1.6523 -3.69995 -3.7 -3.69995 -2.0478 0 -3.70005 1.65225 -3.70005 3.69995v1.92312H16.15zm2 1.92312V5.93115c0 -3.1523 -2.5478 -5.699949 -5.7 -5.699949 -3.15232 0 -5.70005 2.547649 -5.70005 5.699949v1.92312H6.6123L1.89232 3.87511c-0.42225 -0.35598 -1.053134 -0.30225 -1.409114 0.12 -0.355978 0.42226 -0.302252 1.05314 0.120001 1.40912l0.472623 0.39844c0.02362 0.01571 0.0466 0.03292 0.06881 0.05165L22.1867 23.5938c0.4188 0.2878 0.9957 0.2163 1.3301 -0.1803 0.356 -0.4223 0.3023 -1.0531 -0.12 -1.4091l-2.9252 -2.4661c0.0186 -0.109 0.0283 -0.2206 0.0283 -0.3341l0 -9.29988c0 -1.11418 -0.9357 -2.05005 -2.05 -2.05005zM17.0845 21.2543 4.3999 10.5606l0.00005 8.6436c0 1.1142 0.93575 2.0501 2.05 2.0501z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
