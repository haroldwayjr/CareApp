
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

const BATCH = [{"setName": "icon/navigation/panel.top", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Layout-5--Streamline-Ultimate\"> <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2ZM9.5 8h12a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-12a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5ZM22 2.5v3a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-3a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5ZM2.5 8h4a0.5 0.5 0 0 1 0.5 0.5v13a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.5 -0.5v-13a0.5 0.5 0 0 1 0.5 -0.5ZM9 21.5v-5a0.5 0.5 0 0 1 0.5 -0.5h12a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-12a0.5 0.5 0 0 1 -0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/resize", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Expand-8--Streamline-Ultimate\"> <g> <path d=\"M1.97 13.41h7.16s1.46 0 1.46 1.46v7.16s0 1.46 -1.46 1.46H1.97s-1.46 0 -1.46 -1.46v-7.16s0 -1.46 1.46 -1.46\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.49 9.43a1.25 1.25 0 0 0 1.25 -1.25V3A0.25 0.25 0 0 1 3 2.74h5.18a1.25 1.25 0 0 0 0 -2.5H2.44a2.21 2.21 0 0 0 -2.2 2.2v5.74a1.25 1.25 0 0 0 1.25 1.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.76 2.44a2.21 2.21 0 0 0 -2.2 -2.2h-5.74a1.25 1.25 0 1 0 0 2.5H21a0.25 0.25 0 0 1 0.25 0.25v5.19a1.25 1.25 0 0 0 2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.76 21.55v-5.73a1.25 1.25 0 1 0 -2.5 0V21a0.25 0.25 0 0 1 -0.25 0.25H16.3a1.25 1.25 0 0 0 0 2.5h5.26a2.21 2.21 0 0 0 2.2 -2.2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/navigation/route", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M6.29297 18.293c0.39052 -0.3906 1.02354 -0.3906 1.41406 0 0.39053 0.3905 0.39053 1.0235 0 1.414L6.41406 21l1.29297 1.293c0.39053 0.3905 0.39053 1.0235 0 1.414 -0.39052 0.3906 -1.02354 0.3906 -1.41406 0L5 22.4141 3.70703 23.707c-0.39052 0.3906 -1.02354 0.3906 -1.41406 0 -0.39053 -0.3905 -0.39053 -1.0235 0 -1.414L3.58594 21l-1.29297 -1.293c-0.39053 -0.3905 -0.39053 -1.0235 0 -1.414 0.39052 -0.3906 1.02354 -0.3906 1.41406 0L5 19.5859zM19 0c1.6569 0 3 1.34315 3 3s-1.3431 3 -3 3c-1.3059 0 -2.4141 -0.83532 -2.8262 -2H8.5c-1.03806 0 -1.97037 0.4521 -2.61133 1.16992C6.56642 5.71996 7 6.55912 7 7.5c0 0.94066 -0.43385 1.77906 -1.11133 2.3291C6.52964 10.5472 7.46167 11 8.5 11h7c1.9313 0 3.6291 0.9961 4.6104 2.502C21.7161 13.56 23 14.8801 23 16.5s-1.2839 2.939 -2.8896 2.9971C19.1292 21.0033 17.4316 22 15.5 22H10c-0.55229 0 -1 -0.4477 -1 -1s0.44772 -1 1 -1h5.5c1.0381 0 1.9694 -0.453 2.6104 -1.1709C17.4332 18.2791 17 17.4404 17 16.5c0 -0.9406 0.4329 -1.78 1.1104 -2.3301C17.4694 13.4524 16.5378 13 15.5 13h-7c-1.93181 0 -3.63022 -0.9965 -4.61133 -2.5029C2.28341 10.4385 1 9.11957 1 7.5c0 -1.61958 1.28339 -2.93949 2.88867 -2.99805C4.86985 2.99588 6.56848 2 8.5 2h7.6738C16.5859 0.835321 17.6941 0 19 0\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/scroll", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Scroll-Vertical--Streamline-Ultimate\"> <g> <path d=\"M9 11.99a3 3 0 1 0 6 0 3 3 0 1 0 -6 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m7.38 7.21 4.44 -4.44a0.24 0.24 0 0 1 0.36 0l4.44 4.44a1.25 1.25 0 0 0 1.76 -1.77L13.59 0.65a2.3 2.3 0 0 0 -3.18 0L5.62 5.44a1.25 1.25 0 0 0 1.76 1.77Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m16.62 16.77 -4.44 4.44a0.27 0.27 0 0 1 -0.36 0l-4.44 -4.44a1.25 1.25 0 0 0 -1.76 1.77l4.79 4.79a2.25 2.25 0 0 0 3.18 0l4.79 -4.79a1.25 1.25 0 0 0 -1.76 -1.77Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
