
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

const setName = "icon/media/equalizer";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Equalizer-1--Streamline-Ultimate\"> <path d=\"M24 2A1.5 1.5 0 0 0 22.5 0.5h-21A1.5 1.5 0 0 0 0 2v20a1.5 1.5 0 0 0 1.5 1.5h21A1.5 1.5 0 0 0 24 22Zm-6 16.5a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v7.25a0.25 0.25 0 0 0 0.25 0.25h0.5a1 1 0 0 1 0 2h-0.5a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-2.25a0.25 0.25 0 0 0 -0.25 -0.25Zm-7.5 -4a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v3.25a0.25 0.25 0 0 0 0.25 0.25h0.5a1 1 0 0 1 0 2H13a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-6.25a0.25 0.25 0 0 0 -0.25 -0.25ZM3.5 5a1 1 0 0 1 0 -2h17a1 1 0 0 1 0 2ZM3 18.5a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v7.25a0.25 0.25 0 0 0 0.25 0.25H6a1 1 0 0 1 0 2h-0.5a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-2.25a0.25 0.25 0 0 0 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
