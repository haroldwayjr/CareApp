
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

const setName = "icon/comms/video.call";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Video-Call--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M3.44727 20.2466c-1.38071 0 -2.500004 -1.1192 -2.500004 -2.5V6.25293c0 -1.38071 1.119284 -2.5 2.500004 -2.5H15.1614c1.3807 0 2.5 1.11929 2.5 2.5v2.55004l3.1231 -1.8622c0.9999 -0.59617 2.2682 0.12427 2.2682 1.28836v7.54447c0 1.1641 -1.2683 1.8846 -2.2682 1.2884l-3.1231 -1.8622v2.5468c0 1.3808 -1.1193 2.5 -2.5 2.5zm3.02861 -7.6342c-0.16392 -0.3804 -0.60517 -0.5559 -0.98557 -0.392s-0.55589 0.6052 -0.39197 0.9856c0.70105 1.6269 2.31974 2.7681 4.2067 2.7681s3.50566 -1.1412 4.20666 -2.7681c0.164 -0.3804 -0.0115 -0.8217 -0.3919 -0.9856s-0.8217 0.0116 -0.9856 0.392c-0.4725 1.0965 -1.5623 1.8617 -2.82916 1.8617 -1.26685 0 -2.35666 -0.7652 -2.82916 -1.8617m-0.48174 -2.3556c0.63319 0 1.14648 -0.51326 1.14648 -1.14645 0 -0.63318 -0.51329 -1.14648 -1.14648 -1.14648s-1.14648 0.5133 -1.14648 1.14648c0 0.63319 0.51329 1.14645 1.14648 1.14645m7.76756 -1.14645c0 0.63319 -0.5133 1.14645 -1.1465 1.14645s-1.1464 -0.51326 -1.1464 -1.14645c0 -0.63318 0.5132 -1.14648 1.1464 -1.14648s1.1465 0.5133 1.1465 1.14648\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
