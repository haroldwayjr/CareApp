
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

const BATCH = [{"setName": "icon/health/prosthetic", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Prosthetic-Leg-1--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M11.8615 2.01136c2.3345 -1.894194 5.7341 -1.9299513 7.3781 0.56891 0.8164 1.24096 0.8379 2.67397 0.4064 3.89676 -0.4282 1.21366 -1.3197 2.2732 -2.4146 2.78755l-5.6833 2.66982c0.1347 -0.4308 0.2073 -0.8885 0.2073 -1.3625 0 -2.40899 -1.87561 -4.39665 -4.24019 -4.57637L11.8386 2.0311c0.0074 -0.00681 0.0151 -0.01339 0.0229 -0.01974M5.15192 8.23441c-0.61649 0.53239 -1.02254 1.30284 -1.07089 2.16409 -0.00322 0.0574 -0.00486 0.1152 -0.00486 0.1734 0 1.4962 1.06537 2.7395 2.46931 3.027 0.20057 0.0411 0.40804 0.0626 0.6203 0.0626 0.07512 0 0.14963 -0.0027 0.22345 -0.0081 1.59504 -0.1156 2.86617 -1.4585 2.86617 -3.0815 0 -1.6981 -1.39151 -3.0896 -3.08962 -3.0896 -0.76723 0 -1.47187 0.28406 -2.01386 0.75211m2.98963 6.82229 1.45324 2.7105h-0.05958c-0.33488 0 -0.66554 0.0748 -0.96785 0.2188l-3.26873 1.5576c-0.69781 0.3325 -1.14226 1.0366 -1.14226 1.8095 0 1.1071 0.89745 2.0046 2.00452 2.0046h5.59891c1.2426 0 2.25 -1.0074 2.25 -2.25v-1.0905c0 -1.2072 -0.9508 -2.1924 -2.1444 -2.2475l-1.90833 -3.5594c-0.52725 0.4058 -1.14444 0.6999 -1.81552 0.8464\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/pulse", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M17.4999 11.5012c0.263 0 0.5216 0.0716 0.747 0.2071 0.2254 0.1353 0.4097 0.3295 0.5333 0.5615l5.0595 9.6406c0.1138 0.2188 0.1698 0.4635 0.1612 0.71 -0.0087 0.2463 -0.0813 0.486 -0.21 0.6963 -0.1288 0.2103 -0.3097 0.3842 -0.5254 0.5039 -0.2156 0.1196 -0.4585 0.1816 -0.7051 0.1796H12.4403c-0.2469 0.0001 -0.4898 -0.0637 -0.7051 -0.1845 -0.2152 -0.1209 -0.3959 -0.2952 -0.5244 -0.5059 -0.1285 -0.2108 -0.2011 -0.4515 -0.2099 -0.6982 -0.0088 -0.2469 0.0459 -0.4924 0.1591 -0.7119l5.0606 -9.6299c0.1236 -0.232 0.3078 -0.4262 0.5332 -0.5615 0.2254 -0.1354 0.4832 -0.207 0.7461 -0.2071m-0.1953 8.7676c-0.1939 0.0386 -0.372 0.1346 -0.5118 0.2744 -0.1397 0.1398 -0.2348 0.3179 -0.2734 0.5117 -0.0386 0.194 -0.019 0.3954 0.0566 0.5782 0.0757 0.1825 0.204 0.3384 0.3682 0.4482 0.1644 0.1098 0.358 0.1689 0.5557 0.1689 0.2651 0 0.5195 -0.1055 0.707 -0.2929 0.1875 -0.1875 0.2929 -0.4419 0.293 -0.7071 0 -0.1977 -0.0582 -0.3912 -0.168 -0.5556 -0.1099 -0.1645 -0.2665 -0.2925 -0.4492 -0.3682s-0.3842 -0.0962 -0.5781 -0.0576m0.1953 -5.0186c-0.1988 0.0001 -0.3897 0.0792 -0.5303 0.2198 -0.1405 0.1406 -0.2197 0.3314 -0.2197 0.5302v2.5c0 0.1989 0.0791 0.3897 0.2197 0.5303s0.3315 0.2197 0.5303 0.2197 0.3896 -0.0792 0.5303 -0.2197c0.1406 -0.1406 0.2196 -0.3314 0.2197 -0.5303v-2.5c0 -0.1989 -0.0791 -0.3896 -0.2197 -0.5302 -0.1407 -0.1407 -0.3314 -0.2198 -0.5303 -0.2198M0.424683 7.38892C-1.66008 2.68715 4.33099 -3.69188 9.95593 2.68579 16.2437 -4.44337 22.9602 4.39917 18.4012 8.95825l-1.1669 1.05665c-0.3757 0.0341 -0.742 0.1386 -1.0782 0.3105l-0.1748 0.0967c-0.4584 0.2754 -0.8336 0.6716 -1.0849 1.1436l-0.0039 0.0068 -0.5665 1.0762 -3.6982 3.3506c-0.3809 0.3447 -0.96183 0.3447 -1.34277 0L1.51062 8.95825c-0.03232 -0.03232 -0.06256 -0.06686 -0.09375 -0.09961h2.97656c0.23574 -0.00015 0.45806 -0.11129 0.59961 -0.2998l1.31055 -1.74707 2.09473 3.66503c0.12531 0.219 0.35267 0.3602 0.60449 0.376 0.25174 0.0156 0.49495 -0.0963 0.64648 -0.2979l1.77051 -2.3613h2.3125c0.4139 -0.00014 0.7497 -0.33611 0.75 -0.75 -0.0001 -0.41401 -0.336 -0.74985 -0.75 -0.75h-2.6875c-0.2358 0.00014 -0.458 0.11128 -0.5996 0.29981L9.13464 8.74146 7.03992 5.07642c-0.12526 -0.2192 -0.35254 -0.36119 -0.6045 -0.37696 -0.25197 -0.01566 -0.49496 0.0969 -0.64648 0.29883L4.01843 7.35864H0.622925c-0.068855 0.00005 -0.134912 0.01285 -0.198242 0.03028\" stroke-width=\"1\"></path> </svg>"}];
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
