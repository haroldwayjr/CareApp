
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

const BATCH = [{"setName": "icon/status/loading", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Loading--Streamline-Ultimate\"> <g> <path d=\"M12 6.5A1.5 1.5 0 0 0 13.5 5V2a1.5 1.5 0 0 0 -3 0v3A1.5 1.5 0 0 0 12 6.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.27 6.11 6.15 4A1.53 1.53 0 0 0 4 4a1.48 1.48 0 0 0 -0.44 1.06A1.52 1.52 0 0 0 4 6.11l2.15 2.12a1.5 1.5 0 0 0 1.06 0.44 1.5 1.5 0 0 0 1.06 -2.56\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.5 12A1.5 1.5 0 0 0 2 13.5h3a1.5 1.5 0 0 0 0 -3H2A1.5 1.5 0 0 0 0.5 12\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7 15.52a1.48 1.48 0 0 0 -1.1 0.48l-2.13 2.08a1.51 1.51 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L8 18.08a1.5 1.5 0 0 0 -1 -2.56\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 22a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.05 16a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.52 1.52 0 0 0 1.06 0.44 1.54 1.54 0 0 0 1.07 -0.44 1.51 1.51 0 0 0 0.43 -1.06 1.48 1.48 0 0 0 -0.44 -1.07L18.17 16a1.5 1.5 0 0 0 -2.12 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.5 12a1.5 1.5 0 0 0 -1.5 -1.5h-3a1.5 1.5 0 0 0 -1.5 1.5 1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 3.41a1.52 1.52 0 0 0 -1 0.44L15.86 6a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L20.11 6A1.5 1.5 0 0 0 19 3.41\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/status/lock", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock--Streamline-Ultimate\"> <g> <path d=\"M8.65 21.5H2.5v-6.15a1.25 1.25 0 0 0 -2.5 0v6.4A2.25 2.25 0 0 0 2.25 24h6.4a1.25 1.25 0 0 0 0 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.25 9.9A1.25 1.25 0 0 0 2.5 8.65V2.5h6.15a1.25 1.25 0 0 0 0 -2.5h-6.4A2.25 2.25 0 0 0 0 2.25v6.4A1.25 1.25 0 0 0 1.25 9.9\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.75 14.1a1.25 1.25 0 0 0 -1.25 1.25v6.15h-6.15a1.25 1.25 0 0 0 0 2.5h6.4A2.25 2.25 0 0 0 24 21.75v-6.4a1.25 1.25 0 0 0 -1.25 -1.25\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.75 0h-6.4a1.25 1.25 0 0 0 0 2.5h6.15v6.15a1.25 1.25 0 0 0 2.5 0v-6.4A2.25 2.25 0 0 0 21.75 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 3.76a4.49 4.49 0 0 0 -4.5 4.46V9h-0.38a1.62 1.62 0 0 0 -1.62 1.65v7.24a1.62 1.62 0 0 0 1.62 1.61h9.76a1.62 1.62 0 0 0 1.62 -1.61v-7.24A1.62 1.62 0 0 0 16.88 9h-0.38v-0.78A4.49 4.49 0 0 0 12 3.76M9.5 8.22a2.5 2.5 0 0 1 5 0V9h-5ZM12 15a1.5 1.5 0 1 1 1.5 -1.5A1.5 1.5 0 0 1 12 15\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
