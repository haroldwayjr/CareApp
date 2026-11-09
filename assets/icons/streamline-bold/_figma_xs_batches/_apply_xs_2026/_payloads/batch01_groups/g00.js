
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

const BATCH = [{"setName": "icon/health/fitness", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Fitness-Weights--Streamline-Ultimate\"> <g> <path d=\"M2 7.5H1a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h1a0.5 0.5 0 0 0 0.5 -0.5V8a0.5 0.5 0 0 0 -0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7 5.5H4.5a1 1 0 0 0 -1 1v11a1 1 0 0 0 1 1H7a0.5 0.5 0 0 0 0.5 -0.5V6a0.5 0.5 0 0 0 -0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 7.5h-1a0.5 0.5 0 0 0 -0.5 0.5v8a0.5 0.5 0 0 0 0.5 0.5h1a1 1 0 0 0 1 -1v-7a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.5 5.5H17a0.5 0.5 0 0 0 -0.5 0.5v12a0.5 0.5 0 0 0 0.5 0.5h2.5a1 1 0 0 0 1 -1v-11a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9 10.5h6s0.5 0 0.5 0.5v2s0 0.5 -0.5 0.5H9s-0.5 0 -0.5 -0.5v-2s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/health/glasses", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Glasses--Streamline-Ultimate\"> <path d=\"M20.61 1.43a1 1 0 0 0 0 2A1.4 1.4 0 0 1 22 4.83v7.9a0.25 0.25 0 0 1 -0.09 0.2 0.27 0.27 0 0 1 -0.21 0.05 3.08 3.08 0 0 0 -0.61 -0.07H16.3a2.92 2.92 0 0 0 -2.16 1 0.25 0.25 0 0 1 -0.32 0 3.39 3.39 0 0 0 -3.64 0 0.25 0.25 0 0 1 -0.32 0 2.92 2.92 0 0 0 -2.16 -1H2.91a3.08 3.08 0 0 0 -0.61 0.09 0.27 0.27 0 0 1 -0.21 -0.05 0.25 0.25 0 0 1 -0.09 -0.2V4.83a1.4 1.4 0 0 1 1.39 -1.4 1 1 0 0 0 0 -2A3.4 3.4 0 0 0 0 4.83v14.82a2.92 2.92 0 0 0 2.91 2.92H7.7a2.92 2.92 0 0 0 2.91 -2.92v-2.87a1.39 1.39 0 0 1 2.78 0v2.87a2.92 2.92 0 0 0 2.91 2.92h4.79A2.92 2.92 0 0 0 24 19.65V4.83a3.4 3.4 0 0 0 -3.39 -3.4m-12 18.22a0.92 0.92 0 0 1 -0.91 0.92H2.91a0.92 0.92 0 0 1 -0.91 -0.92v-3.82a0.92 0.92 0 0 1 0.91 -0.92H7.7a0.92 0.92 0 0 1 0.91 0.92Zm13.39 0a0.92 0.92 0 0 1 -0.91 0.92H16.3a0.92 0.92 0 0 1 -0.91 -0.92v-3.82a0.92 0.92 0 0 1 0.91 -0.92h4.79a0.92 0.92 0 0 1 0.91 0.92Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/hand.wash", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Laundry-Hand-Wash--Streamline-Ultimate\"> <g> <path d=\"M23.91 4.75a0.27 0.27 0 0 0 0.09 -0.17V0.25a0.25 0.25 0 0 0 -0.1 -0.18 0.26 0.26 0 0 0 -0.17 -0.07h-5.49a0.23 0.23 0 0 0 -0.14 0l-0.29 0.2a4.59 4.59 0 0 1 -2.5 0.76A21.67 21.67 0 0 0 5.93 2.6l-4.4 1.76A1.79 1.79 0 0 0 0.28 6.3 1.74 1.74 0 0 0 2 7.79a1.77 1.77 0 0 0 0.56 -0.09l2.36 -0.79a0.25 0.25 0 0 1 0.27 0.39 9.16 9.16 0 0 0 -1.91 4.91A1.65 1.65 0 0 0 4 13.77a1.9 1.9 0 0 0 1.85 0.11 1.69 1.69 0 0 0 0.94 -1.42 3.74 3.74 0 0 1 1.83 -3.18 5.5 5.5 0 0 1 1.47 -0.56 0.26 0.26 0 0 1 0.27 0.12 0.24 0.24 0 0 1 0 0.29 9.86 9.86 0 0 0 -1.95 3.37l-0.73 2.19a1.74 1.74 0 0 0 1.1 2.21 1.71 1.71 0 0 0 0.55 0.09A1.75 1.75 0 0 0 11 15.8l0.73 -2.2a6.53 6.53 0 0 1 2.09 -3l2 -1.59A1.49 1.49 0 0 1 17 8.69a1.52 1.52 0 0 1 1.24 1.09l0.11 0.38a1.44 1.44 0 0 1 -0.05 1l-0.58 1.46a1.76 1.76 0 0 0 0.08 1.47 1.74 1.74 0 0 0 3.2 -0.27l0.66 -1.64a4.5 4.5 0 0 0 0.13 -2.72 4 4 0 0 1 0.73 -3.05Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.91 22c-1.57 0.13 -2.66 -1.55 -2.67 -1.57a1 1 0 0 0 -1.71 0A3.36 3.36 0 0 1 15.78 22a2.8 2.8 0 0 1 -2.4 -1.48 1.05 1.05 0 0 0 -1.72 -0.16A4.26 4.26 0 0 1 8.57 22a3.55 3.55 0 0 1 -2.76 -1.58 1 1 0 0 0 -1.63 -0.09S2.71 22.13 1.07 22a1 1 0 0 0 -1 0.94A1 1 0 0 0 1 24h0.22a5.7 5.7 0 0 0 3.55 -1.46 0.25 0.25 0 0 1 0.33 0A5.17 5.17 0 0 0 8.57 24a5.81 5.81 0 0 0 3.63 -1.35 0.25 0.25 0 0 1 0.33 0A4.53 4.53 0 0 0 15.78 24a5.15 5.15 0 0 0 3.45 -1.33 0.24 0.24 0 0 1 0.33 0A4.71 4.71 0 0 0 23.05 24a1 1 0 0 0 0.95 -1.11 1 1 0 0 0 -1.09 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/health/hearing.aid", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Hearing-Aid--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12.7214 1.56128c-0.4435 -0.05431 -0.8952 -0.08228 -1.3534 -0.08228H9.51927c-2.84326 0 -5.14818 2.30492 -5.14818 5.14818v0.20363h-0.00744v1.98943c0 0.41421 -0.33579 0.75 -0.75 0.75 -0.41422 0 -0.75 -0.33579 -0.75 -0.75V7.68619c-0.77469 0.7829 -1.25305 1.85958 -1.25305 3.04801 0 2.3933 1.9402 4.3336 4.33357 4.3336 2.39336 0 4.33353 -1.9403 4.33353 -4.3336 0 -1.24804 -0.52753 -2.37285 -1.37182 -3.16359V8.8203c0 0.41421 -0.33578 0.75 -0.75 0.75 -0.41421 0 -0.75 -0.33579 -0.75 -0.75V6.94019c0 -0.03716 0.00271 -0.07368 0.00792 -0.10938h-0.00477c0.13381 -1.29258 1.22636 -2.30054 2.55433 -2.30054 0.40374 0 0.98024 0.00874 1.57944 0.04726zm-0.192 4.61224 -0.1147 0.29355c-0.201 0.51441 0.053 1.09436 0.5675 1.29536 0.5144 0.201 1.0943 -0.05307 1.2953 -0.56748l0.2501 -0.64014c4.6768 3.27161 1.8243 10.00229 -3.2442 10.00229 -1.92313 0 -3.48213 1.5589 -3.48213 3.4821 0 1.9231 1.559 3.4821 3.48213 3.4821 6.0869 0 11.1058 -4.9342 11.1058 -11.0211 0 -4.39477 -2.5723 -8.18879 -6.2935 -9.95853l0.273 -0.6987c0.201 -0.51441 -0.053 -1.094363 -0.5674 -1.295363 -0.5071 -0.198143 -1.0779 0.045937 -1.2866 0.545703L12.537 6.15468c-0.0025 0.00634 -0.005 0.01262 -0.0076 0.01884\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
