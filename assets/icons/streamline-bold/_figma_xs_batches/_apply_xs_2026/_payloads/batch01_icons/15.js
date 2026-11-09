
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

const BATCH = [{"setName": "icon/health/mental.wellness", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Mindfulness-2--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M5.48795 1.96055C7.12798 0.843956 9.06658 0.24783 11.0506 0.250006c1.856 0.000037 3.3761 0.382892 4.6487 1.083604 1.2712 0.69993 2.2664 1.70106 3.0968 2.89519 1.3614 1.9577 2.3161 4.49863 3.3189 7.1673l0.0001 0.0003c0.2056 0.5472 0.4132 1.0998 0.6268 1.6538l0.0003 0.0007c0.0726 0.1893 0.0981 0.3935 0.0744 0.5948 -0.0238 0.2014 -0.0962 0.394 -0.2109 0.5612 -0.1148 0.1672 -0.2684 0.304 -0.4478 0.3986 -0.1793 0.0946 -0.379 0.1442 -0.5818 0.1445l-0.0007 0h-1.4v2.5c0 0.9283 -0.3688 1.8185 -1.0252 2.4749 -0.6563 0.6564 -1.5466 1.0251 -2.4748 1.0251h-1v2.5c0 0.2761 -0.2239 0.5 -0.5 0.5H4.67536c-0.27615 0 -0.5 -0.2239 -0.5 -0.5V17.2c-1.36989 -1.3272 -2.32685 -3.0244 -2.75255 -4.8869 -0.442101 -1.9343 -0.29066 -3.95691 0.43455 -5.80377 0.72521 -1.84687 1.99048 -3.43214 3.63059 -4.54878m5.72185 6.07558c-1.39717 0 -2.76449 0.78392 -3.7623 1.57547 -0.50333 0.3993 -0.92366 0.8092 -1.21996 1.142 -0.14786 0.166 -0.26757 0.3159 -0.35199 0.438 -0.04194 0.0607 -0.07812 0.1188 -0.10489 0.1714 -0.02068 0.0406 -0.05728 0.1176 -0.05728 0.2021 0 0.0846 0.0366 0.1615 0.05728 0.2021 0.02677 0.0527 0.06295 0.1107 0.10489 0.1714 0.08442 0.1222 0.20413 0.272 0.35199 0.4381 0.2963 0.3327 0.71663 0.7426 1.21996 1.1419 0.99781 0.7916 2.36513 1.5755 3.7623 1.5755 1.3972 0 2.7646 -0.7854 3.7623 -1.5775 0.5033 -0.3996 0.9236 -0.8097 1.2198 -1.1421 0.1478 -0.1658 0.2675 -0.3154 0.3518 -0.4371 0.0419 -0.0604 0.0781 -0.1182 0.1048 -0.1704 0.0205 -0.04 0.0576 -0.117 0.0576 -0.2019 0 -0.0848 -0.0371 -0.1619 -0.0576 -0.2018 -0.0267 -0.0523 -0.0629 -0.1101 -0.1048 -0.1705 -0.0843 -0.1217 -0.204 -0.2712 -0.3518 -0.4371 -0.2962 -0.3324 -0.7165 -0.7425 -1.2198 -1.14208 -0.9977 -0.79213 -2.3651 -1.57749 -3.7623 -1.57749M6.93348 5.4096c-0.24854 -0.33136 -0.71864 -0.3985 -1.05 -0.14997 -0.33137 0.24854 -0.39851 0.71865 -0.14997 1.05001l0.85205 1.13599c0.24854 0.33136 0.71864 0.3985 1.05001 0.14996 0.33136 -0.24854 0.3985 -0.71864 0.14996 -1.05001zm9.74502 -0.14997c-0.3313 -0.24853 -0.8014 -0.18139 -1.05 0.14997l-0.852 1.13598c-0.2486 0.33137 -0.1814 0.80147 0.1499 1.05001 0.3314 0.24854 0.8015 0.1814 1.05 -0.14996l0.8521 -1.13599c0.2485 -0.33136 0.1814 -0.80147 -0.15 -1.05001m-4.719 -0.80802c0 -0.41422 -0.3358 -0.74999 -0.75 -0.74999 -0.4143 0.00001 -0.75 0.33581 -0.75 0.75002l0 1.408c0 0.41421 0.3358 0.74999 0.75 0.74998s0.75 -0.3358 0.75 -0.75002zm-0.7439 8.28379 -0.0062 0c-0.6464 0 -1.1703 -0.524 -1.1703 -1.1703 0 -0.6443 0.5206 -1.167 1.1641 -1.1703l0.0062 0c0.6463 0 1.1703 0.5239 1.1703 1.1703 0 0.6443 -0.5206 1.1669 -1.1641 1.1703\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
