
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

const setName = "icon/comms/messages";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Chat-Consultation-Phone--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m15.23 11.16 -4.669 1.334a0.5 0.5 0 0 1 -0.63 -0.563l0.645 -3.874V1.852A1.551 1.551 0 0 1 12.128 0.3h10.084a1.552 1.552 0 0 1 1.551 1.552v7.757a1.552 1.552 0 0 1 -1.551 1.551zm1.252 -8.956 1.55 0a0.5 0.5 0 0 1 0.5 0.5V4.37h1.666a0.5 0.5 0 0 1 0.5 0.5v1.55a0.5 0.5 0 0 1 -0.5 0.5h-1.666v1.666a0.5 0.5 0 0 1 -0.5 0.5h-1.55a0.5 0.5 0 0 1 -0.5 -0.5V6.92h-1.666a0.5 0.5 0 0 1 -0.5 -0.5V4.87a0.5 0.5 0 0 1 0.5 -0.5h1.666V2.704a0.5 0.5 0 0 1 0.5 -0.5m-0.67 10.456h-0.371l-1.63 0.466v8.322c0 0.197 -0.16 0.358 -0.358 0.358H2.587a0.358 0.358 0 0 1 -0.359 -0.358V6.506c0 -0.198 0.16 -0.358 0.359 -0.358h6.49v-2h-6.49A2.358 2.358 0 0 0 0.228 6.506v14.942a2.358 2.358 0 0 0 2.359 2.358h10.866a2.358 2.358 0 0 0 2.358 -2.358V12.66Zm-9.81 6.424a1 1 0 0 1 1 -1h2.037a1 1 0 1 1 0 2H7a1 1 0 0 1 -1 -1Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
