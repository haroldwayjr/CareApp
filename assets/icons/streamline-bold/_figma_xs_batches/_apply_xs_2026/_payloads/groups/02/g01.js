
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

const BATCH = [{"setName": "icon/health/pediatric", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Baby--Streamline-Ultimate\"> <g> <path d=\"M10.55 11.78a1 1 0 0 0 -1 -1 1 1 0 0 0 -1 0.73 0.52 0.52 0 0 1 -0.51 0.4 0.52 0.52 0 0 1 -0.51 -0.38 1 1 0 0 0 -2 0.28A2.28 2.28 0 0 0 8 13.91a2.27 2.27 0 0 0 2.55 -2.13\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.38 10.78a1 1 0 0 0 -1 0.72 0.53 0.53 0 0 1 -1 0 1 1 0 0 0 -1 -0.73 1 1 0 0 0 -1 1 2.27 2.27 0 0 0 2.46 2.1 2.28 2.28 0 0 0 2.47 -2.1 1 1 0 0 0 -0.93 -0.99\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.81 16.3a1 1 0 0 0 -1.37 0.35 1.86 1.86 0 0 1 -1.44 0.49 1.86 1.86 0 0 1 -1.44 -0.49 1 1 0 1 0 -1.72 1A3.6 3.6 0 0 0 12 19.14a3.6 3.6 0 0 0 3.16 -1.47 1 1 0 0 0 -0.35 -1.37\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.57 9.93a1 1 0 0 1 -0.38 -0.58A10.57 10.57 0 0 0 12 1 10.57 10.57 0 0 0 1.81 9.35a1 1 0 0 1 -0.38 0.58 3.5 3.5 0 0 0 0.48 5.94 0.94 0.94 0 0 1 0.46 0.5A10.51 10.51 0 0 0 12 23a10.51 10.51 0 0 0 9.63 -6.63 0.94 0.94 0 0 1 0.46 -0.5 3.5 3.5 0 0 0 0.48 -5.94m-1.77 4.29a1 1 0 0 0 -0.76 0.67A8.46 8.46 0 0 1 12 21a8.46 8.46 0 0 1 -8 -6.11 1 1 0 0 0 -0.76 -0.67A1.5 1.5 0 0 1 3 11.34a1 1 0 0 0 0.64 -0.78A8.64 8.64 0 0 1 12 3a1.5 1.5 0 0 1 1.45 1.34 1 1 0 0 1 -0.89 1.09 0.58 0.58 0 0 1 -0.65 -0.61 1 1 0 1 0 -2 -0.44 2.52 2.52 0 0 0 0.9 2.47 2.8 2.8 0 0 0 3.92 -0.51 2.94 2.94 0 0 0 0.66 -2.15 0.26 0.26 0 0 1 0.16 -0.19 0.25 0.25 0 0 1 0.25 0 9 9 0 0 1 4.59 6.62 1 1 0 0 0 0.64 0.78 1.5 1.5 0 0 1 -0.23 2.88Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/health/pharmacy", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Pharmacy--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m16.123 1.77856 -1.9414 4.14867 4.7589 0c0.099 0 0.1967 0.00402 0.2932 0.01189l0.6536 -2.86734c0.2269 -0.99504 -0.3313 -2.00141 -1.2955 -2.335881 -0.9685 -0.335964 -2.0343 0.114158 -2.4688 1.042661M20.8425 20.759c0.4181 1.2918 -0.5451 2.6158 -1.9028 2.6158H5.06006c-1.35775 0 -2.32088 -1.324 -1.90284 -2.6158l1.3354 -4.1264c0.2591 -0.8006 0.2591 -1.6625 0 -2.4632L3.15723 10.043c-0.41805 -1.29174 0.54509 -2.61575 1.90283 -2.61575H18.9397c1.3577 0 2.3209 1.32401 1.9028 2.61575l-1.3354 4.1264c-0.2591 0.8007 -0.2591 1.6626 0 2.4632zm-10.368 -2.2586c0 0.5523 0.4477 1 1 1h1.0551c0.5522 0 1 -0.4477 1 -1v-1.5718h1.573c0.5522 0 1 -0.4477 1 -1v-1.055c0 -0.5523 -0.4478 -1 -1 -1h-1.573v-1.5718c0 -0.5522 -0.4478 -1 -1 -1h-1.0551c-0.5523 0 -1 0.4478 -1 1v1.5718l-1.57047 0c-0.55229 0 -1 0.4477 -1 1v1.055c0 0.5523 0.44771 1 0.99999 1h1.57048z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/pharmacy.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M17.3845 12.082c1.5133 -1.5132 3.9672 -1.5132 5.4805 0 1.513 1.5133 1.5132 3.9673 0 5.4805l-5.3037 5.3027c-1.5132 1.5131 -3.9663 1.513 -5.4795 0 -1.5133 -1.5132 -1.5132 -3.9662 0 -5.4795zm-1.0908 -5.21384c0.1107 -0.11598 0.3014 -0.1159 0.4121 0 0.6676 0.69925 1.6238 1.13178 2.669 1.13184 0.2724 0 0.5392 -0.03054 0.7959 -0.08691 0.1649 -0.03596 0.3291 0.08507 0.3291 0.2539v1.02637c-0.0003 0.14471 -0.1229 0.25875 -0.2676 0.25586 -1.4111 -0.02819 -2.8313 0.49536 -3.9082 1.57228l-5.3037 5.3027c-1.1374 1.1375 -1.65706 2.6582 -1.56156 4.1465 0.00939 0.149 -0.10561 0.2791 -0.25488 0.2793h-6.4541C1.78344 20.7499 0.999892 19.9663 0.999756 19V8.16699c0.000006 -0.16876 0.164274 -0.28971 0.329104 -0.2539 0.25669 0.05639 0.52344 0.08689 0.7959 0.08691 1.04521 0 2.00136 -0.4326 2.66894 -1.13184 0.1107 -0.11598 0.30136 -0.1159 0.41211 0C5.87335 7.56741 6.82957 7.99994 7.87476 8c1.04521 0 2.00136 -0.4326 2.66894 -1.13184 0.1107 -0.11598 0.3014 -0.1159 0.4121 0 0.6676 0.69925 1.6238 1.13178 2.669 1.13184 1.0452 0 2.0013 -0.4326 2.6689 -1.13184m5.1572 6.62794c-0.7321 -0.7321 -1.9191 -0.7319 -2.6513 0l-2.4746 2.4746c-0.0977 0.0976 -0.0976 0.2559 0 0.3535l2.2978 2.2988c0.096 0.0956 0.2498 0.0965 0.3477 0.004l2.4804 -2.4795c0.7319 -0.7322 0.7319 -1.9193 0 -2.6514M19.5134 0c0.1021 0.000109171 0.1945 0.062393 0.2324 0.157227l1.6758 4.193363c0.0498 0.12455 0.0778 0.25858 0.0606 0.3916 -0.1257 0.96676 -0.9931 1.75751 -2.1065 1.75781 -1.2053 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.336 -0.74966 -0.75 -0.75 -0.4142 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.9199 1.99968 -2.125 2 -1.2053 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.336 -0.74966 -0.75 -0.75 -0.4142 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.9199 1.99968 -2.12497 2 -1.20537 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.33607 -0.74966 -0.75 -0.75 -0.41421 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.91993 1.99968 -2.125 2C1.0121 6.5 0.143958 5.70915 0.0183105 4.74219c-0.01724928 -0.13297 0.0108045 -0.2671 0.0605469 -0.3916L1.75562 0.157227C1.7936 0.0624838 1.88499 0.0000865802 1.98706 0z\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/pill", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Pill--Streamline-Ultimate\"> <g> <path d=\"M21.89 2.11a7.22 7.22 0 0 0 -10.2 0l-9.57 9.58A7.2 7.2 0 0 0 7.21 24a7.15 7.15 0 0 0 5.1 -2.1l9.58 -9.58A7.13 7.13 0 0 0 24 7.22a7.16 7.16 0 0 0 -2.11 -5.11m-1.41 8.79 -3.73 3.72a0.5 0.5 0 0 1 -0.71 0L9.38 8a0.51 0.51 0 0 1 0 -0.71l3.73 -3.72a5.21 5.21 0 0 1 7.37 7.37Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.63 3.16a4.13 4.13 0 0 0 -2.91 1.2 0.75 0.75 0 0 0 0 1.06 0.74 0.74 0 0 0 1.06 0 2.7 2.7 0 0 1 3.7 0 0.74 0.74 0 0 0 0.53 0.22 0.71 0.71 0 0 0 0.53 -0.22 0.74 0.74 0 0 0 0 -1.06 4.1 4.1 0 0 0 -2.91 -1.2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
