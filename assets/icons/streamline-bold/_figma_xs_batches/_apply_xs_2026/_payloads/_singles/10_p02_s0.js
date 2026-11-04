
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

const BATCH = [{"setName": "icon/actions/select", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Select-3d--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12.952 4.895a1 1 0 1 1 -2 0V2.431l-1.853 0.892a1 1 0 1 1 -0.868 -1.802L10.566 0.397c0.039 -0.018 0.078 -0.034 0.118 -0.048a4.104 4.104 0 0 1 1.265 -0.224l0.003 0a4.1 4.1 0 0 1 1.267 0.224c0.04 0.014 0.08 0.03 0.118 0.048l2.335 1.124a1 1 0 0 1 -0.867 1.802l-1.853 -0.892zm0 14.113a1 1 0 1 0 -2 0v2.464l-1.853 -0.892a1 1 0 1 0 -0.868 1.802l2.335 1.124a0.913 0.913 0 0 0 0.118 0.048c0.309 0.103 0.769 0.224 1.265 0.224l0.003 0c0.497 0 0.958 -0.12 1.267 -0.224 0.04 -0.013 0.08 -0.03 0.118 -0.048l2.335 -1.124a1 1 0 0 0 -0.867 -1.802l-1.853 0.892zm-5.188 -9.56a1 1 0 0 1 1.335 -0.468l2.274 1.095c0.194 0.06 0.401 0.103 0.579 0.103 0.177 0 0.385 -0.043 0.579 -0.103l2.274 -1.095a1 1 0 1 1 0.867 1.802l-2.335 1.124a1.015 1.015 0 0 1 -0.118 0.048 4.96 4.96 0 0 1 -0.267 0.081v2.817a1 1 0 1 1 -2 0v-2.817a4.937 4.937 0 0 1 -0.268 -0.081c-0.04 -0.013 -0.08 -0.03 -0.118 -0.048l-2.335 -1.124a1 1 0 0 1 -0.467 -1.335Zm14.014 4.92a1 1 0 0 1 2 0v2.224c0 0.42 -0.096 0.843 -0.283 1.23a1.007 1.007 0 0 1 -0.132 0.242 2.715 2.715 0 0 1 -1.214 1.072l-1.805 0.95a1 1 0 1 1 -0.931 -1.77l1.638 -0.861a4.41 4.41 0 0 0 -0.084 -0.038c-0.209 -0.093 -0.432 -0.174 -0.686 -0.267l-0.026 -0.009a9.513 9.513 0 0 1 -0.805 -0.322 1 1 0 0 1 0.856 -1.808c0.167 0.08 0.37 0.155 0.633 0.25l0.045 0.017c0.238 0.087 0.519 0.189 0.79 0.309l0.004 0.001zm-20.653 -1a1 1 0 0 1 1 1v1.22l0.004 -0.001c0.272 -0.12 0.552 -0.222 0.79 -0.309l0.045 -0.016c0.263 -0.096 0.466 -0.172 0.633 -0.25a1 1 0 1 1 0.856 1.807 9.51 9.51 0 0 1 -0.804 0.322l-0.027 0.01a11.1 11.1 0 0 0 -0.686 0.265 4.36 4.36 0 0 0 -0.084 0.038l1.639 0.863a1 1 0 1 1 -0.932 1.77l-1.805 -0.95A2.714 2.714 0 0 1 0.54 18.063a1.002 1.002 0 0 1 -0.132 -0.242 2.842 2.842 0 0 1 -0.283 -1.23v-2.224a1 1 0 0 1 1 -1ZM19.06 5.314a1 1 0 0 1 0.863 -1.804l2.223 1.063 0.016 0.008c0.84 0.42 1.616 1.304 1.616 2.537v2.127a1 1 0 1 1 -2 0V7.924a7.963 7.963 0 0 1 -0.185 0.092c-0.258 0.123 -0.523 0.235 -0.756 0.333l-0.076 0.032c-0.264 0.111 -0.48 0.205 -0.663 0.3a1 1 0 0 1 -0.925 -1.773c0.266 -0.138 0.553 -0.261 0.81 -0.37l0.075 -0.03a14.999 14.999 0 0 0 0.774 -0.347zM5.314 3.98a1 1 0 0 1 -0.47 1.334L3.07 6.16l0.105 0.052c0.21 0.1 0.43 0.193 0.67 0.294l0.074 0.032c0.257 0.108 0.545 0.23 0.81 0.37a1 1 0 0 1 -0.924 1.773c-0.184 -0.096 -0.4 -0.19 -0.663 -0.3l-0.077 -0.033c-0.233 -0.098 -0.498 -0.21 -0.756 -0.333a8.083 8.083 0 0 1 -0.185 -0.092v1.321a1 1 0 1 1 -2 0V7.118C0.125 5.885 0.902 5 1.741 4.581l0.016 -0.008L3.98 3.51a1 1 0 0 1 1.334 0.47\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];

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
