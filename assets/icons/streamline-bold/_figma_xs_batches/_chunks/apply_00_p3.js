
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

const BATCH = [{"setName":"icon/navigation/external.link","name":"external-link","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Expand--Streamline-Ultimate\">\n  <desc>\n    Expand Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.75 5.79a2.21 2.21 0 0 0 -2.2 -2.2H16.3a1.25 1.25 0 0 0 0 2.5H21a0.25 0.25 0 0 1 0.25 0.25v3.27a1.25 1.25 0 0 0 2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.25 9.61a1.25 1.25 0 0 0 2.5 0V6.34A0.25 0.25 0 0 1 3 6.09h4.7a1.25 1.25 0 0 0 0 -2.5H2.45a2.21 2.21 0 0 0 -2.2 2.2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.75 18.2v-3.81a1.25 1.25 0 0 0 -2.5 0v3.27a0.25 0.25 0 0 1 -0.25 0.25h-4.7a1.25 1.25 0 0 0 0 2.5h5.25a2.21 2.21 0 0 0 2.2 -2.21Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.25 18.2a2.21 2.21 0 0 0 2.2 2.21H7.7a1.25 1.25 0 0 0 0 -2.5H3a0.25 0.25 0 0 1 -0.25 -0.25v-3.27a1.25 1.25 0 0 0 -2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.75 8.61h10.5a2 2 0 0 1 2 2v2.86a2 2 0 0 1 -2 2H6.75a2 2 0 0 1 -2 -2v-2.9a2 2 0 0 1 2 -1.96Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/sidebar","name":"sidebar","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Layout-2--Streamline-Ultimate\">\n  <desc>\n    Layout 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2ZM2.5 8h8a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5Zm11 0h8a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5ZM22 2.5v3a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-3a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5ZM2.5 16h8a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5ZM13 21.5v-5a0.5 0.5 0 0 1 0.5 -0.5h8a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/breadcrumb","name":"breadcrumb","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hierarchy--Streamline-Ultimate\">\n  <desc>\n    Hierarchy Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M22.13 18.23A0.25 0.25 0 0 1 22 18a7 7 0 0 0 -7 -6.52h-1.75a0.25 0.25 0 0 1 -0.25 -0.25V6a0.24 0.24 0 0 1 0.15 -0.23 3 3 0 1 0 -2.3 0A0.24 0.24 0 0 1 11 6v5.26a0.25 0.25 0 0 1 -0.25 0.25H8.5A6.56 6.56 0 0 0 2 18a0.23 0.23 0 0 1 -0.15 0.21 3 3 0 1 0 2.32 0A0.26 0.26 0 0 1 4 18a4.52 4.52 0 0 1 4.5 -4.5h2.25a0.25 0.25 0 0 1 0.25 0.25V18a0.25 0.25 0 0 1 -0.15 0.23 3 3 0 1 0 2.3 0A0.25 0.25 0 0 1 13 18v-4.25a0.25 0.25 0 0 1 0.25 -0.25H15a5 5 0 0 1 5 4.5 0.26 0.26 0 0 1 -0.14 0.26 3 3 0 1 0 2.32 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/scroll","name":"scroll","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Scroll-Vertical--Streamline-Ultimate\">\n  <desc>\n    Scroll Vertical Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M9 11.99a3 3 0 1 0 6 0 3 3 0 1 0 -6 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m7.38 7.21 4.44 -4.44a0.24 0.24 0 0 1 0.36 0l4.44 4.44a1.25 1.25 0 0 0 1.76 -1.77L13.59 0.65a2.3 2.3 0 0 0 -3.18 0L5.62 5.44a1.25 1.25 0 0 0 1.76 1.77Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m16.62 16.77 -4.44 4.44a0.27 0.27 0 0 1 -0.36 0l-4.44 -4.44a1.25 1.25 0 0 0 -1.76 1.77l4.79 4.79a2.25 2.25 0 0 0 3.18 0l4.79 -4.79a1.25 1.25 0 0 0 -1.76 -1.77Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/drag","name":"drag","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Move-Up--Streamline-Ultimate\">\n  <desc>\n    Move Up Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.5 12.5a1.25 1.25 0 0 0 1.25 -1.25V5.5a0.25 0.25 0 0 1 0.25 -0.25h2.5a0.5 0.5 0 0 0 0.5 -0.31 0.47 0.47 0 0 0 -0.11 -0.54l-4 -4a0.48 0.48 0 0 0 -0.7 0l-4 4a0.47 0.47 0 0 0 -0.19 0.54 0.5 0.5 0 0 0 0.46 0.31H10a0.25 0.25 0 0 1 0.25 0.25v5.75a1.25 1.25 0 0 0 1.25 1.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 15.25h20s2 0 2 2v4.5s0 2 -2 2H2s-2 0 -2 -2v-4.5s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/fullscreen","name":"fullscreen","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Expand-Full--Streamline-Ultimate\">\n  <desc>\n    Expand Full Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.75 2.45a2.21 2.21 0 0 0 -2.2 -2.2h-5.73a1.25 1.25 0 0 0 0 2.5H21a0.25 0.25 0 0 1 0.25 0.25v3.27a1.25 1.25 0 0 0 2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.25 6.27a1.25 1.25 0 0 0 2.5 0V3A0.25 0.25 0 0 1 3 2.75h5.18a1.25 1.25 0 0 0 0 -2.5H2.45a2.21 2.21 0 0 0 -2.2 2.2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.75 21.54v-3.81a1.25 1.25 0 0 0 -2.5 0V21a0.25 0.25 0 0 1 -0.25 0.25h-5.18a1.25 1.25 0 0 0 0 2.5h5.73a2.21 2.21 0 0 0 2.2 -2.21Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.25 21.54a2.21 2.21 0 0 0 2.2 2.21h5.73a1.25 1.25 0 0 0 0 -2.5H3a0.25 0.25 0 0 1 -0.25 -0.25v-3.27a1.25 1.25 0 0 0 -2.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.22 8.14h9.55s1.95 0 1.95 1.95v3.83s0 1.95 -1.95 1.95H7.22s-1.95 0 -1.95 -1.95v-3.83s0 -1.95 1.95 -1.95\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
