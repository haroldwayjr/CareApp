
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

const BATCH = [{"setName": "icon/misc/book", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Book-Pin--Streamline-Ultimate\"> <g> <path d=\"M20.15 4a0.5 0.5 0 0 1 -0.4 -0.49V2a2 2 0 0 0 -2 -2H5.25a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h14.5a2 2 0 0 0 2 -2V6a2 2 0 0 0 -1.6 -2m-3.49 8.12c0 1.38 -1.59 4.13 -4.25 7.36a0.53 0.53 0 0 1 -0.41 0.19 0.51 0.51 0 0 1 -0.4 -0.19c-2.67 -3.23 -4.26 -6 -4.26 -7.36a4.66 4.66 0 0 1 9.32 0m1.09 -8.41a0.25 0.25 0 0 1 -0.25 0.29H5.25a1 1 0 0 1 0 -2H17.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.03 12.16a1.97 1.97 0 1 0 3.94 0 1.97 1.97 0 1 0 -3.94 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/briefcase", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Briefcase--Streamline-Ultimate\"> <path d=\"M3 22.5h18a3 3 0 0 0 3 -3v-11a3 3 0 0 0 -3 -3h-3.9a0.24 0.24 0 0 1 -0.24 -0.22l-0.15 -1.15a3 3 0 0 0 -3 -2.63h-3.44a3 3 0 0 0 -3 2.63l-0.13 1.15a0.24 0.24 0 0 1 -0.24 0.22H3a3 3 0 0 0 -3 3v11a3 3 0 0 0 3 3M9.27 4.38a1 1 0 0 1 1 -0.88h3.46a1 1 0 0 1 1 0.88l0.1 0.84a0.25 0.25 0 0 1 -0.06 0.2 0.26 0.26 0 0 1 -0.19 0.08H9.42a0.26 0.26 0 0 1 -0.19 -0.08 0.25 0.25 0 0 1 -0.06 -0.2ZM5.25 11a0.76 0.76 0 0 1 0.75 -0.75h12a0.76 0.76 0 0 1 0.75 0.75v0.5a0.76 0.76 0 0 1 -0.75 0.75H6a0.76 0.76 0 0 1 -0.75 -0.75Zm0 5.5a0.76 0.76 0 0 1 0.75 -0.75h12a0.76 0.76 0 0 1 0.75 0.75v0.5a0.76 0.76 0 0 1 -0.75 0.75H6a0.76 0.76 0 0 1 -0.75 -0.75Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
