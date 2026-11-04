
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

const BATCH = [{"setName": "icon/health/pregnancy", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Pregnancy-Vgr--Streamline-Ultimate\"> <g> <path d=\"M16 5.56a1.08 1.08 0 0 0 -1.51 0l-0.56 0.56a0.3 0.3 0 0 0 0 0.41L15 7.63a0.28 0.28 0 0 0 0.41 0l0.59 -0.55a1.07 1.07 0 0 0 0 -1.52\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.19 0.05 5.26 3.49a2.3 2.3 0 0 0 -1.77 1.77L0.05 21.19A2.33 2.33 0 0 0 2.81 24l15.93 -3.44a2.3 2.3 0 0 0 1.77 -1.77L24 2.81A2.33 2.33 0 0 0 21.19 0.05M8 13.49a10.59 10.59 0 0 1 3 6 0.87 0.87 0 0 1 -1 1 10.64 10.64 0 0 1 -6 -3l-1.31 -1.4a0.87 0.87 0 0 1 1.23 -1.23l1.37 1.37a9 9 0 0 0 3.38 2.11c0.12 0 0.29 -0.13 0.25 -0.25a8.87 8.87 0 0 0 -2.11 -3.37l-1.37 -1.38a0.87 0.87 0 1 1 1.23 -1.23Zm5 -4.12a0.87 0.87 0 0 1 -1.23 1.23l-0.45 -0.46a1.07 1.07 0 0 0 -1.52 0 1.06 1.06 0 0 0 0 1.51l2.74 2.75a1.07 1.07 0 0 0 1.52 0 1.09 1.09 0 0 0 0.24 -1.16c0 -0.06 -0.09 -0.19 -0.17 -0.11l-0.21 0.21a0.87 0.87 0 0 1 -1.23 -1.23l0.91 -0.91a0.87 0.87 0 0 1 1.23 0l0.46 0.45a2.81 2.81 0 0 1 -4 4l-2.65 -2.77a2.81 2.81 0 1 1 4 -4Zm8.49 -0.3a0.85 0.85 0 0 1 -0.25 0.61 0.88 0.88 0 0 1 -0.62 0.26h-2.86c-0.19 0 -0.28 0.17 -0.18 0.28l1 1a0.87 0.87 0 1 1 -1.23 1.23l-5.51 -5.51a0.87 0.87 0 0 1 0 -1.23l1.27 -1.27a2.92 2.92 0 0 1 3.83 -0.33 2.8 2.8 0 0 1 0.66 3.66 0.29 0.29 0 0 0 0.25 0.43h2.84a0.87 0.87 0 0 1 0.87 0.87Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/health/prescription", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Prescription-Px--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.33765 2.13673v7.54028l3.70888 0.01416c0.05956 -0.00511 0.11949 -0.00488 0.17901 0.00068l1.24989 0.00477c2.08217 0 3.77017 -1.68794 3.77017 -3.77013s-1.688 -3.77013 -3.77017 -3.77013zm0 9.54027 3.39071 0.013 6.34064 6.3407 -4.22069 4.2207c-0.38924 0.3892 -0.38923 1.0203 0.00001 1.4096 0.38928 0.3892 1.02038 0.3892 1.40958 -0.0001l4.2206 -4.2206 4.2208 4.2208c0.3893 0.3893 1.0204 0.3893 1.4096 0 0.3893 -0.3892 0.3893 -1.0203 0 -1.4095l-4.2208 -4.2209 4.2215 -4.2216c0.3892 -0.3892 0.3892 -1.0203 -0.0001 -1.4096 -0.3892 -0.3892 -1.0203 -0.3892 -1.4095 0l-4.2215 4.2216 -5.0095 -5.0097c2.7133 -0.4709 4.7766 -2.83694 4.7766 -5.68491 0 -3.18676 -2.5834 -5.770134 -5.77017 -5.770134L3.83803 0.134827c-0.5193 0 -0.94615 0.395837 -0.99528 0.902243 -0.00337 0.02884 -0.0051 0.05818 -0.0051 0.08793v18.097c0 0.4142 0.33578 0.75 0.75 0.75 0.41421 0 0.75 -0.3358 0.75 -0.75z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
