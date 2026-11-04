
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

const setName = "icon/media/play";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Button-Play--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236 3.35977 3.34094 1.8217 5.21509 0.913451 7.4078 0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411s1.605908 4.466 3.284138 6.1442 3.81643 2.8211 6.1442 3.2841c2.32778 0.463 4.74058 0.2254 6.93328 -0.6828 2.1927 -0.9083 4.0669 -2.4464 5.3854 -4.4198C23.2962 16.6935 24 14.3734 24 12c0 -3.1826 -1.2643 -6.23485 -3.5147 -8.48528C18.2348 1.26428 15.1826 0 12 0m4.83 12.89 -7.37999 3.69c-0.15223 0.0767 -0.32155 0.1132 -0.49186 0.1061 -0.17032 -0.0071 -0.33598 -0.0577 -0.48126 -0.1469 -0.14528 -0.0891 -0.26536 -0.214 -0.34882 -0.3626s-0.12755 -0.3161 -0.12806 -0.4866V8.31c-0.0012 -0.17131 0.04163 -0.34006 0.12439 -0.49006 0.08276 -0.14999 0.20266 -0.27622 0.34822 -0.36656 0.14555 -0.09035 0.31188 -0.14179 0.48303 -0.14938 0.17114 -0.0076 0.34137 0.0289 0.49436 0.106L16.83 11.1c0.1664 0.0829 0.3064 0.2106 0.4043 0.3687 0.0978 0.1581 0.1496 0.3404 0.1496 0.5263s-0.0518 0.3682 -0.1496 0.5263c-0.0979 0.1581 -0.2379 0.2858 -0.4043 0.3687\" stroke-width=\"1\"></path> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
