
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

const BATCH = [{"setName": "icon/comms/reply", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Reply--Streamline-Ultimate\"> <path d=\"M19.62 10.68c-3 -2.67 -7.13 -2.85 -8.86 -2.79a0.29 0.29 0 0 1 -0.18 -0.07 0.27 0.27 0 0 1 -0.08 -0.18V5.06a1 1 0 0 0 -0.57 -0.9 1 1 0 0 0 -1.07 0.14l-7.5 6.37a1 1 0 0 0 -0.36 0.77 1 1 0 0 0 0.35 0.76l7.51 6.63a1 1 0 0 0 1.64 -0.77V15a0.26 0.26 0 0 1 0.2 -0.25c1.91 -0.4 8.13 -1.15 11.36 4.89a0.5 0.5 0 0 0 0.94 -0.23c0 -3.79 -1.14 -6.74 -3.38 -8.73\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/reply.all", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Reply-All--Streamline-Ultimate\"> <g> <path d=\"M20.82 10.74A10.65 10.65 0 0 0 14.24 8a0.24 0.24 0 0 1 -0.24 -0.23V5.56a1 1 0 0 0 -1.63 -0.75l-6.93 5.93a1 1 0 0 0 0 1.52l7 6a0.94 0.94 0 0 0 1 0.14 1 1 0 0 0 0.57 -0.88v-2.47a0.24 0.24 0 0 1 0.19 -0.24c1.47 -0.4 5.84 -1 8.86 4.92a0.51 0.51 0 0 0 0.57 0.26 0.51 0.51 0 0 0 0.37 -0.49c0 -3.81 -1.07 -6.76 -3.18 -8.76\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m2.29 11.5 7 -5.73A1 1 0 0 0 8 4.23L0.55 10.34a1.5 1.5 0 0 0 0 2.32l7.25 6a1 1 0 1 0 1.27 -1.54Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
