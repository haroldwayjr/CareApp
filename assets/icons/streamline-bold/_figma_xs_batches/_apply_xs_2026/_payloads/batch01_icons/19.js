
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

const BATCH = [{"setName": "icon/health/nurse", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Nurse-With-Cap-Cloth--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12 16.674c1.027 0 2.02 0.144 2.96 0.41l-2.933 3.496 -3.057 -3.476c0.961 -0.28 1.977 -0.43 3.03 -0.43m-9.901 6.25a11.185 11.185 0 0 1 5.369 -5.26L13.04 24H2.772a0.749 0.749 0 0 1 -0.673 -1.076m10.929 -1.206L15.035 24h6.193a0.749 0.749 0 0 0 0.673 -1.076 11.183 11.183 0 0 0 -5.444 -5.294l-3.43 4.088Zm-5.684 -1.712c0.413 0 0.748 0.335 0.748 0.749v0.222h0.223a0.749 0.749 0 0 1 0 1.498h-0.223v0.222a0.749 0.749 0 1 1 -1.497 0v-0.222h-0.223a0.749 0.749 0 1 1 0 -1.498h0.223v-0.222a0.75 0.75 0 0 1 0.749 -0.75Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12 5.53c-1.893 0 -3.25 0.58 -4.183 1.472C6.9 7.879 6.46 8.992 6.26 9.95a0.75 0.75 0 0 0 -0.016 0.154c0 3.163 2.63 5.666 5.757 5.666s5.757 -2.503 5.757 -5.666a0.747 0.747 0 0 0 -0.014 -0.147c-0.201 -1.004 -0.64 -2.123 -1.564 -2.993a4.957 4.957 0 0 0 -1.88 -1.097c-0.664 -0.219 -1.427 -0.336 -2.3 -0.336M7.792 10.75c2.647 0.362 5.274 -0.935 6.622 -3.217 0.292 0.152 0.535 0.33 0.738 0.521 0.605 0.57 0.938 1.332 1.107 2.123 -0.04 2.267 -1.948 4.096 -4.259 4.096 -2.113 0 -3.889 -1.529 -4.208 -3.523M12 5.53\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12 0c4.007 0 7.77 2.277 7.77 5.19 0 0.298 -0.6 1.387 -1.241 2.464a6.401 6.401 0 0 0 -1.324 -1.781 6.243 6.243 0 0 0 -1.164 -0.86l0.435 -0.82a0.749 0.749 0 0 0 -1.323 -0.703l-0.486 0.915a8.432 8.432 0 0 0 -1.918 -0.38v-0.719a0.749 0.749 0 1 0 -1.498 0v0.723a8.46 8.46 0 0 0 -1.911 0.39l-0.493 -0.929a0.749 0.749 0 1 0 -1.323 0.702l0.445 0.84a6.23 6.23 0 0 0 -1.126 0.83 6.549 6.549 0 0 0 -1.37 1.83C4.83 6.622 4.228 5.53 4.228 5.19 4.23 2.277 7.993 0 12 0\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
