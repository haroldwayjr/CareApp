
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

const BATCH = [{"setName":"icon/actions/browse","name":"browse","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"E-Commerce-Apparel-Browse--Streamline-Ultimate\">\n  <desc>\n    E Commerce Apparel Browse Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M16 16v-3.25a0.25 0.25 0 0 1 0.25 -0.25h1.25a0.49 0.49 0 0 0 0.39 -0.19 0.51 0.51 0 0 0 0.1 -0.43l-0.82 -3.24a1.49 1.49 0 0 0 -1.45 -1.14H13.5a0.5 0.5 0 0 0 -0.5 0.5 1 1 0 0 1 -2 0 0.5 0.5 0 0 0 -0.5 -0.5H8.28a1.49 1.49 0 0 0 -1.45 1.14L6 11.88a0.51 0.51 0 0 0 0.1 0.43 0.49 0.49 0 0 0 0.39 0.19h1.26a0.25 0.25 0 0 1 0.25 0.25V16a0.5 0.5 0 0 0 0.5 0.5h7a0.5 0.5 0 0 0 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m20.8 18.6 -2 -1.5a0.5 0.5 0 0 0 -0.8 0.4v0.5a0.25 0.25 0 0 1 -0.25 0.25H16.5a0.75 0.75 0 0 0 0 1.5h1.25A0.25 0.25 0 0 1 18 20v0.5a0.51 0.51 0 0 0 0.28 0.45 0.54 0.54 0 0 0 0.22 0.05 0.47 0.47 0 0 0 0.3 -0.1l2 -1.5a0.5 0.5 0 0 0 0 -0.8\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.5 18.25H6.25A0.25 0.25 0 0 1 6 18v-0.5a0.5 0.5 0 0 0 -0.8 -0.4l-2 1.5a0.5 0.5 0 0 0 0 0.8l2 1.5a0.47 0.47 0 0 0 0.3 0.1 0.54 0.54 0 0 0 0.22 0 0.51 0.51 0 0 0 0.28 -0.5V20a0.25 0.25 0 0 1 0.25 -0.25H7.5a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 2a2 2 0 0 0 -2 -2H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2ZM6 2.5a1 1 0 1 1 1 1 1 1 0 0 1 -1 -1m3.5 0a1 1 0 1 1 1 1 1 1 0 0 1 -1 -1m-6 -1a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1M2.5 22a0.5 0.5 0 0 1 -0.5 -0.5V6a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5v15.5a0.5 0.5 0 0 1 -0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/status/warning","name":"warning","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Circle--Streamline-Ultimate\">\n  <desc>\n    Alert Circle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a12.24 12.24 0 0 0 -8.53 3.65A11.85 11.85 0 0 0 0 12.21 11.78 11.78 0 0 0 11.8 24h0.2a12.11 12.11 0 0 0 12 -12.21A11.77 11.77 0 0 0 12 0m-1.5 16.54A1.48 1.48 0 0 1 12 15a1.53 1.53 0 0 1 1.52 1.47A1.47 1.47 0 0 1 12.05 18a1.53 1.53 0 0 1 -1.55 -1.46m0.5 -4v-6a1 1 0 0 1 2 0v6a1 1 0 0 1 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/bell","name":"bell","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Alarm-Bell--Streamline-Ultimate\">\n  <desc>\n    Alarm Bell Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M14.4111 21.002c0.2591 0.0002 0.5 0.1344 0.6368 0.3544 0.1366 0.2202 0.1498 0.4953 0.0351 0.7276 -0.238 0.4818 -0.5869 0.904 -1.0215 1.2295 -0.5945 0.4451 -1.3178 0.6864 -2.0605 0.6865 -0.7428 0 -1.4659 -0.2414 -2.06057 -0.6865 -0.43473 -0.3255 -0.78441 -0.7476 -1.02246 -1.2295 -0.11467 -0.2324 -0.1006 -0.5074 0.03613 -0.7276 0.13686 -0.2201 0.37749 -0.3544 0.63672 -0.3544zM12 0c0.5523 0 1 0.447715 1 1v1.3125c1.8195 0.2221 3.5244 1.04398 4.834 2.35352C19.3812 6.21319 20.25 8.31196 20.25 10.5c0 2.8965 0.367 4.8897 0.7217 6.1406 0.1774 0.6257 0.3523 1.067 0.4775 1.3438 0.0626 0.1382 0.1124 0.2358 0.1446 0.2949 0.016 0.0295 0.0278 0.0499 0.0341 0.0605 0.001 0.0016 0.0023 0.0028 0.003 0.004l0.0488 0.0898c0.0996 0.214 0.0934 0.465 -0.0215 0.6758 -0.1315 0.2408 -0.3838 0.3906 -0.6582 0.3906H3c-0.27435 0 -0.52674 -0.1498 -0.6582 -0.3906 -0.13141 -0.241 -0.12125 -0.5349 0.02734 -0.7656 0.00071 -0.0012 0.00198 -0.0024 0.00293 -0.004 0.00632 -0.0106 0.01809 -0.031 0.03418 -0.0605 0.03218 -0.0591 0.08199 -0.1567 0.14453 -0.2949 0.12521 -0.2768 0.3001 -0.7181 0.47754 -1.3438 0.35472 -1.2509 0.72168 -3.2441 0.72168 -6.1406 0 -2.18803 0.86884 -4.28681 2.41602 -5.83398C7.47555 3.35648 9.18047 2.5346 11 2.3125V1c0 -0.552282 0.4477 -0.9999952323 1 -1\" stroke-width=\"1\"></path>\n</svg>"}];
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