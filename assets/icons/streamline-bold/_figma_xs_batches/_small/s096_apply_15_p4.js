
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

const BATCH = [{"setName":"icon/misc/recycle","name":"recycle","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Plastic-Bag-Recycle--Streamline-Ultimate\">\n  <desc>\n    Plastic Bag Recycle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m9.72 19.17 0.28 -0.49a2.25 2.25 0 0 1 0.9 -3.83l2.46 -0.69a2.19 2.19 0 0 1 0.23 -1.67l1.06 -1.85a3.19 3.19 0 0 1 1.14 -1.14 2.94 2.94 0 0 1 2.54 -0.22c0.08 -4 0.37 -7.46 0.87 -7.46 0.71 0 1 4.06 1 9.08a2.53 2.53 0 0 1 0.67 -0.1H21C21 0.06 20 0.05 19.39 0.05h-3.11a1.47 1.47 0 0 0 -1.44 1.12 21.05 21.05 0 0 0 -0.36 2.08H5.89c0.07 -0.58 0.13 -1.11 0.19 -1.5A1.48 1.48 0 0 0 4.62 0.05h-2a1.48 1.48 0 0 0 -1.49 1.16C0.12 5.92 0 12 0.63 20.82a1.5 1.5 0 0 0 1 1.3 30.39 30.39 0 0 0 8.52 1h0.33a3.09 3.09 0 0 1 -0.76 -3.95M5.78 4.75h8.49c-0.07 0.6 -0.14 1.18 -0.19 1.65a0.73 0.73 0 0 1 -0.73 0.64h-7a0.72 0.72 0 0 1 -0.55 -0.24 0.7 0.7 0 0 1 -0.18 -0.55c0 -0.42 0.08 -1 0.14 -1.51Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.2 14.26a0.74 0.74 0 0 0 1 -0.28l1.1 -1.87a0.11 0.11 0 0 1 0.14 0l0.89 1.55 -0.93 0.56a0.73 0.73 0 0 0 -0.36 0.75 0.75 0.75 0 0 0 0.55 0.62l2.48 0.63 0.14 0h0.07a0.61 0.61 0 0 0 0.3 -0.08 0.79 0.79 0 0 0 0.17 -0.14 0.58 0.58 0 0 0 0.13 -0.26l0.64 -2.48a0.75 0.75 0 0 0 -1.11 -0.83l-0.89 0.53 -0.88 -1.53a1.6 1.6 0 0 0 -2.18 -0.6 1.7 1.7 0 0 0 -0.6 0.59l-1.06 1.84a0.76 0.76 0 0 0 0.4 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.64 18.13a0.75 0.75 0 1 0 -1.3 0.75l1 1.84a0.11 0.11 0 0 1 -0.1 0.1h-1.89v-1.17a0.77 0.77 0 0 0 -0.48 -0.69 0.74 0.74 0 0 0 -0.81 0.18L17.26 21a0.78 0.78 0 0 0 -0.21 0.54 0.72 0.72 0 0 0 0.23 0.53l1.83 1.78a0.74 0.74 0 0 0 0.52 0.22 0.59 0.59 0 0 0 0.29 -0.07 0.74 0.74 0 0 0 0.46 -0.69v-0.95h1.91a1.61 1.61 0 0 0 1.39 -2.4Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m11.18 17.67 0.88 0.5 -1 1.75a1.6 1.6 0 0 0 1.39 2.4h2.25a0.75 0.75 0 0 0 0 -1.5h-2.31a0.1 0.1 0 0 1 0 -0.14l1 -1.77 1 0.54a0.71 0.71 0 0 0 0.37 0.1 0.78 0.78 0 0 0 0.46 -0.16 0.76 0.76 0 0 0 0.26 -0.8l-0.69 -2.44a0.73 0.73 0 0 0 -1.06 -0.5l-2.33 0.66a0.74 0.74 0 0 0 -0.16 1.37Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/atom","name":"atom","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Science-Atom-Positive-Negative--Streamline-Ultimate\">\n  <desc>\n    Science Atom Positive Negative Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.52 8.62a1 1 0 1 0 -1.92 0.56A10.28 10.28 0 0 1 22 12 10 10 0 1 1 12 2a10.34 10.34 0 0 1 2.42 0.29 1 1 0 0 0 1.21 -0.72A1 1 0 0 0 14.9 0.35 12.24 12.24 0 0 0 12 0a12 12 0 1 0 11.52 8.62\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 5.75A6.25 6.25 0 1 0 18.25 12 6.25 6.25 0 0 0 12 5.75M15 13h-1.5a0.5 0.5 0 0 0 -0.5 0.5V15a1 1 0 0 1 -2 0v-1.5a0.5 0.5 0 0 0 -0.5 -0.5H9a1 1 0 0 1 0 -2h1.5a0.5 0.5 0 0 0 0.5 -0.5V9a1 1 0 0 1 2 0v1.5a0.5 0.5 0 0 0 0.5 0.5H15a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.25 4a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/robot","name":"robot","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Robot--Streamline-Ultimate\">\n  <desc>\n    Robot Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5.5 11h13a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2h-13a2 2 0 0 0 -2 2v7a2 2 0 0 0 2 2M16 4a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 16 4M8 4a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 8 4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.5 12.5a1 1 0 0 0 0 2h3a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.3 9.87a1 1 0 0 0 -1.6 1.2 1.46 1.46 0 0 1 0.3 0.9 1.5 1.5 0 0 1 -2.7 0.9 1 1 0 0 0 -1.6 1.2 3.46 3.46 0 0 0 2.56 1.39 0.27 0.27 0 0 1 0.19 0.1 0.25 0.25 0 0 1 0 0.21 3 3 0 0 1 -1.08 1.7l-0.39 0.3a0.31 0.31 0 0 1 -0.44 -0.05A4.61 4.61 0 0 0 15 16H9a4.61 4.61 0 0 0 -3.6 1.72 0.31 0.31 0 0 1 -0.44 0.05l-0.39 -0.3a3 3 0 0 1 -1.08 -1.7 0.25 0.25 0 0 1 0 -0.21 0.27 0.27 0 0 1 0.19 -0.1 3.46 3.46 0 0 0 2.62 -1.39 1 1 0 0 0 -1.6 -1.2A1.5 1.5 0 0 1 2 12a1.46 1.46 0 0 1 0.3 -0.9A1 1 0 0 0 0.7 9.87 3.45 3.45 0 0 0 0 12a3.48 3.48 0 0 0 1.12 2.56 1 1 0 0 1 0.31 0.7 5.06 5.06 0 0 0 1.93 3.82l0.65 0.5a1 1 0 0 1 0.38 0.84 5 5 0 0 0 0.1 1.22c0 0.08 0 -0.06 0.47 1.38a1.51 1.51 0 0 0 1.42 1h11.24A1.51 1.51 0 0 0 19 23c0.49 -1.44 0.45 -1.3 0.47 -1.38a5 5 0 0 0 0.1 -1.22 1 1 0 0 1 0.38 -0.84l0.65 -0.5a5.06 5.06 0 0 0 1.93 -3.82 1 1 0 0 1 0.31 -0.7A3.48 3.48 0 0 0 24 12a3.45 3.45 0 0 0 -0.7 -2.13\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/status/shield.off","name":"shield-off","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Remove-Shield--Streamline-Ultimate\">\n  <desc>\n    Remove Shield Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.42 0H3.58a1.5 1.5 0 0 0 -1.49 1.5v6.26a18.26 18.26 0 0 0 9.68 16.18 0.47 0.47 0 0 0 0.46 0 18.26 18.26 0 0 0 9.68 -16.18V1.5A1.5 1.5 0 0 0 20.42 0m-3.8 13.2a1 1 0 1 1 -1.41 1.42l-2.77 -2.77a0.51 0.51 0 0 0 -0.71 0L9 14.62a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42l2.77 -2.76a0.51 0.51 0 0 0 0 -0.71L7.55 7A1 1 0 1 1 9 5.55l2.76 2.77a0.51 0.51 0 0 0 0.71 0l2.77 -2.77a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-2.8 2.76a0.51 0.51 0 0 0 0 0.71Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/critical","name":"critical","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash-1--Streamline-Ultimate\">\n  <desc>\n    Flash 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.44 9.27A0.48 0.48 0 0 0 20 9h-7.38L14.49 0.61A0.51 0.51 0 0 0 14.2 0a0.5 0.5 0 0 0 -0.61 0.17l-10 14a0.49 0.49 0 0 0 0 0.52A0.49 0.49 0 0 0 4 15h7.38l-1.87 8.39a0.51 0.51 0 0 0 0.29 0.61 0.52 0.52 0 0 0 0.61 -0.17l10 -14a0.49 0.49 0 0 0 0.03 -0.56\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
