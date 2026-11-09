
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

const BATCH = [{"setName": "icon/health/heart", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Heart-Approve-1--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m13.3712 16.8208 9.1336 -8.31944c0.3686 1.85624 -0.0589 3.89474 -1.6682 5.50404 -0.0087 0.0087 -0.0176 0.0173 -0.0268 0.0255l-8.8528 8.0189c-0.2857 0.2588 -0.7212 0.2588 -1.007 0l-8.85275 -8.0189c-0.00915 -0.0082 -0.01809 -0.0168 -0.02683 -0.0255 -2.758379 -2.7584 -2.070065889 -6.75042 0.15224 -8.95706 1.12831 -1.12035 2.68562 -1.82625 4.44446 -1.69881 1.57066 0.1138 3.21256 0.88483 4.78638 2.45503 1.5735 -1.56979 3.2139 -2.33932 4.7831 -2.4506 0.9137 -0.0648 1.7724 0.09604 2.5446 0.42314l-7.438 6.7751 -2.70443 -2.44426C7.40955 6.997 5.51248 7.09287 4.40153 8.32208c-1.11094 1.22922 -1.01507 3.12632 0.21415 4.23722l4.72384 4.2694c1.14568 1.0354 2.89008 1.032 4.03168 -0.0079M22.888 6.12334c0.6124 -0.55785 0.6567 -1.50657 0.0988 -2.11901 -0.5579 -0.61245 -1.5066 -0.6567 -2.119 -0.09884l-9.5207 8.67211 -3.71412 -3.35682c-0.61461 -0.55548 -1.56314 -0.50754 -2.11861 0.10707 -0.55548 0.6146 -0.50754 1.56315 0.10707 2.11865l4.72386 4.2693c0.5728 0.5177 1.445 0.516 2.0158 -0.0039z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
;
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
