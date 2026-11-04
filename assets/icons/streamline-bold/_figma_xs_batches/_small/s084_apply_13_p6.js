
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

const BATCH = [{"setName":"icon/misc/planet","name":"planet","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Astronomy-Planet--Streamline-Ultimate\">\n  <desc>\n    Astronomy Planet Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M18.5 13.25h-1.91a0.49 0.49 0 0 1 -0.49 -0.39 5.47 5.47 0 0 0 -0.15 -0.58 0.48 0.48 0 0 1 0.22 -0.58l1.66 -1a1 1 0 0 0 -1 -1.73l-1.66 1a0.52 0.52 0 0 1 -0.62 -0.1 4.16 4.16 0 0 0 -0.42 -0.42 0.5 0.5 0 0 1 -0.1 -0.62l1 -1.66a1 1 0 0 0 -1.73 -1l-1 1.66a0.48 0.48 0 0 1 -0.58 0.22c-0.19 -0.05 -0.38 -0.11 -0.58 -0.15a0.49 0.49 0 0 1 -0.39 -0.49V5.5a1 1 0 0 0 -2 0v1.91a0.49 0.49 0 0 1 -0.39 0.49c-0.2 0 -0.39 0.1 -0.58 0.15a0.49 0.49 0 0 1 -0.58 -0.22l-1 -1.66a1 1 0 0 0 -1.73 1l1 1.66a0.52 0.52 0 0 1 -0.1 0.62 4.16 4.16 0 0 0 -0.37 0.42 0.52 0.52 0 0 1 -0.62 0.1L2.67 9a1 1 0 0 0 -1 1.73l1.66 1a0.48 0.48 0 0 1 0.22 0.58 5.47 5.47 0 0 0 -0.15 0.58 0.49 0.49 0 0 1 -0.49 0.39H1a1 1 0 0 0 0 2h1.91a0.49 0.49 0 0 1 0.49 0.39 5.47 5.47 0 0 0 0.15 0.58 0.48 0.48 0 0 1 -0.22 0.58l-1.66 1a1 1 0 0 0 -0.36 1.36 1 1 0 0 0 0.86 0.5 1 1 0 0 0 0.5 -0.13l1.66 -1a0.52 0.52 0 0 1 0.62 0.1 4.16 4.16 0 0 0 0.42 0.42 0.5 0.5 0 0 1 0.1 0.62l-1 1.66a1 1 0 0 0 1.73 1l1 -1.66a0.48 0.48 0 0 1 0.58 -0.22c0.19 0.05 0.38 0.11 0.58 0.15a0.49 0.49 0 0 1 0.39 0.49V23a1 1 0 0 0 2 0v-1.91a0.49 0.49 0 0 1 0.39 -0.49c0.2 0 0.39 -0.1 0.58 -0.15a0.49 0.49 0 0 1 0.58 0.22l1 1.66a1 1 0 0 0 1.73 -1l-1 -1.66a0.52 0.52 0 0 1 0.1 -0.62 4.16 4.16 0 0 0 0.42 -0.42 0.52 0.52 0 0 1 0.62 -0.1l1.66 1a1 1 0 0 0 0.5 0.13 1 1 0 0 0 0.86 -0.5 1 1 0 0 0 -0.36 -1.36l-1.66 -1a0.48 0.48 0 0 1 -0.22 -0.58 5.47 5.47 0 0 0 0.15 -0.58 0.49 0.49 0 0 1 0.49 -0.39h1.91a1 1 0 0 0 0 -2m-10.25 4.5a2 2 0 1 1 2 -2 2 2 0 0 1 -2 2m3 -5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m1.5 3a0.5 0.5 0 1 1 0.5 -0.5 0.5 0.5 0 0 1 -0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m23.62 5.35 -0.43 -0.25a0.5 0.5 0 0 1 -0.19 -0.5l0 -0.35 0 -0.35a0.5 0.5 0 0 1 0.24 -0.5l0.43 -0.25a0.75 0.75 0 1 0 -0.75 -1.3l-0.43 0.25a0.5 0.5 0 0 1 -0.55 0 2.51 2.51 0 0 0 -0.61 -0.36 0.5 0.5 0 0 1 -0.33 -0.49v-0.5a0.75 0.75 0 0 0 -1.5 0v0.5a0.5 0.5 0 0 1 -0.31 0.46 2.51 2.51 0 0 0 -0.61 0.36 0.5 0.5 0 0 1 -0.55 0l-0.44 -0.25a0.75 0.75 0 0 0 -0.75 1.3l0.44 0.25a0.5 0.5 0 0 1 0.24 0.5l0 0.35 0 0.35a0.5 0.5 0 0 1 -0.24 0.5l-0.44 0.25a0.75 0.75 0 0 0 0.38 1.4 0.71 0.71 0 0 0 0.37 -0.1L18 6.4a0.5 0.5 0 0 1 0.55 0 2.51 2.51 0 0 0 0.61 0.36 0.5 0.5 0 0 1 0.31 0.46v0.5a0.75 0.75 0 0 0 1.5 0v-0.5a0.5 0.5 0 0 1 0.31 -0.46 2.51 2.51 0 0 0 0.61 -0.36 0.5 0.5 0 0 1 0.55 0l0.43 0.25a0.76 0.76 0 0 0 1 -0.27 0.75 0.75 0 0 0 -0.25 -1.03m-3.4 0.15a1.25 1.25 0 1 1 1.25 -1.25 1.25 1.25 0 0 1 -1.25 1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
