
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

const BATCH = [{"setName": "icon/actions/logout", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Logout--Streamline-Ultimate\"> <path d=\"M12 0A12 12 0 0 0 0.09 9.92a0.51 0.51 0 0 0 0.5 0.58h8.32a0.5 0.5 0 0 0 0.5 -0.5V6.4A1 1 0 0 1 11 5.62l7 5.6a1 1 0 0 1 0 1.56l-7 5.6a1 1 0 0 1 -0.63 0.22 1 1 0 0 1 -1 -1V14a0.5 0.5 0 0 0 -0.5 -0.5H0.6a0.51 0.51 0 0 0 -0.51 0.58 12 12 0 0 0 23.81 -2.57A12.11 12.11 0 0 0 12 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/move", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Move-Down--Streamline-Ultimate\"> <g> <path d=\"M12.5 11.5a1.25 1.25 0 0 0 -1.25 1.25v5.75a0.25 0.25 0 0 1 -0.25 0.25H8.5a0.49 0.49 0 0 0 -0.46 0.31 0.48 0.48 0 0 0 0.11 0.54l4 4a0.47 0.47 0 0 0 0.35 0.15 0.49 0.49 0 0 0 0.35 -0.15l4 -4a0.48 0.48 0 0 0 0.11 -0.54 0.5 0.5 0 0 0 -0.46 -0.31H14a0.25 0.25 0 0 1 -0.25 -0.25v-5.75a1.25 1.25 0 0 0 -1.25 -1.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2 0.25h20s2 0 2 2v4.5s0 2 -2 2H2s-2 0 -2 -2v-4.5s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/new", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"New-Spreadsheet--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.58714 0.0993652c0.55229 0 1 0.4477148 1 1.0000048v0.89431c0 0.55228 -0.44771 1 -1 1 -0.55228 0 -1 -0.44772 -1 -1v-0.89431c0 -0.55229 0.44772 -1.0000048 1 -1.0000048M10.4671 5.65332c0 -0.55228 0.4477 -1 1 -1h9.4957c1.6182 0 2.9379 1.31977 2.9379 2.93791V20.9627c0 1.6181 -1.3197 2.9379 -2.9379 2.9379H3.03719c-1.61813 0 -2.9379011 -1.3198 -2.9379011 -2.9379V11.467c0 -0.5523 0.4477151 -1 1.0000011 -1 0.55228 0 1 0.4477 1 1v4.8137h5.26714V11.467c0 -0.5523 0.44772 -1 1 -1l13.53427 0V7.59123c0 -0.51357 -0.4243 -0.93791 -0.9379 -0.93791h-9.4957c-0.5523 0 -1 -0.44771 -1 -1M21.9007 12.467l-5.2671 0v3.8137h5.2671zm0 5.8137h-5.2671v3.6199h4.3292c0.5136 0 0.9379 -0.4243 0.9379 -0.9379zm-7.2671 3.6199v-3.6199H9.36644v3.6199zm-7.26717 0v-3.6199H2.09929v2.682c0 0.5136 0.42434 0.9379 0.9379 0.9379zm2.00001 -5.6199h5.26716V12.467H9.36644zM1.62928 2.30826c-0.46833 -0.29271 -1.085284 -0.15033 -1.377994 0.318 -0.2927092 0.46834 -0.150335 1.08529 0.318002 1.378l0.715452 0.44716c0.46834 0.29271 1.08529 0.15033 1.378 -0.318 0.29271 -0.46834 0.15033 -1.08529 -0.318 -1.378zm1.03346 3.89515c0.29271 0.46834 0.15033 1.08529 -0.318 1.378l-0.71546 0.44716c-0.46833 0.29271 -1.085284 0.15033 -1.377994 -0.31801 -0.2927092 -0.46833 -0.150335 -1.08528 0.318002 -1.37799l0.715452 -0.44716c0.46834 -0.29271 1.08529 -0.15033 1.378 0.318m2.9244 2.05037c0 -0.55228 -0.44771 -1 -1 -1 -0.55228 0 -1 0.44772 -1 1v0.89432c0 0.55228 0.44772 1 1 1 0.55229 0 1 -0.44772 1 -1zm0.80877 -2.00596c0.26821 -0.48279 0.87701 -0.65673 1.3598 -0.38852l0.80488 0.44716c0.48278 0.26821 0.65673 0.87701 0.38852 1.3598 -0.26822 0.48278 -0.87702 0.65673 -1.3598 0.38851l-0.80489 -0.44715c-0.48278 -0.26822 -0.65673 -0.87702 -0.38851 -1.3598m2.16468 -2.21747c0.48278 -0.26822 0.65673 -0.87702 0.38852 -1.3598 -0.26822 -0.48279 -0.87702 -0.65673 -1.3598 -0.38852l-0.80489 0.44716c-0.48278 0.26821 -0.65673 0.87701 -0.38851 1.3598 0.26821 0.48278 0.87701 0.65673 1.3598 0.38851z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/open", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Open-Eyes--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M7.05481 2.09846c0.4979 -0.23899 1.09527 -0.0291 1.33426 0.4688l0.85249 1.77602C10.0985 4.1563 11.0178 4.05005 12 4.05005c0.9822 0 1.9015 0.10625 2.7584 0.29323l0.8525 -1.77602c0.239 -0.4979 0.8364 -0.70779 1.3343 -0.4688 0.4979 0.23899 0.7078 0.83636 0.4688 1.33426l-0.7203 1.50058c1.6307 0.64529 2.9741 1.57027 4.0352 2.52048l1.2984 -1.29834c0.3905 -0.39052 1.0237 -0.39052 1.4142 0 0.3905 0.39053 0.3905 1.02369 0 1.41422l-1.315 1.31502c0.4315 0.50464 0.783 0.98291 1.0563 1.39542 0.2397 0.362 0.4239 0.6803 0.5514 0.9293 0.0629 0.123 0.1176 0.24 0.1589 0.3438 0.0201 0.0505 0.0431 0.1129 0.062 0.1801l0.0011 0.0037c0.0097 0.0337 0.0605 0.2091 0.0382 0.4189 -0.0145 0.136 -0.0556 0.2488 -0.066 0.2774l-0.0011 0.0029c-0.0183 0.0507 -0.0393 0.1009 -0.0595 0.1465 -0.0411 0.0925 -0.0949 0.2016 -0.1589 0.3221 -0.129 0.2425 -0.3136 0.5569 -0.5542 0.9177 -0.4808 0.7211 -1.1986 1.647 -2.1662 2.5637C19.0506 18.2219 16.0743 20.05 12 20.05s-7.05065 -1.8281 -8.9885 -3.6638c-0.96761 -0.9167 -1.6854 -1.8426 -2.16625 -2.5637 -0.240567 -0.3608 -0.425121 -0.6752 -0.55412 -0.9177 -0.064064 -0.1205 -0.117818 -0.2296 -0.158903 -0.3221 -0.020203 -0.0456 -0.041192 -0.0958 -0.0595391 -0.1465l-0.0010886 -0.0029c-0.0104074 -0.0286 -0.0515163 -0.1414 -0.06598965 -0.2774 -0.02232635 -0.2098 0.02845105 -0.3852 0.03821935 -0.4189l0.0010635 -0.0037c0.0188898 -0.0672 0.0418958 -0.1296 0.0620115 -0.1801 0.041309 -0.1038 0.096018 -0.2208 0.158933 -0.3438 0.127414 -0.249 0.311607 -0.5673 0.551363 -0.9293 0.27329 -0.41251 0.6248 -0.89078 1.05633 -1.39543L0.558514 7.56966c-0.390524 -0.39053 -0.390524 -1.02369 0 -1.41422 0.390525 -0.39052 1.023686 -0.39052 1.414216 0l1.29834 1.29834C4.3322 6.50357 5.67561 5.57859 7.3063 4.9333l-0.72028 -1.50058c-0.23899 -0.4979 -0.0291 -1.09527 0.46879 -1.33426ZM12 8.31116c-2.00972 0 -3.63892 1.6292 -3.63892 3.63894 0 2.0097 1.6292 3.6389 3.63892 3.6389 2.0097 0 3.6389 -1.6292 3.6389 -3.6389 0 -2.00974 -1.6292 -3.63894 -3.6389 -3.63894Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
