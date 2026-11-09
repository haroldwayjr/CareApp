
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

const setName = "icon/comms/user.check";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Messages-People-User-Check--Streamline-Ultimate\"> <g> <path d=\"M13.24 9.91a1.82 1.82 0 0 0 2.76 -0.2l3.19 -4.24a1 1 0 1 0 -1.6 -1.2L14.5 8.35 13 6.85a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 0H9a2 2 0 0 0 -2 2v11a2 2 0 0 0 2 2h0.5v2.5a1 1 0 0 0 1.71 0.71l3.2 -3.21H22a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2m0 12.75a0.25 0.25 0 0 1 -0.25 0.25H14a1 1 0 0 0 -0.71 0.29l-1.79 1.8V14a1 1 0 0 0 -1 -1H9.25a0.25 0.25 0 0 1 -0.25 -0.25V2.25A0.25 0.25 0 0 1 9.25 2h12.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.5 13a2.75 2.75 0 1 0 -2.75 -2.75A2.75 2.75 0 0 0 3.5 13 3.5 3.5 0 0 0 0 16.5v2a0.47 0.47 0 0 0 0.15 0.35 0.47 0.47 0 0 0 0.35 0.15h0.82a0.25 0.25 0 0 1 0.25 0.23L2 23.55a0.5 0.5 0 0 0 0.5 0.45h2a0.5 0.5 0 0 0 0.5 -0.45l0.43 -4.32a0.25 0.25 0 0 1 0.25 -0.23h0.82a0.5 0.5 0 0 0 0.5 -0.5v-2A3.5 3.5 0 0 0 3.5 13\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
