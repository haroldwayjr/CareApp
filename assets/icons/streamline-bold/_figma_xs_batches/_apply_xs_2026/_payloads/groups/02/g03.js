
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

const BATCH = [{"setName": "icon/health/radiology", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Radiology-Scan--Streamline-Ultimate\"> <path d=\"M22.5 0h-21A1.5 1.5 0 0 0 0 1.5v21A1.5 1.5 0 0 0 1.5 24h21a1.5 1.5 0 0 0 1.5 -1.5v-21A1.5 1.5 0 0 0 22.5 0m-2.22 9.7a1 1 0 0 1 -1.41 0.14 10.51 10.51 0 0 0 -5.31 -2 0.5 0.5 0 0 0 -0.56 0.49v1.49a0.5 0.5 0 0 0 0.45 0.5 14.84 14.84 0 0 1 2.78 0.51 12.82 12.82 0 0 1 2 0.78 1 1 0 0 1 -0.44 1.89 1 1 0 0 1 -0.44 -0.1 10.7 10.7 0 0 0 -1.7 -0.65 13.13 13.13 0 0 0 -2.11 -0.41 0.49 0.49 0 0 0 -0.39 0.12 0.5 0.5 0 0 0 -0.17 0.38v1.23a0.5 0.5 0 0 0 0.46 0.5 14.88 14.88 0 0 1 2.77 0.51A1 1 0 0 1 16 17a0.9 0.9 0 0 1 -0.28 0 13.25 13.25 0 0 0 -2.12 -0.41 0.47 0.47 0 0 0 -0.38 0.12 0.5 0.5 0 0 0 -0.17 0.38v2.66a1 1 0 0 1 -2 0v-2.66a0.5 0.5 0 0 0 -0.17 -0.38 0.47 0.47 0 0 0 -0.38 -0.12 13.25 13.25 0 0 0 -2.17 0.41 1 1 0 1 1 -0.56 -1.92 14.88 14.88 0 0 1 2.77 -0.51 0.5 0.5 0 0 0 0.46 -0.5v-1.23a0.5 0.5 0 0 0 -0.17 -0.38 0.49 0.49 0 0 0 -0.39 -0.12 13.13 13.13 0 0 0 -2.11 0.41 10.7 10.7 0 0 0 -1.7 0.65 1 1 0 1 1 -0.88 -1.79 12.82 12.82 0 0 1 2 -0.78 14.88 14.88 0 0 1 2.77 -0.51 0.5 0.5 0 0 0 0.46 -0.5V8.33a0.5 0.5 0 0 0 -0.56 -0.49 10.51 10.51 0 0 0 -5.31 2 1 1 0 0 1 -1.39 -0.14 1 1 0 0 1 0.15 -1.41 12.51 12.51 0 0 1 6.68 -2.47 0.5 0.5 0 0 0 0.45 -0.5V3.75a1 1 0 0 1 2 0v1.57a0.5 0.5 0 0 0 0.45 0.5 12.51 12.51 0 0 1 6.68 2.47 1 1 0 0 1 0.15 1.41\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/sign.language", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sign-Language-Love--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"m6.06686 12.856 4.17294 -4.14506v-0.69268c-0.0106 -0.80213 0.1402 -1.59802 0.4431 -2.34124 0.1962 -0.48153 0.4537 -0.93448 0.7651 -1.3483 -0.1481 -0.20773 -0.3138 -0.40337 -0.4956 -0.58467l-0.4427 -0.43809c-0.3486 -0.35159 -0.79987 -0.58613 -1.29024 -0.67061 -0.49036 -0.08448 -0.99515 -0.01465 -1.44332 0.19966l1.39445 1.39094c0.05086 0.05033 0.09121 0.1101 0.11874 0.17587s0.0417 0.13626 0.0417 0.20745 -0.01417 0.14169 -0.0417 0.20746 -0.06787 0.12553 -0.11874 0.17587 -0.11126 0.09027 -0.17772 0.11752c-0.06646 0.02724 -0.13769 0.04126 -0.20963 0.04126s-0.14317 -0.01402 -0.20963 -0.04126c-0.06646 -0.02725 -0.12685 -0.06718 -0.17771 -0.11752L5.89475 2.57216c-0.12641 -0.12518 -0.27651 -0.22448 -0.44172 -0.29223 -0.1652 -0.06775 -0.34228 -0.10262 -0.52111 -0.10262s-0.3559 0.03487 -0.52111 0.10262 -0.31531 0.16705 -0.44172 0.29223L0.648985 6.90925c-0.126489 0.1251 -0.22683 0.27364 -0.295289 0.43714C0.285236 7.50988 0.25 7.68512 0.25 7.86209c0 0.17698 0.035236 0.35222 0.103696 0.51571 0.06846 0.1635 0.1688 0.31204 0.295289 0.43714L2.99519 11.1587c0.67204 0.6781 1.49975 1.1854 2.41261 1.4786z\" stroke-width=\"1\"></path> <path fill=\"#000000\" d=\"m16.7107 14.2398 1.8814 -0.6243c0.9129 -0.2932 1.7406 -0.8005 2.4126 -1.4786l2.3462 -2.34375c0.1265 -0.1251 0.2269 -0.27364 0.2953 -0.43714 0.0685 -0.16349 0.1037 -0.33873 0.1037 -0.51571 0 -0.17697 -0.0352 -0.35221 -0.1037 -0.5157 -0.0684 -0.1635 -0.1688 -0.31204 -0.2953 -0.43714l-3.3201 -4.33709c-0.1264 -0.12518 -0.2765 -0.22448 -0.4417 -0.29223s-0.3423 -0.10262 -0.5211 -0.10262 -0.3559 0.03487 -0.5211 0.10262 -0.3153 0.16705 -0.4417 0.29223L15.604 5.97081c-0.0508 0.05034 -0.1112 0.09027 -0.1777 0.11752 -0.0665 0.02724 -0.1377 0.04126 -0.2096 0.04126 -0.072 0 -0.1432 -0.01402 -0.2097 -0.04126 -0.0664 -0.02725 -0.1268 -0.06718 -0.1777 -0.11752 -0.0508 -0.05034 -0.0912 -0.1101 -0.1187 -0.17587s-0.0417 -0.13626 -0.0417 -0.20746c0 -0.07119 0.0142 -0.14168 0.0417 -0.20745s0.0679 -0.12553 0.1187 -0.17587l1.3945 -1.39094c-0.4482 -0.21431 -0.953 -0.28414 -1.4433 -0.19966 -0.4904 0.08448 -0.9417 0.31902 -1.2903 0.67061l-0.4427 0.43809c-0.4331 0.43179 -0.7746 0.94487 -1.0046 1.5091 -0.2299 0.56423 -0.3437 1.16824 -0.3345 1.77657V9.3222L5.14575 15.841 3.8606 17.0799l5.11002 4.7428z\" stroke-width=\"1\"></path> <path fill=\"#000000\" d=\"m13.5046 19.4369 3.9913 -3.9102 1.5114 -0.5015 1.8042 1.795 -4.9691 4.9395z\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/sleep", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sleep-Zzz--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M11.6831 7.79864c0.165 0.35047 0.5175 0.57417 0.9048 0.57417h5.2707c0.5522 0 1 -0.44772 1 -1 0 -0.55229 -0.4478 -1 -1 -1h-3.1459l3.9164 -4.73549c0.2469 -0.29848 0.2992 -0.712688 0.1342 -1.063158C18.5984 0.223692 18.2459 0 17.8585 0h-5.2706c-0.5523 0 -1 0.447715 -1 1 0 0.55228 0.4477 1 1 1h3.1459l-3.9165 4.73548c-0.2469 0.29849 -0.2991 0.71269 -0.1342 1.06316M0.108384 16.3442c0.164947 0.3505 0.517454 0.5742 0.904796 0.5742h7.0678c0.55229 0 1 -0.4477 1 -1s-0.44771 -1 -1 -1H3.13793l5.71365 -6.90843c0.24686 -0.29849 0.29915 -0.71269 0.1342 -1.06316 -0.16494 -0.35047 -0.51745 -0.57416 -0.9048 -0.57416h-7.0678c-0.552281 0 -0.9999964 0.44771 -0.9999964 1 0 0.55228 0.4477154 1 0.9999964 1h4.94305L0.242587 15.2811c-0.24686411 0.2985 -0.2991493 0.7127 -0.134203 1.0631M14.2974 24.0001c-0.3874 0 -0.7399 -0.2237 -0.9048 -0.5742 -0.165 -0.3505 -0.1127 -0.7647 0.1342 -1.0631l7.0222 -8.4907h-6.2516c-0.5523 0 -1 -0.4477 -1 -1s0.4477 -1 1 -1h8.3763c0.3874 0 0.7399 0.2237 0.9048 0.5742 0.165 0.3504 0.1127 0.7646 -0.1342 1.0631l-7.0222 8.4907h6.2516c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/stethoscope", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Stethoscope-Website--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6.825 10.64h-0.882v3.705a2.764 2.764 0 0 0 5.527 0V10.64h-0.881a1 1 0 1 1 0 -2h0.94a1.941 1.941 0 0 1 1.941 1.941v3.764a4.764 4.764 0 0 1 -3.736 4.652 3.234 3.234 0 0 0 6.441 -0.418v-1.557a2.537 2.537 0 1 1 2 0v1.557a5.234 5.234 0 0 1 -10.45 0.427 4.764 4.764 0 0 1 -3.782 -4.661V10.58a1.94 1.94 0 0 1 1.94 -1.94h0.942a1 1 0 1 1 0 2\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M2.074 21.245V5.981h19.852v15.264a0.681 0.681 0 0 1 -0.68 0.681h-2.461a6.736 6.736 0 0 1 -1.75 2h4.21c1.48 0 2.681 -1.2 2.681 -2.68V2.754c0 -1.48 -1.2 -2.681 -2.68 -2.681H2.754a2.68 2.68 0 0 0 -2.681 2.68v18.491c0 1.48 1.2 2.681 2.68 2.681h6.093a6.738 6.738 0 0 1 -1.75 -2H2.755a0.681 0.681 0 0 1 -0.681 -0.68m6.843 0.681a5.234 5.234 0 0 0 8.049 0h-8.05ZM4.53 3.152a0.956 0.956 0 1 1 -1.911 0 0.956 0.956 0 0 1 1.911 0m2.316 0.956a0.956 0.956 0 1 0 0 -1.911 0.956 0.956 0 0 0 0 1.911\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
