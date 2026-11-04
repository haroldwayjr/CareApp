
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

const BATCH = [{"setName": "icon/files/server", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Server--Streamline-Ultimate\"> <g> <path d=\"M24 6a1.5 1.5 0 0 0 -1.5 -1.5h-21A1.5 1.5 0 0 0 0 6v2.5A1.5 1.5 0 0 0 1.5 10h21A1.5 1.5 0 0 0 24 8.5ZM3.25 7.25A1.25 1.25 0 1 1 4.5 8.5a1.25 1.25 0 0 1 -1.25 -1.25M8.5 8.5a1.25 1.25 0 1 1 1.25 -1.25A1.25 1.25 0 0 1 8.5 8.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.74 2.05 18.84 0.11a1 1 0 0 0 -0.45 -0.11H5.63a1 1 0 0 0 -0.45 0.11L1.29 2.05a0.5 0.5 0 0 0 0.22 1h21a0.5 0.5 0 0 0 0.49 -0.43 0.52 0.52 0 0 0 -0.26 -0.57\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M24 13a1.5 1.5 0 0 0 -1.5 -1.5h-21A1.5 1.5 0 0 0 0 13v2.5A1.5 1.5 0 0 0 1.5 17h9.25a0.25 0.25 0 0 1 0.25 0.25v4.5a0.25 0.25 0 0 1 -0.25 0.25H5.5a1 1 0 0 0 0 2h13a1 1 0 0 0 0 -2h-5.25a0.25 0.25 0 0 1 -0.25 -0.25v-4.5a0.25 0.25 0 0 1 0.25 -0.25h9.25a1.5 1.5 0 0 0 1.5 -1.5ZM3.25 14.25A1.25 1.25 0 1 1 4.5 15.5a1.25 1.25 0 0 1 -1.25 -1.25M8.5 15.5a1.25 1.25 0 1 1 1.25 -1.25A1.25 1.25 0 0 1 8.5 15.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 24a1 1 0 0 0 0 -2h-1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 24h1a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/files/shelf", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shelf-Tv--Streamline-Ultimate\"> <path d=\"M24 13.5a1.5 1.5 0 0 0 -1.5 -1.5h-9a0.5 0.5 0 0 1 -0.5 -0.5V11a0.5 0.5 0 0 1 0.5 -0.5H18a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2H6a2 2 0 0 0 -2 2v6.5a2 2 0 0 0 2 2h4.5a0.5 0.5 0 0 1 0.5 0.5v0.5a0.5 0.5 0 0 1 -0.5 0.5h-9A1.5 1.5 0 0 0 0 13.5v10a0.5 0.5 0 0 0 0.5 0.5H4a0.48 0.48 0 0 0 0.48 -0.37L5 21.58A1.29 1.29 0 0 1 6 21h12a1.31 1.31 0 0 1 1 0.58l0.57 2.06A0.5 0.5 0 0 0 20 24h3.5a0.5 0.5 0 0 0 0.5 -0.5Zm-13.5 4a0.5 0.5 0 0 1 -0.5 0.5H3a0.5 0.5 0 0 1 -0.5 -0.5v-2A0.5 0.5 0 0 1 3 15h7a0.5 0.5 0 0 1 0.5 0.5Zm-4 -9A0.5 0.5 0 0 1 6 8V2.5a0.5 0.5 0 0 1 0.5 -0.5h11a0.5 0.5 0 0 1 0.5 0.5V8a0.5 0.5 0 0 1 -0.5 0.5Zm15 9a0.5 0.5 0 0 1 -0.5 0.5h-7a0.5 0.5 0 0 1 -0.5 -0.5v-2a0.5 0.5 0 0 1 0.5 -0.5h7a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
