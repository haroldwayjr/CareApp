
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

const setName = "icon/commerce/qr.code";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Qr-Code--Streamline-Ultimate\"> <g> <path d=\"M1 8h6a1 1 0 0 0 1 -1V1a1 1 0 0 0 -1 -1H1a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1m1 -5.75A0.25 0.25 0 0 1 2.25 2h3.5a0.25 0.25 0 0 1 0.25 0.25v3.5a0.25 0.25 0 0 1 -0.25 0.25h-3.5A0.25 0.25 0 0 1 2 5.75Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7 16H1a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1m-1 5.75a0.25 0.25 0 0 1 -0.25 0.25h-3.5a0.25 0.25 0 0 1 -0.25 -0.25v-3.5a0.25 0.25 0 0 1 0.25 -0.25h3.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 0h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1V1a1 1 0 0 0 -1 -1m-1 5.75a0.25 0.25 0 0 1 -0.25 0.25h-3.5a0.25 0.25 0 0 1 -0.25 -0.25v-3.5a0.25 0.25 0 0 1 0.25 -0.25h3.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10 4.25h1a0.75 0.75 0 0 0 0 -1.5 0.25 0.25 0 0 1 -0.25 -0.25V1a0.75 0.75 0 0 0 -1.5 0v2.5a0.76 0.76 0 0 0 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 1.75a0.25 0.25 0 0 1 0.25 0.25v5.5a0.75 0.75 0 0 0 1.5 0V1A0.76 0.76 0 0 0 14 0.25h-1a0.76 0.76 0 0 0 -0.75 0.75 0.76 0.76 0 0 0 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.75 10.5a0.76 0.76 0 0 0 0.75 0.75H10a0.76 0.76 0 0 0 0.75 -0.75v-4a0.75 0.75 0 0 0 -1.5 0v3a0.25 0.25 0 0 1 -0.25 0.25H6.5a0.76 0.76 0 0 0 -0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 9.75a0.76 0.76 0 0 0 -0.75 0.75V13a0.25 0.25 0 0 1 -0.25 0.25H1a0.75 0.75 0 0 0 0 1.5h13a0.76 0.76 0 0 0 0.75 -0.75v-3a0.75 0.75 0 0 0 -1.5 0v2a0.25 0.25 0 0 1 -0.25 0.25H4a0.25 0.25 0 0 1 -0.25 -0.25v-2.5A0.76 0.76 0 0 0 3 9.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.75 17a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.76 0.76 0 0 0 -0.75 0.75v4a0.75 0.75 0 0 0 1.5 0v-3a0.25 0.25 0 0 1 0.25 -0.25h2a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 22.25h-8.5a0.25 0.25 0 0 1 -0.25 -0.25v-2a0.75 0.75 0 0 0 -1.5 0v3a0.76 0.76 0 0 0 0.75 0.75H23a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.5 20.25h3a0.76 0.76 0 0 0 0.75 -0.75v-3a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.76 0.76 0 0 0 -0.75 0.75v3a0.76 0.76 0 0 0 0.75 0.75m0.75 -2.75a0.25 0.25 0 0 1 0.25 -0.25h1a0.25 0.25 0 0 1 0.25 0.25v1a0.25 0.25 0 0 1 -0.25 0.25h-1a0.25 0.25 0 0 1 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.5 12.75a0.76 0.76 0 0 0 -0.75 0.75V20a0.75 0.75 0 0 0 1.5 0v-6.5a0.76 0.76 0 0 0 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.25 10a0.76 0.76 0 0 0 -0.75 -0.75H17a0.76 0.76 0 0 0 -0.75 0.75v3a0.75 0.75 0 0 0 1.5 0v-2a0.25 0.25 0 0 1 0.25 -0.25h4.5a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
