
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

const BATCH = [{"setName": "icon/misc/globe", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Earth-1--Streamline-Ultimate\"> <path d=\"M24 12a12 12 0 1 0 -12 12h0.12A11.89 11.89 0 0 0 24 12.12zm-2 0a9.94 9.94 0 0 1 -0.36 2.63 0.49 0.49 0 0 1 -0.26 0.32 0.51 0.51 0 0 1 -0.38 0.05 3.47 3.47 0 0 1 -1.52 -1.27l-2.22 -3.33a2.5 2.5 0 0 0 -2.08 -1.11h-0.43a2.75 2.75 0 0 1 0 -5.5h2.77a0.48 0.48 0 0 1 0.29 0.09A10 10 0 0 1 22 12M2.18 10.16a0.49 0.49 0 0 1 0.49 -0.41H7a3.44 3.44 0 0 1 2.47 1l1.13 1.15a3.5 3.5 0 0 1 0.14 4.8l-1.36 1.53a2.49 2.49 0 0 0 -0.63 1.66v0.83a0.49 0.49 0 0 1 -0.23 0.42 0.52 0.52 0 0 1 -0.47 0A10 10 0 0 1 2 12a9.26 9.26 0 0 1 0.18 -1.84\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/misc/graduation", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Graduation-Hat--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23.325 7.258a0.654 0.654 0 0 1 0 1.214l-10.762 4.34c-0.422 0.17 -0.894 0.169 -1.314 -0.003L3.26 9.539l0 7.901a2.128 2.128 0 0 1 1.262 1.95v3.452a0.5 0.5 0 0 1 -0.5 0.5H0.753a0.5 0.5 0 0 1 -0.5 -0.5V19.39c0 -0.873 0.517 -1.62 1.263 -1.951l0 -8.615 -0.867 -0.354a0.655 0.655 0 0 1 0 -1.212l10.6 -4.338c0.42 -0.172 0.892 -0.173 1.314 -0.003l10.762 4.34Zm-10.273 6.768 5.85 -2.359v3.837a0.795 0.795 0 0 1 -0.344 0.668c-0.888 0.596 -3.417 2.074 -6.65 2.074 -3.234 0 -5.647 -1.48 -6.486 -2.074a0.787 0.787 0 0 1 -0.323 -0.65v-3.816l5.654 2.314a3.055 3.055 0 0 0 2.3 0.006Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
