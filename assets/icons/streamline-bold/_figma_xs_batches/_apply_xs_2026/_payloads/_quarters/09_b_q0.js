
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

const BATCH = [{"setName": "icon/actions/new", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"New-Spreadsheet--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.58714 0.0993652c0.55229 0 1 0.4477148 1 1.0000048v0.89431c0 0.55228 -0.44771 1 -1 1 -0.55228 0 -1 -0.44772 -1 -1v-0.89431c0 -0.55229 0.44772 -1.0000048 1 -1.0000048M10.4671 5.65332c0 -0.55228 0.4477 -1 1 -1h9.4957c1.6182 0 2.9379 1.31977 2.9379 2.93791V20.9627c0 1.6181 -1.3197 2.9379 -2.9379 2.9379H3.03719c-1.61813 0 -2.9379011 -1.3198 -2.9379011 -2.9379V11.467c0 -0.5523 0.4477151 -1 1.0000011 -1 0.55228 0 1 0.4477 1 1v4.8137h5.26714V11.467c0 -0.5523 0.44772 -1 1 -1l13.53427 0V7.59123c0 -0.51357 -0.4243 -0.93791 -0.9379 -0.93791h-9.4957c-0.5523 0 -1 -0.44771 -1 -1M21.9007 12.467l-5.2671 0v3.8137h5.2671zm0 5.8137h-5.2671v3.6199h4.3292c0.5136 0 0.9379 -0.4243 0.9379 -0.9379zm-7.2671 3.6199v-3.6199H9.36644v3.6199zm-7.26717 0v-3.6199H2.09929v2.682c0 0.5136 0.42434 0.9379 0.9379 0.9379zm2.00001 -5.6199h5.26716V12.467H9.36644zM1.62928 2.30826c-0.46833 -0.29271 -1.085284 -0.15033 -1.377994 0.318 -0.2927092 0.46834 -0.150335 1.08529 0.318002 1.378l0.715452 0.44716c0.46834 0.29271 1.08529 0.15033 1.378 -0.318 0.29271 -0.46834 0.15033 -1.08529 -0.318 -1.378zm1.03346 3.89515c0.29271 0.46834 0.15033 1.08529 -0.318 1.378l-0.71546 0.44716c-0.46833 0.29271 -1.085284 0.15033 -1.377994 -0.31801 -0.2927092 -0.46833 -0.150335 -1.08528 0.318002 -1.37799l0.715452 -0.44716c0.46834 -0.29271 1.08529 -0.15033 1.378 0.318m2.9244 2.05037c0 -0.55228 -0.44771 -1 -1 -1 -0.55228 0 -1 0.44772 -1 1v0.89432c0 0.55228 0.44772 1 1 1 0.55229 0 1 -0.44772 1 -1zm0.80877 -2.00596c0.26821 -0.48279 0.87701 -0.65673 1.3598 -0.38852l0.80488 0.44716c0.48278 0.26821 0.65673 0.87701 0.38852 1.3598 -0.26822 0.48278 -0.87702 0.65673 -1.3598 0.38851l-0.80489 -0.44715c-0.48278 -0.26822 -0.65673 -0.87702 -0.38851 -1.3598m2.16468 -2.21747c0.48278 -0.26822 0.65673 -0.87702 0.38852 -1.3598 -0.26822 -0.48279 -0.87702 -0.65673 -1.3598 -0.38852l-0.80489 0.44716c-0.48278 0.26821 -0.65673 0.87701 -0.38851 1.3598 0.26821 0.48278 0.87701 0.65673 1.3598 0.38851z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/open", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Open-Eyes--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M7.05481 2.09846c0.4979 -0.23899 1.09527 -0.0291 1.33426 0.4688l0.85249 1.77602C10.0985 4.1563 11.0178 4.05005 12 4.05005c0.9822 0 1.9015 0.10625 2.7584 0.29323l0.8525 -1.77602c0.239 -0.4979 0.8364 -0.70779 1.3343 -0.4688 0.4979 0.23899 0.7078 0.83636 0.4688 1.33426l-0.7203 1.50058c1.6307 0.64529 2.9741 1.57027 4.0352 2.52048l1.2984 -1.29834c0.3905 -0.39052 1.0237 -0.39052 1.4142 0 0.3905 0.39053 0.3905 1.02369 0 1.41422l-1.315 1.31502c0.4315 0.50464 0.783 0.98291 1.0563 1.39542 0.2397 0.362 0.4239 0.6803 0.5514 0.9293 0.0629 0.123 0.1176 0.24 0.1589 0.3438 0.0201 0.0505 0.0431 0.1129 0.062 0.1801l0.0011 0.0037c0.0097 0.0337 0.0605 0.2091 0.0382 0.4189 -0.0145 0.136 -0.0556 0.2488 -0.066 0.2774l-0.0011 0.0029c-0.0183 0.0507 -0.0393 0.1009 -0.0595 0.1465 -0.0411 0.0925 -0.0949 0.2016 -0.1589 0.3221 -0.129 0.2425 -0.3136 0.5569 -0.5542 0.9177 -0.4808 0.7211 -1.1986 1.647 -2.1662 2.5637C19.0506 18.2219 16.0743 20.05 12 20.05s-7.05065 -1.8281 -8.9885 -3.6638c-0.96761 -0.9167 -1.6854 -1.8426 -2.16625 -2.5637 -0.240567 -0.3608 -0.425121 -0.6752 -0.55412 -0.9177 -0.064064 -0.1205 -0.117818 -0.2296 -0.158903 -0.3221 -0.020203 -0.0456 -0.041192 -0.0958 -0.0595391 -0.1465l-0.0010886 -0.0029c-0.0104074 -0.0286 -0.0515163 -0.1414 -0.06598965 -0.2774 -0.02232635 -0.2098 0.02845105 -0.3852 0.03821935 -0.4189l0.0010635 -0.0037c0.0188898 -0.0672 0.0418958 -0.1296 0.0620115 -0.1801 0.041309 -0.1038 0.096018 -0.2208 0.158933 -0.3438 0.127414 -0.249 0.311607 -0.5673 0.551363 -0.9293 0.27329 -0.41251 0.6248 -0.89078 1.05633 -1.39543L0.558514 7.56966c-0.390524 -0.39053 -0.390524 -1.02369 0 -1.41422 0.390525 -0.39052 1.023686 -0.39052 1.414216 0l1.29834 1.29834C4.3322 6.50357 5.67561 5.57859 7.3063 4.9333l-0.72028 -1.50058c-0.23899 -0.4979 -0.0291 -1.09527 0.46879 -1.33426ZM12 8.31116c-2.00972 0 -3.63892 1.6292 -3.63892 3.63894 0 2.0097 1.6292 3.6389 3.63892 3.6389 2.0097 0 3.6389 -1.6292 3.6389 -3.6389 0 -2.00974 -1.6292 -3.63894 -3.6389 -3.63894Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/paste", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Copy-Paste--Streamline-Ultimate\"> <g> <path d=\"M13.4 4.73a0.24 0.24 0 0 0 0.2 0.26 1.09 1.09 0 0 1 0.82 1.11v1.4a1.24 1.24 0 0 0 1.25 1.24 1.23 1.23 0 0 0 1.24 -1.24V4a1.5 1.5 0 0 0 -1.49 -1.5h-1.73a0.29 0.29 0 0 0 -0.18 0.07 0.26 0.26 0 0 0 -0.07 0.18c0 0.45 0 1.47 -0.04 1.98\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9 21.26A1.23 1.23 0 0 0 7.71 20H3.48a1.07 1.07 0 0 1 -1 -1.14V6.1A1.08 1.08 0 0 1 3.33 5a0.25 0.25 0 0 0 0.2 -0.26l0 -2a0.25 0.25 0 0 0 -0.25 -0.25H1.5A1.5 1.5 0 0 0 0 4v17a1.5 1.5 0 0 0 1.49 1.5h6.22A1.24 1.24 0 0 0 9 21.26\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.94 4.47v-2a0.5 0.5 0 0 0 -0.5 -0.49h-0.76a0.26 0.26 0 0 1 -0.25 -0.22 2 2 0 0 0 -3.95 0 0.25 0.25 0 0 1 -0.25 0.24h-0.76a0.49 0.49 0 0 0 -0.47 0.48v2a0.49 0.49 0 0 0 0.49 0.5h6a0.5 0.5 0 0 0 0.45 -0.51\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 17.27h-4a0.75 0.75 0 0 0 0 1.5h4a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.29 14.54a0.76 0.76 0 0 0 0.75 0.75h2.49a0.75 0.75 0 0 0 0 -1.5H15a0.76 0.76 0 0 0 -0.71 0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.5 13.46a2 2 0 0 0 -0.58 -1.41l-1.41 -1.4a2 2 0 0 0 -1.41 -0.59h-7.61a2 2 0 0 0 -2 2V22a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2Zm-11 -0.4a1 1 0 0 1 1 -1h6.19a1 1 0 0 1 0.71 0.29l0.82 0.82a1 1 0 0 1 0.29 0.7V21a1 1 0 0 1 -1 1h-7a1 1 0 0 1 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/pin", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Pin--Streamline-Ultimate\"> <g> <path d=\"M23.49 6.27 17.73 0.51a1.48 1.48 0 0 0 -1.05 -0.43 1.5 1.5 0 0 0 -1.25 0.68l-4.1 6.45A7.47 7.47 0 0 0 5.86 8a1.47 1.47 0 0 0 -0.29 2.32l8.1 8.1a1.5 1.5 0 0 0 1.24 0.43 1.53 1.53 0 0 0 1.09 -0.71 7.49 7.49 0 0 0 0.8 -5.47l6.44 -4.1a1.48 1.48 0 0 0 0.25 -2.3Zm-6.2 -2.84 -2.12 3.33a0.5 0.5 0 1 1 -0.84 -0.54l2.12 -3.33a0.5 0.5 0 1 1 0.84 0.54Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.45 15.43 0.51 21.37a1.51 1.51 0 0 0 0 2.12 1.53 1.53 0 0 0 2.13 0l5.94 -5.94a1.5 1.5 0 0 0 -2.13 -2.12Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/power", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Power-Button--Streamline-Ultimate\"> <g> <path d=\"M10.5 10.92a1.5 1.5 0 1 0 3 0V1.5a1.5 1.5 0 0 0 -3 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.2 11.53a10.92 10.92 0 0 0 18.52 9.28 10.83 10.83 0 0 0 3.08 -9.28 11 11 0 0 0 -5.73 -8.13A1.5 1.5 0 1 0 15.63 6a8 8 0 0 1 4.2 6 7.84 7.84 0 0 1 -2.23 6.73 7.92 7.92 0 0 1 -11.2 0A7.83 7.83 0 0 1 4.17 12a8 8 0 0 1 4.19 -6 1.5 1.5 0 0 0 -1.44 -2.6 11 11 0 0 0 -5.72 8.13Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
