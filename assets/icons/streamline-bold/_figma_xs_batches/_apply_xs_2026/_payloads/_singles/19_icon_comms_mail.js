
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

const setName = "icon/comms/mail";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Home--Streamline-Ultimate\"> <g> <path d=\"M18.41 15.13a0.73 0.73 0 0 1 -0.41 0.12H6a0.72 0.72 0 0 1 -0.4 -0.12L0.39 11.78a0.27 0.27 0 0 0 -0.26 0A0.26 0.26 0 0 0 0 12v10a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V12a0.26 0.26 0 0 0 -0.13 -0.22 0.27 0.27 0 0 0 -0.26 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.12 13a0.25 0.25 0 0 0 0.25 0 0.24 0.24 0 0 0 0.14 -0.22V2.25a0.29 0.29 0 0 1 0.07 -0.18 0.29 0.29 0 0 1 0.17 -0.07h12.5a0.25 0.25 0 0 1 0.25 0.25v10.57a0.24 0.24 0 0 0 0.13 0.22 0.24 0.24 0 0 0 0.26 0L23 10.43a0.25 0.25 0 0 0 0.11 -0.21A0.28 0.28 0 0 0 23 10l-2.5 -1.7V2.21a2.11 2.11 0 0 0 -2 -2.21h-13a2.12 2.12 0 0 0 -2 2.21V8.3L1 10a0.28 0.28 0 0 0 -0.1 0.21 0.26 0.26 0 0 0 0.11 0.21Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 3.58 7.12 7.41a0.33 0.33 0 0 0 -0.1 0.37 0.35 0.35 0 0 0 0.32 0.22h0.91a0.25 0.25 0 0 1 0.25 0.25v3.25a0.5 0.5 0 0 0 0.5 0.5h1.5a0.5 0.5 0 0 0 0.5 -0.5v-1.25a1.25 1.25 0 0 1 2.5 0v1.25a0.5 0.5 0 0 0 0.5 0.5h1.5a0.5 0.5 0 0 0 0.5 -0.5V8.25a0.25 0.25 0 0 1 0.25 -0.25h0.91a0.35 0.35 0 0 0 0.32 -0.22 0.33 0.33 0 0 0 -0.1 -0.37l-4.91 -3.83a0.33 0.33 0 0 0 -0.47 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
