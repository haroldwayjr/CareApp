
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

const BATCH = [{"setName":"icon/navigation/panel.left","name":"panel-left","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sidebar-Expand--Streamline-Ultimate\">\n  <desc>\n    Sidebar Expand Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M24 3a3 3 0 0 0 -3 -3H2.75A2.75 2.75 0 0 0 0 2.75v18.5A2.75 2.75 0 0 0 2.75 24H21a3 3 0 0 0 3 -3V3ZM7.5 2v20H21a1 1 0 0 0 1 -1V3a1 1 0 0 0 -1 -1H7.5Zm9.232 15.137a0.75 0.75 0 0 0 0.463 -0.693V7.555a0.75 0.75 0 0 0 -1.28 -0.53l-4.444 4.445a0.75 0.75 0 0 0 0 1.06l4.444 4.445a0.75 0.75 0 0 0 0.817 0.162Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/panel.right","name":"panel-right","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sidebar-Collapes--Streamline-Ultimate\">\n  <desc>\n    Sidebar Collapes Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0 3a3 3 0 0 1 3 -3h18.25A2.75 2.75 0 0 1 24 2.75v18.5A2.75 2.75 0 0 1 21.25 24H3a3 3 0 0 1 -3 -3V3Zm16.5 -1v20H3a1 1 0 0 1 -1 -1V3a1 1 0 0 1 1 -1h13.5ZM7.268 17.137a0.75 0.75 0 0 1 -0.463 -0.693V7.555a0.75 0.75 0 0 1 1.28 -0.53l4.444 4.445a0.75 0.75 0 0 1 0 1.06l-4.444 4.445a0.75 0.75 0 0 1 -0.817 0.162Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/merge","name":"merge","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Merge--Streamline-Ultimate\">\n  <desc>\n    Merge Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 22.46a1 1 0 0 1 -0.86 -0.5L0.14 3A1 1 0 0 1 1 1.54h22A1 1 0 0 1 23.86 3l-11 19a1 1 0 0 1 -0.86 0.46ZM2.74 3.54 12 19.47l9.26 -15.93Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/add","name":"add","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 12a1.5 1.5 0 0 0 1.5 1.5h8.75a.25.25 0 0 1 .25.25v8.75a1.5 1.5 0 0 0 3 0v-8.75a.25.25 0 0 1 .25-.25h8.75a1.5 1.5 0 0 0 0-3h-8.75a.25.25 0 0 1-.25-.25V1.5a1.5 1.5 0 0 0-3 0v8.75a.25.25 0 0 1-.25.25H1.5A1.5 1.5 0 0 0 0 12Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/actions/edit","name":"edit","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M16.19 3.51a.51.51 0 0 0-.71 0L4.07 14.92a.5.5 0 0 0 0 .71l4.28 4.28a.48.48 0 0 0 .7 0L20.47 8.5a.51.51 0 0 0 0-.71Z\" fill=\"#000000\"/><path d=\"M3 16.71a.51.51 0 0 0-.47-.13.48.48 0 0 0-.36.33L0 23.33a.49.49 0 0 0 .12.51.5.5 0 0 0 .54.16l6.42-2.14a.52.52 0 0 0 .33-.36.49.49 0 0 0-.14-.5Z\" fill=\"#000000\"/><path d=\"M23 1a3.6 3.6 0 0 0-5 0l-.71.71a.5.5 0 0 0 0 .71l4.28 4.28a.51.51 0 0 0 .7 0L23 6a3.53 3.53 0 0 0 0-5Z\" fill=\"#000000\"/></g></svg>"},{"setName":"icon/actions/delete","name":"delete","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0ZM5.29 5.29a9.63 9.63 0 0 1 12.23-1 .26.26 0 0 1 0 .4L4.67 17.56a.27.27 0 0 1-.4 0 9.49 9.49 0 0 1 1-12.24Zm13.46 13.47a9.53 9.53 0 0 1-12.23 1 .26.26 0 0 1 0-.4L19.37 6.49a.26.26 0 0 1 .4 0 9.49 9.49 0 0 1-1 12.24Z\" fill=\"#000000\"/></svg>"}];
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
