
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

const BATCH = [{"setName":"icon/health/orthopedics","name":"orthopedics","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Medical-Specialty-Broken-Bone--Streamline-Ultimate\">\n  <desc>\n    Medical Specialty Broken Bone Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.45 15.59a0.52 0.52 0 0 0 0.14 -0.49 0.51 0.51 0 0 0 -0.34 -0.37l-1.13 -0.37A0.5 0.5 0 0 1 9.8 14l-0.29 -1a0.52 0.52 0 0 0 -0.37 -0.36 0.53 0.53 0 0 0 -0.49 0.14L6.44 15a0.3 0.3 0 0 1 -0.2 0.08 0.27 0.27 0 0 1 -0.18 -0.1l-0.25 -0.29a3.14 3.14 0 0 0 -4.4 -0.06 3 3 0 0 0 2.18 5.21 0.48 0.48 0 0 1 0.5 0.5 3.09 3.09 0 0 0 5.26 2.23 3 3 0 0 0 0 -4.32 0.63 0.63 0 0 0 -0.12 -0.1 0.25 0.25 0 0 1 0 -0.38Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.09 7.71a3.1 3.1 0 0 0 -3.51 -4.52 0.46 0.46 0 0 1 -0.38 0 0.5 0.5 0 0 1 -0.2 -0.36A3.07 3.07 0 0 0 13.32 2a3.2 3.2 0 0 0 1.25 4.3 2.9 2.9 0 0 0 0.35 0.17 0.24 0.24 0 0 1 0.13 0.15 0.23 0.23 0 0 1 0 0.2l-1.71 2.91a0.52 0.52 0 0 0 0 0.51 0.52 0.52 0 0 0 0.43 0.27l1 0.05a0.52 0.52 0 0 1 0.39 0.22l0.67 1a0.49 0.49 0 0 0 0.44 0.23 0.51 0.51 0 0 0 0.43 -0.26l1.7 -2.91a0.25 0.25 0 0 1 0.16 -0.12 0.28 0.28 0 0 1 0.2 0 0.71 0.71 0 0 0 0.14 0.1 3.05 3.05 0 0 0 4.19 -1.11\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4 10h2a1 1 0 0 0 0 -2H4a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.3 6.69a1 1 0 0 0 1.4 -1.44l-1 -1a1 1 0 0 0 -1.43 1.43Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 6a1 1 0 0 0 1 -1V3a1 1 0 0 0 -2 0v2a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20 14h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.72 17.27a1 1 0 1 0 -1.44 1.4l1 1.06A1 1 0 0 0 18 20a1 1 0 0 0 0.71 -1.7Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14 18a1 1 0 0 0 -1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/surgery","name":"surgery","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Surgery-Liposuction--Streamline-Ultimate\">\n  <desc>\n    Surgery Liposuction Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M18 9.49a7.41 7.41 0 0 1 -5.36 -2.26c-0.2 -0.21 -0.38 -0.43 -0.56 -0.65H12c-0.18 0.22 -0.36 0.44 -0.56 0.65a7.44 7.44 0 0 1 -9.17 1.2c-0.6 8 -3.51 11.08 -0.19 14.67h0.68c0.2 -0.21 0.4 -0.41 0.58 -0.63a0.51 0.51 0 0 1 0.71 0 0.49 0.49 0 0 1 0.06 0.67h15.82a0.5 0.5 0 0 1 0.07 -0.67 0.5 0.5 0 0 1 0.7 0c0.19 0.22 0.38 0.42 0.59 0.63h0.94c3.34 -3.61 0.38 -6.72 -0.2 -14.82A7.45 7.45 0 0 1 18 9.49M6.93 18a11.75 11.75 0 0 1 -0.88 2.23 0.49 0.49 0 0 1 -0.44 0.27 0.64 0.64 0 0 1 -0.23 0 0.52 0.52 0 0 1 -0.22 -0.68 11.11 11.11 0 0 0 0.81 -2 0.49 0.49 0 0 1 0.61 -0.34 0.5 0.5 0 0 1 0.35 0.52m-0.06 -3a0.51 0.51 0 0 1 -0.5 -0.49 12.93 12.93 0 0 0 -0.26 -2.19 0.51 0.51 0 0 1 0.39 -0.59 0.5 0.5 0 0 1 0.59 0.39 13 13 0 0 1 0.28 2.36 0.5 0.5 0 0 1 -0.5 0.46Zm9.76 -0.52a15 15 0 0 1 0.28 -2.36 0.51 0.51 0 0 1 0.59 -0.39 0.5 0.5 0 0 1 0.39 0.59 12.93 12.93 0 0 0 -0.26 2.19 0.5 0.5 0 0 1 -0.5 0.49 0.51 0.51 0 0 1 -0.5 -0.58Zm2 6a0.59 0.59 0 0 1 -0.22 0 0.5 0.5 0 0 1 -0.45 -0.27 11.7 11.7 0 0 1 -0.89 -2.21 0.49 0.49 0 0 1 0.34 -0.61 0.5 0.5 0 0 1 0.62 0.34 10.4 10.4 0 0 0 0.8 2 0.5 0.5 0 0 1 -0.22 0.69Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6 8a6 6 0 0 0 6 -6.13A6 6 0 1 0 23.93 2a6.18 6.18 0 0 0 -0.2 -1.56H0.27A6.18 6.18 0 0 0 0.07 2 6 6 0 0 0 6 8m12 -4.81a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1m-12 0a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/airplane","name":"airplane","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Airplane-Mode--Streamline-Ultimate\">\n  <desc>\n    Airplane Mode Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M14.58 19.51a0.25 0.25 0 0 1 -0.08 -0.18V13l-4.93 5a0.29 0.29 0 0 0 -0.07 0.18v1.19a0.25 0.25 0 0 1 -0.08 0.18L8 20.92a1.5 1.5 0 0 0 1 2.58 7.24 7.24 0 0 0 2.85 -1.39 0.24 0.24 0 0 1 0.3 0A7.24 7.24 0 0 0 15 23.5a1.5 1.5 0 0 0 1 -2.58Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.07 9.8a0.26 0.26 0 0 0 -0.35 0l-3.2 3.2c1.42 1 4.86 3.48 5.48 3.9a2.49 2.49 0 0 0 1.5 0.59A2 2 0 0 0 22.82 14Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.71 0.29a1 1 0 0 0 -1.42 0l-6.84 6.84 -0.95 -1V3a2.4 2.4 0 0 0 -0.2 -1 2.49 2.49 0 0 0 -4.6 0 2.4 2.4 0 0 0 -0.2 1v3.66l-3 2.65L1.18 14A2 2 0 0 0 3 17.45a0.19 0.19 0 0 0 0.12 -0.07L9 12.68a0.34 0.34 0 0 1 0.5 0.32 0.37 0.37 0 0 1 -0.1 0.24L0.29 22.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l22 -22a1 1 0 0 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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