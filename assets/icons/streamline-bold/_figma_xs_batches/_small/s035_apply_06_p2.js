
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

const BATCH = [{"setName":"icon/health/mental.health","name":"mental-health","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Mental-Health-2--Streamline-Ultimate\">\n  <desc>\n    Mental Health 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6.90042 0.440796c0.27614 0 0.5 0.223857 0.5 0.5V3.62575h2.68498c0.2762 0 0.5 0.22385 0.5 0.5v2.75014c0 0.27615 -0.2238 0.5 -0.5 0.5H7.40041v2.68501c0 0.2762 -0.22385 0.5 -0.5 0.5H4.15027c-0.27614 0 -0.5 -0.2238 -0.5 -0.5V7.37589H0.965332c-0.276142 0 -0.5 -0.22385 -0.5 -0.5V4.12575c0 -0.27615 0.223858 -0.5 0.5 -0.5H3.65027V0.940796c0 -0.276142 0.22386 -0.5 0.5 -0.5zM4.45509 13.3796c-0.0996 -0.4358 -0.16543 -0.8766 -0.19777 -1.3187H6.9004c0.0529 0 0.10531 -0.002 0.15718 -0.0061 0.21314 1.2234 1.62413 1.7629 2.83461 1.2774l6.60941 -2.6511c1.2815 -0.514 1.9321 -2.0138 1.0312 -3.0601 -1.42 -1.64916 -3.4584 -2.53179 -5.4474 -2.31395v-1.1813c0 -0.53396 -0.2092 -1.01905 -0.5502 -1.37774 0.4957 -0.08563 1 -0.12899 1.5077 -0.12844 1.6528 0.00004 3.0097 0.34109 4.1471 0.96735 1.1359 0.6255 2.024 1.51954 2.7636 2.5831 1.2109 1.74133 2.0601 4.00138 2.9487 6.36648l0.0001 0.0003 0.0007 0.0019c0.1818 0.4837 0.3652 0.9719 0.5537 1.4609l0.0003 0.0008c0.0677 0.1764 0.0914 0.3665 0.0693 0.5542 -0.0222 0.1876 -0.0896 0.367 -0.1965 0.5228 -0.1069 0.1557 -0.2501 0.2832 -0.4172 0.3713 -0.1671 0.0882 -0.3531 0.1344 -0.542 0.1347h-1.1846v2.1586c0 0.8377 -0.3328 1.6411 -0.9251 2.2335 -0.5924 0.5924 -1.3958 0.9251 -2.2335 0.9251h-0.8293v2.1587c0 0.2761 -0.2239 0.5 -0.5 0.5H7.39299c-0.27614 0 -0.5 -0.2239 -0.5 -0.5v-5.3375c-1.21265 -1.1814 -2.05998 -2.6888 -2.4379 -4.3422\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/symptoms","name":"symptoms","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Smiley-Fever--Streamline-Ultimate\">\n  <desc>\n    Smiley Fever Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15.41 16.71a0.26 0.26 0 0 0 0.31 0l3.57 -2.37a0.25 0.25 0 0 0 0.07 -0.34l-0.56 -0.86a0.26 0.26 0 0 0 -0.35 -0.08l-3.91 2.53a0.24 0.24 0 0 0 -0.11 0.21 0.26 0.26 0 0 0 0.11 0.21 6.29 6.29 0 0 1 0.87 0.7\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5.36 6.45a2.69 2.69 0 0 0 -2.11 -1 1 1 0 0 1 0 -2c1.15 0 3.14 0.55 3.89 2.05a1 1 0 0 1 -0.44 1.34 0.93 0.93 0 0 1 -0.45 0.11 1 1 0 0 1 -0.89 -0.5m0.14 3.05A1.5 1.5 0 1 1 16 8a1.5 1.5 0 0 1 1.5 1.5m-9.25 -6a1 1 0 0 1 0 2 2.69 2.69 0 0 0 -2.11 1 1 1 0 0 1 -0.89 0.5 0.93 0.93 0 0 1 -0.45 -0.11 1 1 0 0 1 -0.44 -1.34C5.11 4.05 7.1 3.5 8.25 3.5m1.25 6A1.5 1.5 0 1 1 8 8a1.5 1.5 0 0 1 1.5 1.5M22 14.39l-5.32 3.52a0.25 0.25 0 0 0 -0.1 0.28 1 1 0 0 1 -0.4 1.14 1 1 0 0 1 -1.41 -0.33 4.49 4.49 0 0 0 -6.61 -1 1 1 0 0 1 -1.27 -1.55A6.55 6.55 0 0 1 11 15a6.34 6.34 0 0 1 1.38 0.15 0.25 0.25 0 0 0 0.19 0l7 -4.49A2.25 2.25 0 0 1 22 14.39\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/insurance","name":"insurance","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Insurance-Hand--Streamline-Ultimate\">\n  <desc>\n    Insurance Hand Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 6.12A1.12 1.12 0 0 0 22.88 5H19.5a0.5 0.5 0 0 1 -0.5 -0.5V1.12A1.12 1.12 0 0 0 17.88 0h-3.76A1.12 1.12 0 0 0 13 1.12V4.5a0.5 0.5 0 0 1 -0.5 0.5H9.12A1.12 1.12 0 0 0 8 6.12v3.76A1.12 1.12 0 0 0 9.12 11h3.38a0.5 0.5 0 0 1 0.5 0.5v3.38A1.12 1.12 0 0 0 14.12 16h3.76A1.12 1.12 0 0 0 19 14.88V11.5a0.5 0.5 0 0 1 0.5 -0.5h3.38A1.12 1.12 0 0 0 24 9.88Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 14.75a1 1 0 0 0 -1 1V23a1 1 0 0 0 2 0v-7.25a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 19.5H6.38a0.63 0.63 0 1 1 0 -1.25H8.9a1 1 0 0 0 0.92 -1.39 2.23 2.23 0 0 0 -2.06 -1.36H3.5a0.5 0.5 0 0 0 -0.5 0.5v6.5a0.5 0.5 0 0 0 0.5 0.5h10.76a2.24 2.24 0 0 0 2.24 -2.24v-0.26a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/sleep","name":"sleep","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sleep-Zzz--Streamline-Ultimate\">\n  <desc>\n    Sleep Zzz Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M11.6831 7.79864c0.165 0.35047 0.5175 0.57417 0.9048 0.57417h5.2707c0.5522 0 1 -0.44772 1 -1 0 -0.55229 -0.4478 -1 -1 -1h-3.1459l3.9164 -4.73549c0.2469 -0.29848 0.2992 -0.712688 0.1342 -1.063158C18.5984 0.223692 18.2459 0 17.8585 0h-5.2706c-0.5523 0 -1 0.447715 -1 1 0 0.55228 0.4477 1 1 1h3.1459l-3.9165 4.73548c-0.2469 0.29849 -0.2991 0.71269 -0.1342 1.06316M0.108384 16.3442c0.164947 0.3505 0.517454 0.5742 0.904796 0.5742h7.0678c0.55229 0 1 -0.4477 1 -1s-0.44771 -1 -1 -1H3.13793l5.71365 -6.90843c0.24686 -0.29849 0.29915 -0.71269 0.1342 -1.06316 -0.16494 -0.35047 -0.51745 -0.57416 -0.9048 -0.57416h-7.0678c-0.552281 0 -0.9999964 0.44771 -0.9999964 1 0 0.55228 0.4477154 1 0.9999964 1h4.94305L0.242587 15.2811c-0.24686411 0.2985 -0.2991493 0.7127 -0.134203 1.0631M14.2974 24.0001c-0.3874 0 -0.7399 -0.2237 -0.9048 -0.5742 -0.165 -0.3505 -0.1127 -0.7647 0.1342 -1.0631l7.0222 -8.4907h-6.2516c-0.5523 0 -1 -0.4477 -1 -1s0.4477 -1 1 -1h8.3763c0.3874 0 0.7399 0.2237 0.9048 0.5742 0.165 0.3504 0.1127 0.7646 -0.1342 1.0631l-7.0222 8.4907h6.2516c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
