
const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);

const collections = await figma.variables.getLocalVariableCollectionsAsync();
let iconDefault = null;
for (const coll of collections) {
  for (const id of coll.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v && v.name === 'icon/default') iconDefault = v;
  }
}

function bindFills(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON') {
      const paint = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
      n.fills = [paint];
      n.strokes = [];
    }
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}

function applyBoldXs(set, svg) {
  const xs = set.children.find(c => c.name === 'Size=xs');
  const md = set.children.find(c => c.name === 'Size=md');
  if (!xs) return { ok: false, reason: 'no-xs' };
  const was = xs.visible;
  xs.visible = true;
  for (const c of [...xs.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = set.name.split('/').pop();
  node.resize(16, 16);
  node.x = 0; node.y = 0;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch (__) {} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false; // keep catalog md-only
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [{"setName":"icon/navigation/route","name":"route","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M6.29297 18.293c0.39052 -0.3906 1.02354 -0.3906 1.41406 0 0.39053 0.3905 0.39053 1.0235 0 1.414L6.41406 21l1.29297 1.293c0.39053 0.3905 0.39053 1.0235 0 1.414 -0.39052 0.3906 -1.02354 0.3906 -1.41406 0L5 22.4141 3.70703 23.707c-0.39052 0.3906 -1.02354 0.3906 -1.41406 0 -0.39053 -0.3905 -0.39053 -1.0235 0 -1.414L3.58594 21l-1.29297 -1.293c-0.39053 -0.3905 -0.39053 -1.0235 0 -1.414 0.39052 -0.3906 1.02354 -0.3906 1.41406 0L5 19.5859zM19 0c1.6569 0 3 1.34315 3 3s-1.3431 3 -3 3c-1.3059 0 -2.4141 -0.83532 -2.8262 -2H8.5c-1.03806 0 -1.97037 0.4521 -2.61133 1.16992C6.56642 5.71996 7 6.55912 7 7.5c0 0.94066 -0.43385 1.77906 -1.11133 2.3291C6.52964 10.5472 7.46167 11 8.5 11h7c1.9313 0 3.6291 0.9961 4.6104 2.502C21.7161 13.56 23 14.8801 23 16.5s-1.2839 2.939 -2.8896 2.9971C19.1292 21.0033 17.4316 22 15.5 22H10c-0.55229 0 -1 -0.4477 -1 -1s0.44772 -1 1 -1h5.5c1.0381 0 1.9694 -0.453 2.6104 -1.1709C17.4332 18.2791 17 17.4404 17 16.5c0 -0.9406 0.4329 -1.78 1.1104 -2.3301C17.4694 13.4524 16.5378 13 15.5 13h-7c-1.93181 0 -3.63022 -0.9965 -4.61133 -2.5029C2.28341 10.4385 1 9.11957 1 7.5c0 -1.61958 1.28339 -2.93949 2.88867 -2.99805C4.86985 2.99588 6.56848 2 8.5 2h7.6738C16.5859 0.835321 17.6941 0 19 0\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/navigation.pointer","name":"navigation-pointer","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Navigation-Up-2--Streamline-Ultimate\">\n  <desc>\n    Navigation Up 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5.93 4.68a1 1 0 0 0 -0.31 1.09 1 1 0 0 0 0.94 0.66h4a0.25 0.25 0 0 1 0.25 0.25v10.14a0.25 0.25 0 0 1 -0.25 0.25H7.05a1.24 1.24 0 1 0 0 2.47H17a1.24 1.24 0 1 0 0 -2.47h-3.51a0.25 0.25 0 0 1 -0.25 -0.25V6.68a0.25 0.25 0 0 1 0.25 -0.25h4a1 1 0 0 0 0.94 -0.66 1 1 0 0 0 -0.31 -1.09L12.63 0.22a1 1 0 0 0 -1.26 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17 21.52H7.05a1.24 1.24 0 0 0 0 2.48H17a1.24 1.24 0 1 0 0 -2.48Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/layers","name":"layers","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Layers--Streamline-Ultimate\">\n  <desc>\n    Layers Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m0.79 6.86 10.8 4.7a1 1 0 0 0 0.82 0l10.8 -4.7a1 1 0 0 0 0.61 -0.93 1 1 0 0 0 -0.61 -0.93L12.41 0.29a1.06 1.06 0 0 0 -0.82 0L0.79 5a1 1 0 0 0 -0.61 0.94 1 1 0 0 0 0.61 0.92Zm11.42 4.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m0.59 10.77 10.81 4.7a1.53 1.53 0 0 0 0.6 0.12 1.41 1.41 0 0 0 0.6 -0.13l10.81 -4.69A1 1 0 1 0 22.62 9L12 13.58 1.38 9a1 1 0 0 0 -0.79 1.81Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.62 13.16 12 17.78 1.38 13.16A1 1 0 0 0 0.59 15l10.81 4.66a1.45 1.45 0 0 0 1.2 0L23.41 15a1 1 0 1 0 -0.79 -1.81Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.62 17.16 12 21.78 1.38 17.16A1 1 0 0 0 0.59 19l10.81 4.7a1.53 1.53 0 0 0 0.6 0.12 1.41 1.41 0 0 0 0.6 -0.13L23.41 19a1 1 0 0 0 -0.79 -1.81Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/panel.left","name":"panel-left","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sidebar-Expand--Streamline-Ultimate\">\n  <desc>\n    Sidebar Expand Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M24 3a3 3 0 0 0 -3 -3H2.75A2.75 2.75 0 0 0 0 2.75v18.5A2.75 2.75 0 0 0 2.75 24H21a3 3 0 0 0 3 -3V3ZM7.5 2v20H21a1 1 0 0 0 1 -1V3a1 1 0 0 0 -1 -1H7.5Zm9.232 15.137a0.75 0.75 0 0 0 0.463 -0.693V7.555a0.75 0.75 0 0 0 -1.28 -0.53l-4.444 4.445a0.75 0.75 0 0 0 0 1.06l4.444 4.445a0.75 0.75 0 0 0 0.817 0.162Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/panel.right","name":"panel-right","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sidebar-Collapes--Streamline-Ultimate\">\n  <desc>\n    Sidebar Collapes Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0 3a3 3 0 0 1 3 -3h18.25A2.75 2.75 0 0 1 24 2.75v18.5A2.75 2.75 0 0 1 21.25 24H3a3 3 0 0 1 -3 -3V3Zm16.5 -1v20H3a1 1 0 0 1 -1 -1V3a1 1 0 0 1 1 -1h13.5ZM7.268 17.137a0.75 0.75 0 0 1 -0.463 -0.693V7.555a0.75 0.75 0 0 1 1.28 -0.53l4.444 4.445a0.75 0.75 0 0 1 0 1.06l-4.444 4.445a0.75 0.75 0 0 1 -0.817 0.162Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/merge","name":"merge","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Merge--Streamline-Ultimate\">\n  <desc>\n    Merge Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 22.46a1 1 0 0 1 -0.86 -0.5L0.14 3A1 1 0 0 1 1 1.54h22A1 1 0 0 1 23.86 3l-11 19a1 1 0 0 1 -0.86 0.46ZM2.74 3.54 12 19.47l9.26 -15.93Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/add","name":"add","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 12a1.5 1.5 0 0 0 1.5 1.5h8.75a.25.25 0 0 1 .25.25v8.75a1.5 1.5 0 0 0 3 0v-8.75a.25.25 0 0 1 .25-.25h8.75a1.5 1.5 0 0 0 0-3h-8.75a.25.25 0 0 1-.25-.25V1.5a1.5 1.5 0 0 0-3 0v8.75a.25.25 0 0 1-.25.25H1.5A1.5 1.5 0 0 0 0 12Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/actions/edit","name":"edit","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M16.19 3.51a.51.51 0 0 0-.71 0L4.07 14.92a.5.5 0 0 0 0 .71l4.28 4.28a.48.48 0 0 0 .7 0L20.47 8.5a.51.51 0 0 0 0-.71Z\" fill=\"#000000\"/><path d=\"M3 16.71a.51.51 0 0 0-.47-.13.48.48 0 0 0-.36.33L0 23.33a.49.49 0 0 0 .12.51.5.5 0 0 0 .54.16l6.42-2.14a.52.52 0 0 0 .33-.36.49.49 0 0 0-.14-.5Z\" fill=\"#000000\"/><path d=\"M23 1a3.6 3.6 0 0 0-5 0l-.71.71a.5.5 0 0 0 0 .71l4.28 4.28a.51.51 0 0 0 .7 0L23 6a3.53 3.53 0 0 0 0-5Z\" fill=\"#000000\"/></g></svg>"}];
let ok = 0, missing = 0, failed = 0;
const miss = [], fail = [];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length < 5) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({ name: item.setName, r }); }
  } catch (e) {
    failed++;
    if (fail.length < 5) fail.push({ name: item.setName, err: String(e) });
  }
}
return { ok, missing, failed, miss, fail };
