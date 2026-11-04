
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

const setName = "icon/comms/user";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"User-Story--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M10.2689 2.1868c0.5616 -0.09831 1.1399 -0.14969 1.7311 -0.14969s1.1695 0.05138 1.7311 0.14969c0.544 0.09524 1.0622 -0.26857 1.1574 -0.81258C14.9838 0.830212 14.62 0.311998 14.076 0.216759 13.401 0.0986009 12.7073 0.0371094 12 0.0371094S10.599 0.0986009 9.92404 0.216759c-0.54402 0.095239 -0.90782 0.613453 -0.81258 1.157461 0.09524 0.54401 0.61346 0.90782 1.15744 0.81258m7.6043 -0.61096c-0.481 -0.2715 -1.091 -0.10172 -1.3625 0.37922s-0.1017 1.09092 0.3792 1.36242c3.0306 1.71081 5.073 4.95879 5.073 8.68252 0 5.5024 -4.4605 9.9629 -9.9629 9.9629 -4.32199 0 -8.00363 -2.7526 -9.3826 -6.6035 -0.18619 -0.52 -0.75863 -0.7905 -1.27859 -0.6043 -0.519951 0.1862 -0.790519 0.7586 -0.604329 1.2785C2.38917 20.6545 6.80695 23.9629 12 23.9629c6.6069 0 11.9629 -5.356 11.9629 -11.9629 0 -4.47411 -2.4566 -8.37315 -6.0897 -10.42416M6.92127 3.4268c0.47487 -0.28198 0.63124 -0.89553 0.34926 -1.3704 -0.28198 -0.47488 -0.89554 -0.63125 -1.37041 -0.34927 -1.17313 0.69661 -2.21653 1.58777 -3.08605 2.62893 -0.35401 0.4239 -0.29736 1.05453 0.12654 1.40854 0.4239 0.35402 1.05453 0.29737 1.40854 -0.12653 0.72508 -0.86822 1.59498 -1.61104 2.57212 -2.19127M2.6174 8.64061c0.18619 -0.51995 -0.08438 -1.0924 -0.60433 -1.27859 -0.51996 -0.18619 -1.092399 0.08438 -1.278589 0.60433C0.282736 9.22789 0.0371094 10.5864 0.0371094 12c0 0.5523 0.4477156 1 1.0000006 1 0.55228 0 1 -0.4477 1 -1 0 -1.1806 0.20492 -2.31114 0.58029 -3.35939M19.7012 12c0 4.2532 -3.448 7.7012 -7.7012 7.7012 -4.25324 0 -7.70117 -3.448 -7.70117 -7.7012 0 -4.25324 3.44793 -7.70117 7.70117 -7.70117 4.2532 0 7.7012 3.44793 7.7012 7.70117m-5.7073 -2.62416c0 1.10076 -0.8923 1.99306 -1.9931 1.99306 -1.1007 0 -1.993 -0.8923 -1.993 -1.99306 0 -1.10072 0.8923 -1.99303 1.993 -1.99303 1.1008 0 1.9931 0.89231 1.9931 1.99303m1.8728 4.99706c-0.8386 -1.2619 -2.2731 -2.1112 -3.8668 -2.1112 -1.5938 0 -3.02829 0.8493 -3.8669 2.1112 -0.37186 0.5596 0.10254 1.2165 0.7744 1.2165h6.1849c0.6719 0 1.1463 -0.6569 0.7744 -1.2165\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
