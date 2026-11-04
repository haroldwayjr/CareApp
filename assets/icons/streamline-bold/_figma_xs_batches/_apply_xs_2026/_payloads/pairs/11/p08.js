
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

const BATCH = [{"setName": "icon/files/file", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Common-File-Book--Streamline-Ultimate\"> <path d=\"m23.47 6.56 -2.85 -3a1.82 1.82 0 0 0 -1.3 -0.56H4.68a1.84 1.84 0 0 0 -1.32 0.56l-2.82 3A1.8 1.8 0 0 0 0 7.84v11.33A1.83 1.83 0 0 0 1.83 21h20.34A1.83 1.83 0 0 0 24 19.17V7.84a1.83 1.83 0 0 0 -0.53 -1.28M2.14 7.77 4.6 5.16A0.52 0.52 0 0 1 5 5h5.5a0.5 0.5 0 0 1 0.5 0.5v13a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5V8.11a0.48 0.48 0 0 1 0.14 -0.34M21.5 19h-8a0.5 0.5 0 0 1 -0.5 -0.5v-13a0.5 0.5 0 0 1 0.5 -0.5H19a0.52 0.52 0 0 1 0.37 0.16l2.46 2.61a0.48 0.48 0 0 1 0.14 0.34V18.5a0.5 0.5 0 0 1 -0.47 0.5\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/file.image", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Common-File-Horizontal-Image--Streamline-Ultimate\"> <g> <path d=\"M24 8.41a1 1 0 0 0 -0.29 -0.7l-5.42 -5.42a1 1 0 0 0 -0.7 -0.29H2a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2ZM22 19.5a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-15a0.5 0.5 0 0 1 0.5 -0.5H17a0.49 0.49 0 0 1 0.36 0.15l4.53 4.53A0.49 0.49 0 0 1 22 9Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.3 8a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.72 10.68a0.49 0.49 0 0 0 -0.84 0l-2.43 3.88a0.27 0.27 0 0 1 -0.21 0.12 0.24 0.24 0 0 1 -0.21 -0.12l-0.87 -1.38a0.49 0.49 0 0 0 -0.42 -0.24 0.51 0.51 0 0 0 -0.43 0.24l-2.77 4.44a0.25 0.25 0 0 0 0 0.25 0.26 0.26 0 0 0 0.22 0.13h12.1a0.26 0.26 0 0 0 0.22 -0.13 0.25 0.25 0 0 0 0 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
