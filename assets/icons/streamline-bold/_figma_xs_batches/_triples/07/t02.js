
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

const BATCH = [{"setName":"icon/actions/move","name":"move","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Move-Down--Streamline-Ultimate\">\n  <desc>\n    Move Down Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12.5 11.5a1.25 1.25 0 0 0 -1.25 1.25v5.75a0.25 0.25 0 0 1 -0.25 0.25H8.5a0.49 0.49 0 0 0 -0.46 0.31 0.48 0.48 0 0 0 0.11 0.54l4 4a0.47 0.47 0 0 0 0.35 0.15 0.49 0.49 0 0 0 0.35 -0.15l4 -4a0.48 0.48 0 0 0 0.11 -0.54 0.5 0.5 0 0 0 -0.46 -0.31H14a0.25 0.25 0 0 1 -0.25 -0.25v-5.75a1.25 1.25 0 0 0 -1.25 -1.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 0.25h20s2 0 2 2v4.5s0 2 -2 2H2s-2 0 -2 -2v-4.5s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/actions/close.alt","name":"close-alt","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Close--Streamline-Ultimate\">\n  <desc>\n    Close Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M14.3 12.18a0.24 0.24 0 0 1 0 -0.35l9.26 -9.27a1.49 1.49 0 0 0 0 -2.12 1.51 1.51 0 0 0 -2.12 0L12.18 9.7a0.25 0.25 0 0 1 -0.36 0L2.56 0.44a1.51 1.51 0 0 0 -2.12 0 1.49 1.49 0 0 0 0 2.12l9.26 9.27a0.24 0.24 0 0 1 0 0.35L0.44 21.44a1.49 1.49 0 0 0 0 2.12 1.51 1.51 0 0 0 2.12 0l9.26 -9.26a0.25 0.25 0 0 1 0.36 0l9.26 9.26a1.51 1.51 0 0 0 2.12 0 1.49 1.49 0 0 0 0 -2.12Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/locate","name":"locate","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Earth-Locate--Streamline-Ultimate\">\n  <desc>\n    Earth Locate Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15.61 21.68a0.5 0.5 0 0 0 -0.55 -0.16A9.95 9.95 0 0 1 7.64 21a0.24 0.24 0 0 1 -0.14 -0.23v-1.16a2.46 2.46 0 0 1 0.89 -1.91A4.5 4.5 0 0 0 5.5 9.75H2.58a0.24 0.24 0 0 1 -0.19 -0.1 0.23 0.23 0 0 1 -0.05 -0.21 10 10 0 0 1 14.55 -6.16 0.25 0.25 0 0 1 0.12 0.28 0.26 0.26 0 0 1 -0.24 0.19h-2.52a2.75 2.75 0 0 0 0 5.5 2.53 2.53 0 0 1 1 0.2 0.51 0.51 0 0 0 0.45 0 6.46 6.46 0 0 1 7.22 0.39 0.5 0.5 0 0 0 0.79 -0.51A12 12 0 0 0 0 12c0 4.92 4 12 12 12a11.93 11.93 0 0 0 4.07 -0.71 0.52 0.52 0 0 0 0.31 -0.35 0.53 0.53 0 0 0 -0.1 -0.45c-0.22 -0.25 -0.44 -0.49 -0.67 -0.81\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 10a5 5 0 0 0 -5 5c0 3.17 4.46 7.66 4.65 7.85a0.48 0.48 0 0 0 0.7 0C19.54 22.66 24 18.17 24 15a5 5 0 0 0 -5 -5m0 6.75A1.75 1.75 0 1 1 20.75 15 1.76 1.76 0 0 1 19 16.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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