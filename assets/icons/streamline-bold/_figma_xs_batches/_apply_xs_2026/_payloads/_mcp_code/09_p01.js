
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

const BATCH = [{"setName": "icon/actions/flag.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flag--Streamline-Ultimate\"> <g> <path d=\"m23.56 15.61 -6.77 -5.41a0.27 0.27 0 0 1 0 -0.4l6 -4.78c0.52 -0.42 0.49 -0.81 0.42 -1s-0.28 -0.52 -0.95 -0.52h-9.5V2A1.5 1.5 0 0 0 11.25 0.5h-6a0.5 0.5 0 0 0 -0.5 0.5v12a0.5 0.5 0 0 0 0.5 0.5h4.23a3.54 3.54 0 0 0 -1.56 1.62 1 1 0 0 0 0.1 0.94 1 1 0 0 0 0.83 0.44h14.4a0.5 0.5 0 0 0 0.31 -0.89Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.75 0a1.5 1.5 0 0 0 -1.5 1.5v21a1.5 1.5 0 0 0 3 0v-21A1.5 1.5 0 0 0 1.75 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/forward.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Fast-Forward--Streamline-Ultimate\"> <path d=\"M12 24A12 12 0 1 0 0 12a12 12 0 0 0 12 12M7.54 9.79a0.78 0.78 0 0 1 0.36 -0.69 0.74 0.74 0 0 1 0.77 0l3 1.62a0.25 0.25 0 0 0 0.37 -0.22v-0.71a0.78 0.78 0 0 1 0.36 -0.69 0.74 0.74 0 0 1 0.77 0l5.09 2.73a0.76 0.76 0 0 1 0.43 0.66 0.74 0.74 0 0 1 -0.43 0.65l-5.09 2.74a0.74 0.74 0 0 1 -1.13 -0.68v-0.72a0.27 0.27 0 0 0 -0.12 -0.22 0.25 0.25 0 0 0 -0.25 0l-3 1.62a0.87 0.87 0 0 1 -0.41 0.11 0.65 0.65 0 0 1 -0.36 -0.1 0.78 0.78 0 0 1 -0.36 -0.69Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];

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
