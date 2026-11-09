
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

const BATCH = [{"setName": "icon/health/sleep", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sleep-Zzz--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M11.6831 7.79864c0.165 0.35047 0.5175 0.57417 0.9048 0.57417h5.2707c0.5522 0 1 -0.44772 1 -1 0 -0.55229 -0.4478 -1 -1 -1h-3.1459l3.9164 -4.73549c0.2469 -0.29848 0.2992 -0.712688 0.1342 -1.063158C18.5984 0.223692 18.2459 0 17.8585 0h-5.2706c-0.5523 0 -1 0.447715 -1 1 0 0.55228 0.4477 1 1 1h3.1459l-3.9165 4.73548c-0.2469 0.29849 -0.2991 0.71269 -0.1342 1.06316M0.108384 16.3442c0.164947 0.3505 0.517454 0.5742 0.904796 0.5742h7.0678c0.55229 0 1 -0.4477 1 -1s-0.44771 -1 -1 -1H3.13793l5.71365 -6.90843c0.24686 -0.29849 0.29915 -0.71269 0.1342 -1.06316 -0.16494 -0.35047 -0.51745 -0.57416 -0.9048 -0.57416h-7.0678c-0.552281 0 -0.9999964 0.44771 -0.9999964 1 0 0.55228 0.4477154 1 0.9999964 1h4.94305L0.242587 15.2811c-0.24686411 0.2985 -0.2991493 0.7127 -0.134203 1.0631M14.2974 24.0001c-0.3874 0 -0.7399 -0.2237 -0.9048 -0.5742 -0.165 -0.3505 -0.1127 -0.7647 0.1342 -1.0631l7.0222 -8.4907h-6.2516c-0.5523 0 -1 -0.4477 -1 -1s0.4477 -1 1 -1h8.3763c0.3874 0 0.7399 0.2237 0.9048 0.5742 0.165 0.3504 0.1127 0.7646 -0.1342 1.0631l-7.0222 8.4907h6.2516c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/stethoscope", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Stethoscope-Website--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6.825 10.64h-0.882v3.705a2.764 2.764 0 0 0 5.527 0V10.64h-0.881a1 1 0 1 1 0 -2h0.94a1.941 1.941 0 0 1 1.941 1.941v3.764a4.764 4.764 0 0 1 -3.736 4.652 3.234 3.234 0 0 0 6.441 -0.418v-1.557a2.537 2.537 0 1 1 2 0v1.557a5.234 5.234 0 0 1 -10.45 0.427 4.764 4.764 0 0 1 -3.782 -4.661V10.58a1.94 1.94 0 0 1 1.94 -1.94h0.942a1 1 0 1 1 0 2\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M2.074 21.245V5.981h19.852v15.264a0.681 0.681 0 0 1 -0.68 0.681h-2.461a6.736 6.736 0 0 1 -1.75 2h4.21c1.48 0 2.681 -1.2 2.681 -2.68V2.754c0 -1.48 -1.2 -2.681 -2.68 -2.681H2.754a2.68 2.68 0 0 0 -2.681 2.68v18.491c0 1.48 1.2 2.681 2.68 2.681h6.093a6.738 6.738 0 0 1 -1.75 -2H2.755a0.681 0.681 0 0 1 -0.681 -0.68m6.843 0.681a5.234 5.234 0 0 0 8.049 0h-8.05ZM4.53 3.152a0.956 0.956 0 1 1 -1.911 0 0.956 0.956 0 0 1 1.911 0m2.316 0.956a0.956 0.956 0 1 0 0 -1.911 0.956 0.956 0 0 0 0 1.911\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
