
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

const BATCH = [{"setName": "icon/health/lungs", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Medical-Nanobot-Lungs--Streamline-Ultimate\"> <g> <path d=\"M18.45 15.43a8 8 0 0 1 -6 -4.13 0.24 0.24 0 0 0 -0.28 -0.12 0.26 0.26 0 0 0 -0.19 0.24v1.78a0.26 0.26 0 0 1 -0.14 0.22 0.24 0.24 0 0 1 -0.27 0l-0.9 -0.72a0.51 0.51 0 0 1 -0.19 -0.39V1a1 1 0 0 0 -2 0v11.28a0.51 0.51 0 0 1 -0.19 0.39l-0.9 0.72a0.24 0.24 0 0 1 -0.27 0A0.24 0.24 0 0 1 7 13.2V9.7A1.7 1.7 0 0 0 5.3 8a3.11 3.11 0 0 0 -2.47 1.24A14.18 14.18 0 0 0 0 17.5v4.2A2.3 2.3 0 0 0 2.3 24a4.3 4.3 0 0 0 1.33 -0.21l1.89 -0.64A2.15 2.15 0 0 0 7 21.1v-4.58a0.51 0.51 0 0 1 0.19 -0.39l2 -1.6a0.48 0.48 0 0 1 0.62 0l2 1.6a0.51 0.51 0 0 1 0.19 0.39v4.58a2.15 2.15 0 0 0 1.48 2l1.89 0.64a4.3 4.3 0 0 0 1.33 0.26 2.3 2.3 0 0 0 2.3 -2.3v-4.2a12.56 12.56 0 0 0 -0.12 -1.65 0.49 0.49 0 0 0 -0.43 -0.42\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.63 7.22 22 6a0.52 0.52 0 0 1 -0.19 -0.36 0.54 0.54 0 0 1 0.19 -0.43l0.18 -0.21a1.1 1.1 0 0 0 0 -1.56L19 0.32a1.1 1.1 0 0 0 -1.56 0l-3.12 3.15a1.1 1.1 0 0 0 0 1.56l0.18 0.18a0.54 0.54 0 0 1 0.15 0.38 0.52 0.52 0 0 1 -0.19 0.36l-1.59 1.27a1 1 0 0 0 -0.24 1.28l2 3.5a1 1 0 1 0 1.74 -1L15 8.62a0.5 0.5 0 0 1 0.13 -0.62l0.87 -0.69a0.5 0.5 0 0 1 0.67 0l0.46 0.47a0.49 0.49 0 0 1 0.15 0.36v3.36a1 1 0 0 0 2 0V8.17a0.49 0.49 0 0 1 0.15 -0.36l0.46 -0.47a0.5 0.5 0 0 1 0.67 0l0.84 0.67a0.5 0.5 0 0 1 0.13 0.64L20.13 11a1 1 0 0 0 1.74 1l2 -3.5a1 1 0 0 0 -0.24 -1.28M18.25 6A1.75 1.75 0 1 1 20 4.25 1.75 1.75 0 0 1 18.25 6\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
