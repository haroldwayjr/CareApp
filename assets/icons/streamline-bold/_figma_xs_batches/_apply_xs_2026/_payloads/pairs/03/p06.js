
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

const BATCH = [{"setName": "icon/misc/balloon", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Balloon-Party--Streamline-Ultimate\"> <g> <path d=\"M19.6 16.62a2.87 2.87 0 1 0 -2.87 -2.87 2.88 2.88 0 0 0 2.87 2.87\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.66 18.67a1.49 1.49 0 0 1 -1.71 0.09L12.66 18a1.75 1.75 0 0 0 -2.53 0.86 1.82 1.82 0 0 0 0.81 2.14l2.42 1.45a1.72 1.72 0 0 0 0.9 0.25 1.78 1.78 0 0 0 0.61 -0.11l1.89 -1v2h7v-2c-0.03 -3.73 -4.67 -5.59 -8.1 -2.92\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.52 16.25a6.81 6.81 0 0 1 -2.46 -4.93A4.6 4.6 0 0 0 8.5 9.7a5.82 5.82 0 0 0 1.22 -3.81 5.82 5.82 0 0 0 -1.44 -3.73A4.42 4.42 0 0 0 4.83 0.62a4.47 4.47 0 0 0 -3.36 1.74A5.82 5.82 0 0 0 0.26 6.17a5.82 5.82 0 0 0 1.43 3.72 4.53 4.53 0 0 0 2.37 1.44 8.8 8.8 0 0 0 3.12 6.41 1 1 0 0 0 1.34 -1.49M3.18 8.56a3.86 3.86 0 0 1 -0.93 -2.45A3.89 3.89 0 0 1 3 3.61a2.45 2.45 0 0 1 1.85 -1H5a2.47 2.47 0 0 1 1.84 0.88A3.86 3.86 0 0 1 7.72 6a3.83 3.83 0 0 1 -0.78 2.5 2.47 2.47 0 0 1 -1.85 1 2.49 2.49 0 0 1 -1.91 -0.94\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10 14.74a1 1 0 0 0 0.7 1.26 0.9 0.9 0 0 0 0.3 0 1 1 0 0 0 1 -0.71 11 11 0 0 0 0.4 -3.46A5.36 5.36 0 0 0 16.3 7c0.3 -3 -1.58 -5.6 -4.18 -5.86a5.43 5.43 0 0 0 -0.57 0 1 1 0 0 0 -1 1 1 1 0 0 0 1 1h0.3c1.5 0.15 2.57 1.8 2.38 3.67s-1.55 3.28 -3.06 3.13a1.91 1.91 0 0 1 -0.33 -0.06 1 1 0 0 0 -0.6 1.9 8.41 8.41 0 0 1 -0.24 2.96\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/bike", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Bicycle--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M18.2393 4.42879c0.1344 0.53569 -0.1909 1.07889 -0.7266 1.21327l-0.8808 0.22094 1.703 4.6774c0.2312 -0.0333 0.4676 -0.0506 0.708 -0.0506 2.7165 0 4.9188 2.2023 4.9188 4.9189s-2.2023 4.9188 -4.9188 4.9188c-2.7166 0 -4.9189 -2.2022 -4.9189 -4.9188 0 -1.7674 0.9321 -3.317 2.3315 -4.1842l-0.4116 -1.1307 -3.8811 5.8675c-0.1852 0.28 -0.4984 0.4484 -0.8341 0.4484H9.77382c-0.46238 2.2366 -2.4433 3.9178 -4.8169 3.9178 -2.7166 0 -4.9188341 -2.2022 -4.9188341 -4.9188S2.24032 10.4898 4.95692 10.4898c0.66784 0 1.3046 0.1331 1.88519 0.3742l0.8489 -1.03703 -0.92955 -1.7114h-0.68871c-0.55228 0 -1 -0.44771 -1 -1 0 -0.55228 0.44772 -1 1 -1h2.93913c0.55228 0 1.00002 0.44772 1.00002 1 0 0.5438 -0.43408 0.98622 -0.97464 0.99969l0.3538 0.65139 5.61084 -1.53478 -0.4418 -1.21355 -0.0005 -0.00117c-0.0715 -0.19581 -0.1012 -0.40447 -0.087 -0.6125 0.0142 -0.20843 0.0721 -0.41155 0.1698 -0.59615 0.0978 -0.18462 0.2333 -0.3466 0.3978 -0.47543 0.1644 -0.12877 0.3539 -0.22155 0.5565 -0.27233l0.0003 -0.00009 1.4291 -0.35848c0.5356 -0.13439 1.0788 0.19094 1.2132 0.72662m-0.1358 11.32201 -0.9383 -2.577c-0.6366 0.5355 -1.0412 1.3379 -1.0412 2.2349 0 1.612 1.3068 2.9188 2.9189 2.9188 1.612 0 2.9188 -1.3068 2.9188 -2.9188 0 -1.6115 -1.3059 -2.9179 -2.9171 -2.9189l0.9382 2.5768c0.1889 0.519 -0.0786 1.0928 -0.5975 1.2818 -0.519 0.1889 -1.0929 -0.0786 -1.2818 -0.5976m-8.32927 -1.3411h1.01697l3.192 -4.8257 -4.52098 1.2367 -0.96245 1.1758c0.63193 0.6559 1.08339 1.487 1.27446 2.4132m-2.55637 -0.8472c0.20518 0.251 0.3694 0.5368 0.48245 0.8472H6.52445zm-1.7439 -1.027 -1.15305 1.4086c-0.34676 0.3994 -0.49295 0.9742 -0.29892 1.5118 0.22186 0.6148 0.79859 0.9538 1.42569 0.9538h2.2519c-0.4085 1.119 -1.48229 1.9178 -2.74266 1.9178 -1.61203 0 -2.91883 -1.3068 -2.91883 -2.9188 0 -1.6121 1.3068 -2.9189 2.91883 -2.9189 0.17644 0 0.34922 0.0157 0.51704 0.0457\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
