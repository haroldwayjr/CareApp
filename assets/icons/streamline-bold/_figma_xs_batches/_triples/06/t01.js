
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

const BATCH = [{"setName":"icon/health/weight.scale","name":"weight-scale","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Diet-Scale--Streamline-Ultimate\">\n  <desc>\n    Diet Scale Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.44 5.08a1.49 1.49 0 0 0 -0.55 -1.32A17.2 17.2 0 0 0 12 0 17.2 17.2 0 0 0 1.11 3.76a1.47 1.47 0 0 0 -0.55 1.32l1.85 17.58A1.5 1.5 0 0 0 3.9 24h16.2a1.5 1.5 0 0 0 1.49 -1.34ZM20.5 8.5a0.5 0.5 0 0 1 -0.5 0.5h-6.28a0.5 0.5 0 0 1 -0.47 -0.34l-0.78 -2.32a0.51 0.51 0 0 0 -0.94 0l-0.78 2.32a0.49 0.49 0 0 1 -0.47 0.34H4a0.5 0.5 0 0 1 -0.5 -0.5V5.37A0.5 0.5 0 0 1 3.73 5 14.22 14.22 0 0 1 5.8 3.83a0.47 0.47 0 0 1 0.4 0 0.46 0.46 0 0 1 0.27 0.29l0.74 2.08a0.75 0.75 0 0 0 0.71 0.5 0.73 0.73 0 0 0 0.25 0 0.76 0.76 0 0 0 0.46 -1l-0.78 -2.19a0.37 0.37 0 0 1 0 -0.31 0.39 0.39 0 0 1 0.27 -0.2 14.75 14.75 0 0 1 2.59 -0.44 0.48 0.48 0 0 1 0.38 0.13 0.51 0.51 0 0 1 0.16 0.37V4a0.75 0.75 0 0 0 1.5 0v-0.94a0.51 0.51 0 0 1 0.16 -0.37 0.48 0.48 0 0 1 0.38 -0.13 14.75 14.75 0 0 1 2.59 0.44 0.39 0.39 0 0 1 0.25 0.2 0.37 0.37 0 0 1 0 0.31l-0.76 2.19a0.76 0.76 0 0 0 0.46 1 0.73 0.73 0 0 0 0.25 0 0.75 0.75 0 0 0 0.71 -0.5l0.74 -2.08a0.46 0.46 0 0 1 0.27 -0.29 0.47 0.47 0 0 1 0.4 0A14.22 14.22 0 0 1 20.27 5a0.5 0.5 0 0 1 0.23 0.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/fitness","name":"fitness","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Fitness-Weights--Streamline-Ultimate\">\n  <desc>\n    Fitness Weights Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M2 7.5H1a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h1a0.5 0.5 0 0 0 0.5 -0.5V8a0.5 0.5 0 0 0 -0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7 5.5H4.5a1 1 0 0 0 -1 1v11a1 1 0 0 0 1 1H7a0.5 0.5 0 0 0 0.5 -0.5V6a0.5 0.5 0 0 0 -0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 7.5h-1a0.5 0.5 0 0 0 -0.5 0.5v8a0.5 0.5 0 0 0 0.5 0.5h1a1 1 0 0 0 1 -1v-7a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 5.5H17a0.5 0.5 0 0 0 -0.5 0.5v12a0.5 0.5 0 0 0 0.5 0.5h2.5a1 1 0 0 0 1 -1v-11a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M9 10.5h6s0.5 0 0.5 0.5v2s0 0.5 -0.5 0.5H9s-0.5 0 -0.5 -0.5v-2s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/mental.health","name":"mental-health","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Mental-Health-2--Streamline-Ultimate\">\n  <desc>\n    Mental Health 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6.90042 0.440796c0.27614 0 0.5 0.223857 0.5 0.5V3.62575h2.68498c0.2762 0 0.5 0.22385 0.5 0.5v2.75014c0 0.27615 -0.2238 0.5 -0.5 0.5H7.40041v2.68501c0 0.2762 -0.22385 0.5 -0.5 0.5H4.15027c-0.27614 0 -0.5 -0.2238 -0.5 -0.5V7.37589H0.965332c-0.276142 0 -0.5 -0.22385 -0.5 -0.5V4.12575c0 -0.27615 0.223858 -0.5 0.5 -0.5H3.65027V0.940796c0 -0.276142 0.22386 -0.5 0.5 -0.5zM4.45509 13.3796c-0.0996 -0.4358 -0.16543 -0.8766 -0.19777 -1.3187H6.9004c0.0529 0 0.10531 -0.002 0.15718 -0.0061 0.21314 1.2234 1.62413 1.7629 2.83461 1.2774l6.60941 -2.6511c1.2815 -0.514 1.9321 -2.0138 1.0312 -3.0601 -1.42 -1.64916 -3.4584 -2.53179 -5.4474 -2.31395v-1.1813c0 -0.53396 -0.2092 -1.01905 -0.5502 -1.37774 0.4957 -0.08563 1 -0.12899 1.5077 -0.12844 1.6528 0.00004 3.0097 0.34109 4.1471 0.96735 1.1359 0.6255 2.024 1.51954 2.7636 2.5831 1.2109 1.74133 2.0601 4.00138 2.9487 6.36648l0.0001 0.0003 0.0007 0.0019c0.1818 0.4837 0.3652 0.9719 0.5537 1.4609l0.0003 0.0008c0.0677 0.1764 0.0914 0.3665 0.0693 0.5542 -0.0222 0.1876 -0.0896 0.367 -0.1965 0.5228 -0.1069 0.1557 -0.2501 0.2832 -0.4172 0.3713 -0.1671 0.0882 -0.3531 0.1344 -0.542 0.1347h-1.1846v2.1586c0 0.8377 -0.3328 1.6411 -0.9251 2.2335 -0.5924 0.5924 -1.3958 0.9251 -2.2335 0.9251h-0.8293v2.1587c0 0.2761 -0.2239 0.5 -0.5 0.5H7.39299c-0.27614 0 -0.5 -0.2239 -0.5 -0.5v-5.3375c-1.21265 -1.1814 -2.05998 -2.6888 -2.4379 -4.3422\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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