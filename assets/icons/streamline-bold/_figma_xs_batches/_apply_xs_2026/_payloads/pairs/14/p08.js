
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

const BATCH = [{"setName": "icon/navigation/panel.top", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Layout-5--Streamline-Ultimate\"> <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2ZM9.5 8h12a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-12a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5ZM22 2.5v3a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-3a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5ZM2.5 8h4a0.5 0.5 0 0 1 0.5 0.5v13a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.5 -0.5v-13a0.5 0.5 0 0 1 0.5 -0.5ZM9 21.5v-5a0.5 0.5 0 0 1 0.5 -0.5h12a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-12a0.5 0.5 0 0 1 -0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/resize", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Expand-8--Streamline-Ultimate\"> <g> <path d=\"M1.97 13.41h7.16s1.46 0 1.46 1.46v7.16s0 1.46 -1.46 1.46H1.97s-1.46 0 -1.46 -1.46v-7.16s0 -1.46 1.46 -1.46\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.49 9.43a1.25 1.25 0 0 0 1.25 -1.25V3A0.25 0.25 0 0 1 3 2.74h5.18a1.25 1.25 0 0 0 0 -2.5H2.44a2.21 2.21 0 0 0 -2.2 2.2v5.74a1.25 1.25 0 0 0 1.25 1.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.76 2.44a2.21 2.21 0 0 0 -2.2 -2.2h-5.74a1.25 1.25 0 1 0 0 2.5H21a0.25 0.25 0 0 1 0.25 0.25v5.19a1.25 1.25 0 0 0 2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.76 21.55v-5.73a1.25 1.25 0 1 0 -2.5 0V21a0.25 0.25 0 0 1 -0.25 0.25H16.3a1.25 1.25 0 0 0 0 2.5h5.26a2.21 2.21 0 0 0 2.2 -2.2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
