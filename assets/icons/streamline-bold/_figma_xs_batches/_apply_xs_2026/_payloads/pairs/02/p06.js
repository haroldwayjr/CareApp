
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

const BATCH = [{"setName": "icon/health/radiology", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Radiology-Scan--Streamline-Ultimate\"> <path d=\"M22.5 0h-21A1.5 1.5 0 0 0 0 1.5v21A1.5 1.5 0 0 0 1.5 24h21a1.5 1.5 0 0 0 1.5 -1.5v-21A1.5 1.5 0 0 0 22.5 0m-2.22 9.7a1 1 0 0 1 -1.41 0.14 10.51 10.51 0 0 0 -5.31 -2 0.5 0.5 0 0 0 -0.56 0.49v1.49a0.5 0.5 0 0 0 0.45 0.5 14.84 14.84 0 0 1 2.78 0.51 12.82 12.82 0 0 1 2 0.78 1 1 0 0 1 -0.44 1.89 1 1 0 0 1 -0.44 -0.1 10.7 10.7 0 0 0 -1.7 -0.65 13.13 13.13 0 0 0 -2.11 -0.41 0.49 0.49 0 0 0 -0.39 0.12 0.5 0.5 0 0 0 -0.17 0.38v1.23a0.5 0.5 0 0 0 0.46 0.5 14.88 14.88 0 0 1 2.77 0.51A1 1 0 0 1 16 17a0.9 0.9 0 0 1 -0.28 0 13.25 13.25 0 0 0 -2.12 -0.41 0.47 0.47 0 0 0 -0.38 0.12 0.5 0.5 0 0 0 -0.17 0.38v2.66a1 1 0 0 1 -2 0v-2.66a0.5 0.5 0 0 0 -0.17 -0.38 0.47 0.47 0 0 0 -0.38 -0.12 13.25 13.25 0 0 0 -2.17 0.41 1 1 0 1 1 -0.56 -1.92 14.88 14.88 0 0 1 2.77 -0.51 0.5 0.5 0 0 0 0.46 -0.5v-1.23a0.5 0.5 0 0 0 -0.17 -0.38 0.49 0.49 0 0 0 -0.39 -0.12 13.13 13.13 0 0 0 -2.11 0.41 10.7 10.7 0 0 0 -1.7 0.65 1 1 0 1 1 -0.88 -1.79 12.82 12.82 0 0 1 2 -0.78 14.88 14.88 0 0 1 2.77 -0.51 0.5 0.5 0 0 0 0.46 -0.5V8.33a0.5 0.5 0 0 0 -0.56 -0.49 10.51 10.51 0 0 0 -5.31 2 1 1 0 0 1 -1.39 -0.14 1 1 0 0 1 0.15 -1.41 12.51 12.51 0 0 1 6.68 -2.47 0.5 0.5 0 0 0 0.45 -0.5V3.75a1 1 0 0 1 2 0v1.57a0.5 0.5 0 0 0 0.45 0.5 12.51 12.51 0 0 1 6.68 2.47 1 1 0 0 1 0.15 1.41\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/sign.language", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sign-Language-Love--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"m6.06686 12.856 4.17294 -4.14506v-0.69268c-0.0106 -0.80213 0.1402 -1.59802 0.4431 -2.34124 0.1962 -0.48153 0.4537 -0.93448 0.7651 -1.3483 -0.1481 -0.20773 -0.3138 -0.40337 -0.4956 -0.58467l-0.4427 -0.43809c-0.3486 -0.35159 -0.79987 -0.58613 -1.29024 -0.67061 -0.49036 -0.08448 -0.99515 -0.01465 -1.44332 0.19966l1.39445 1.39094c0.05086 0.05033 0.09121 0.1101 0.11874 0.17587s0.0417 0.13626 0.0417 0.20745 -0.01417 0.14169 -0.0417 0.20746 -0.06787 0.12553 -0.11874 0.17587 -0.11126 0.09027 -0.17772 0.11752c-0.06646 0.02724 -0.13769 0.04126 -0.20963 0.04126s-0.14317 -0.01402 -0.20963 -0.04126c-0.06646 -0.02725 -0.12685 -0.06718 -0.17771 -0.11752L5.89475 2.57216c-0.12641 -0.12518 -0.27651 -0.22448 -0.44172 -0.29223 -0.1652 -0.06775 -0.34228 -0.10262 -0.52111 -0.10262s-0.3559 0.03487 -0.52111 0.10262 -0.31531 0.16705 -0.44172 0.29223L0.648985 6.90925c-0.126489 0.1251 -0.22683 0.27364 -0.295289 0.43714C0.285236 7.50988 0.25 7.68512 0.25 7.86209c0 0.17698 0.035236 0.35222 0.103696 0.51571 0.06846 0.1635 0.1688 0.31204 0.295289 0.43714L2.99519 11.1587c0.67204 0.6781 1.49975 1.1854 2.41261 1.4786z\" stroke-width=\"1\"></path> <path fill=\"#000000\" d=\"m16.7107 14.2398 1.8814 -0.6243c0.9129 -0.2932 1.7406 -0.8005 2.4126 -1.4786l2.3462 -2.34375c0.1265 -0.1251 0.2269 -0.27364 0.2953 -0.43714 0.0685 -0.16349 0.1037 -0.33873 0.1037 -0.51571 0 -0.17697 -0.0352 -0.35221 -0.1037 -0.5157 -0.0684 -0.1635 -0.1688 -0.31204 -0.2953 -0.43714l-3.3201 -4.33709c-0.1264 -0.12518 -0.2765 -0.22448 -0.4417 -0.29223s-0.3423 -0.10262 -0.5211 -0.10262 -0.3559 0.03487 -0.5211 0.10262 -0.3153 0.16705 -0.4417 0.29223L15.604 5.97081c-0.0508 0.05034 -0.1112 0.09027 -0.1777 0.11752 -0.0665 0.02724 -0.1377 0.04126 -0.2096 0.04126 -0.072 0 -0.1432 -0.01402 -0.2097 -0.04126 -0.0664 -0.02725 -0.1268 -0.06718 -0.1777 -0.11752 -0.0508 -0.05034 -0.0912 -0.1101 -0.1187 -0.17587s-0.0417 -0.13626 -0.0417 -0.20746c0 -0.07119 0.0142 -0.14168 0.0417 -0.20745s0.0679 -0.12553 0.1187 -0.17587l1.3945 -1.39094c-0.4482 -0.21431 -0.953 -0.28414 -1.4433 -0.19966 -0.4904 0.08448 -0.9417 0.31902 -1.2903 0.67061l-0.4427 0.43809c-0.4331 0.43179 -0.7746 0.94487 -1.0046 1.5091 -0.2299 0.56423 -0.3437 1.16824 -0.3345 1.77657V9.3222L5.14575 15.841 3.8606 17.0799l5.11002 4.7428z\" stroke-width=\"1\"></path> <path fill=\"#000000\" d=\"m13.5046 19.4369 3.9913 -3.9102 1.5114 -0.5015 1.8042 1.795 -4.9691 4.9395z\" stroke-width=\"1\"></path> </svg>"}];
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
