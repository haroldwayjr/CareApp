
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

const BATCH = [{"setName":"icon/navigation/home","name":"home","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"House--Streamline-Ultimate\">\n  <desc>\n    House Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m23.61 8.71 -11 -8.5a1 1 0 0 0 -1.22 0l-11 8.5A1 1 0 0 0 0 9.5V23a1 1 0 0 0 1 1h22a1 1 0 0 0 1 -1V9.5a1 1 0 0 0 -0.39 -0.79Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/menu","name":"menu","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M1.5 2.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/><path d=\"M1.5 10.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/><path d=\"M1.5 18.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/></g></svg>"},{"setName":"icon/navigation/search","name":"search","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"m23.42 20.6-5.06-5.12a10 10 0 1 0-2.81 2.84l5 5.09a2 2 0 0 0 2.83 0 2 2 0 0 0 .04-2.81ZM10 1.76A8.25 8.25 0 1 1 1.75 10 8.26 8.26 0 0 1 10 1.76Z\" fill=\"#000000\"/><path d=\"M3.25 10.01a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 1 0-13.5 0\" fill=\"#000000\"/></g></svg>"},{"setName":"icon/navigation/settings","name":"settings","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.5 9.5h-1.86a9.51 9.51 0 0 0-.76-1.84l1.31-1.32a1.46 1.46 0 0 0 .44-1.06 1.47 1.47 0 0 0-.44-1.06l-1.41-1.41a1.49 1.49 0 0 0-2.12 0l-1.32 1.32a9 9 0 0 0-1.84-.77V1.5A1.5 1.5 0 0 0 13 0h-2a1.5 1.5 0 0 0-1.5 1.5v1.86a9 9 0 0 0-1.84.77L6.34 2.81a1.49 1.49 0 0 0-2.12 0L2.81 4.22a1.47 1.47 0 0 0-.44 1.06 1.44 1.44 0 0 0 .44 1.06l1.31 1.32a9.51 9.51 0 0 0-.76 1.84H1.5A1.5 1.5 0 0 0 0 11v2a1.5 1.5 0 0 0 1.5 1.5h1.86a9.26 9.26 0 0 0 .76 1.84l-1.31 1.32a1.5 1.5 0 0 0 0 2.12l1.41 1.41a1.53 1.53 0 0 0 2.12 0l1.32-1.31a9.26 9.26 0 0 0 1.84.76v1.86A1.5 1.5 0 0 0 11 24h2a1.5 1.5 0 0 0 1.5-1.5v-1.86a9.26 9.26 0 0 0 1.84-.76l1.32 1.31a1.49 1.49 0 0 0 2.12 0l1.41-1.41a1.5 1.5 0 0 0 0-2.12l-1.31-1.32a9.26 9.26 0 0 0 .76-1.84h1.86A1.5 1.5 0 0 0 24 13v-2a1.5 1.5 0 0 0-1.5-1.5ZM12 17a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/chevron.left","name":"chevron-left","category":"navigation","svg":"<svg version=\"1.1\" id=\"Arrow-Left-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\">\n  <desc>\n    Arrow Left 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M4.5 12c0 -0.7 0.3 -1.3 0.8 -1.7L16.5 0.5c0.8 -0.7 1.9 -0.6 2.6 0.2 0.6 0.8 0.6 1.9 -0.2 2.5l-9.8 8.6c-0.1 0.1 -0.1 0.2 0 0.3l9.8 8.6c0.8 0.7 0.9 1.8 0.2 2.6s-1.8 0.9 -2.6 0.2l-0.1 -0.1 -11.1 -9.7c-0.5 -0.4 -0.8 -1.1 -0.8 -1.7z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/chevron.right","name":"chevron-right","category":"navigation","svg":"<svg version=\"1.1\" id=\"Arrow-Right-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\">\n  <desc>\n    Arrow Right 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M19.5 12c0 0.7 -0.3 1.3 -0.8 1.7L7.5 23.6c-0.8 0.7 -2 0.6 -2.6 -0.2 -0.6 -0.8 -0.6 -1.9 0.2 -2.6l9.8 -8.6c0.1 -0.1 0.1 -0.2 0 -0.4L5.1 3.2c-0.8 -0.7 -0.8 -1.9 -0.1 -2.6 0.7 -0.7 1.8 -0.8 2.6 -0.2l11.2 9.8c0.4 0.5 0.7 1.1 0.7 1.8z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
