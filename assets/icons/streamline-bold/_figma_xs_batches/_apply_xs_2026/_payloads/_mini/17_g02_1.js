
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

const BATCH = [{"setName": "icon/media/brightness", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Brightness--Streamline-Ultimate\"> <g> <path d=\"M7.5 12a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0 -9 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 5.83a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v3.83a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 18.17a1 1 0 0 0 -1 1V23a1 1 0 0 0 2 0v-3.83a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.22 7.64a1 1 0 0 0 1.41 0 1 1 0 0 0 0 -1.42l-2.7 -2.7a1 1 0 0 0 -1.42 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.78 16.37a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41l2.7 2.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.83 12.5a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h3.83a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 11.5h-3.83a1 1 0 0 0 0 2H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m6.22 16.37 -2.71 2.7a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l2.7 -2.71a1 1 0 0 0 -1.41 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.07 7.92a1 1 0 0 0 0.71 -0.28l2.71 -2.71a1 1 0 1 0 -1.42 -1.41l-2.7 2.7a1 1 0 0 0 0 1.42 1 1 0 0 0 0.7 0.28\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/camera", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Camera--Streamline-Ultimate\"> <g> <path d=\"M22.5 6h-21A1.5 1.5 0 0 0 0 7.5v12A1.5 1.5 0 0 0 1.5 21h21a1.5 1.5 0 0 0 1.5 -1.5v-12A1.5 1.5 0 0 0 22.5 6m-1 7.5a5 5 0 1 1 -5 -5 5 5 0 0 1 5 5M8 12.25H2.5a0.75 0.75 0 0 1 0 -1.5H8a0.75 0.75 0 0 1 0 1.5m0.75 3.25a0.76 0.76 0 0 1 -0.75 0.75H2.5a0.75 0.75 0 0 1 0 -1.5H8a0.76 0.76 0 0 1 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 5h4a0.5 0.5 0 0 0 0.5 -0.5A1.5 1.5 0 0 0 6 3H4a1.5 1.5 0 0 0 -1.5 1.5 0.5 0.5 0 0 0 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.84 10.78h3.33s1.06 0 1.06 1.06v3.33s0 1.06 -1.06 1.06h-3.33s-1.06 0 -1.06 -1.06v-3.33s0 -1.06 1.06 -1.06\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
