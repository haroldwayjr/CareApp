
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

const BATCH = [{"setName": "icon/misc/flash", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash--Streamline-Ultimate\"> <path d=\"M17.5 8h-4.1L17.92 0.76a0.47 0.47 0 0 0 0 -0.5 0.51 0.51 0 0 0 -0.42 -0.26h-8a0.49 0.49 0 0 0 -0.5 0.38l-3 12a0.48 0.48 0 0 0 0.09 0.43 0.49 0.49 0 0 0 0.41 0.19h3.35L7 23.37a0.49 0.49 0 0 0 0.27 0.58 0.52 0.52 0 0 0 0.63 -0.17l10 -15a0.5 0.5 0 0 0 -0.4 -0.78\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/misc/flash.off", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash-Off--Streamline-Ultimate\"> <g> <path d=\"M23.43 23.15a1 1 0 0 0 0 -1.41l-7.16 -7.17 3.41 -4.78a0.49 0.49 0 0 0 0 -0.52 0.5 0.5 0 0 0 -0.4 -0.27H11.9L13.76 0.61a0.49 0.49 0 0 0 -0.28 -0.61 0.5 0.5 0 0 0 -0.61 0.17L8.3 6.61 2 0.29A1 1 0 0 0 0.57 1.7l21.51 21.5a1 1 0 0 0 0.64 0.25 1 1 0 0 0 0.71 -0.3\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.45 9.69a0.25 0.25 0 0 0 -0.38 0l-3.2 4.49a0.51 0.51 0 0 0 0 0.52 0.52 0.52 0 0 0 0.45 0.27h7.37l-1.9 8.42a0.5 0.5 0 0 0 0.28 0.56 0.54 0.54 0 0 0 0.21 0.05 0.5 0.5 0 0 0 0.4 -0.21l4.41 -6.17a0.24 0.24 0 0 0 0 -0.32Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
