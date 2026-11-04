
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

const BATCH = [{"setName":"icon/misc/school","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"School-Bell--Streamline-Ultimate\"> <g> <path d=\"M13.24 19.67a0.49 0.49 0 0 1 -0.24 -0.42v-0.92a0.5 0.5 0 0 0 -0.5 -0.5h-1a0.5 0.5 0 0 0 -0.5 0.5v0.92a0.49 0.49 0 0 1 -0.24 0.42 2.34 2.34 0 1 0 2.48 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m20.54 15.56 -0.21 -0.21c-1.25 -1.28 -1.76 -1.81 -1.76 -3.45V9.5c0 -3.7 -2 -6.53 -5 -7.3a0.48 0.48 0 0 1 -0.37 -0.48v-0.47a1.25 1.25 0 0 0 -2.5 0v0.47a0.48 0.48 0 0 1 -0.37 0.48c-3 0.77 -5 3.6 -5 7.3v2.4c0 1.64 -0.51 2.17 -1.76 3.45l-0.21 0.21A0.75 0.75 0 0 0 4 16.83h16a0.75 0.75 0 0 0 0.54 -1.27\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"},{"setName":"icon/misc/signal","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Signal-Wave--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M18.6094 0.361858c-0.3775 -0.4031119 -1.0103 -0.4238603 -1.4135 -0.046343 -0.4031 0.377518 -0.4238 1.010345 -0.0463 1.413455 5.3849 5.75002 5.3849 14.79203 0 20.54203 -0.3775 0.4031 -0.3568 1.036 0.0463 1.4135 0.4032 0.3775 1.036 0.3568 1.4135 -0.0464 6.1052 -6.5191 6.1052 -16.75712 0 -23.276242M13.2848 2.96745c0.3905 -0.39052 1.0237 -0.39052 1.4142 0 4.9671 4.96711 4.9671 13.00075 0 17.96785 -0.3905 0.3905 -1.0237 0.3905 -1.4142 0 -0.3905 -0.3906 -0.3905 -1.0237 0 -1.4142 4.1861 -4.1861 4.1861 -10.95337 0 -15.13943 -0.3905 -0.39053 -0.3905 -1.02369 0 -1.41422m-2.0361 3.21338c-0.3905 -0.39052 -1.0237 -0.39052 -1.41423 0 -0.39052 0.39053 -0.39052 1.02369 0 1.41422 2.43333 2.43335 2.43333 6.47405 0 8.90745 -0.39052 0.3905 -0.39052 1.0237 0 1.4142 0.39053 0.3905 1.02373 0.3905 1.41423 0 3.2144 -3.2144 3.2144 -8.52149 0 -11.73587M1.4875 12.0498c0 -2.07106 1.67894 -3.75 3.75 -3.75 2.07107 0 3.75 1.67894 3.75 3.75 0 2.0711 -1.67893 3.75 -3.75 3.75 -2.07106 0 -3.75 -1.6789 -3.75 -3.75\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
