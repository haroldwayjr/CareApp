
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

const BATCH = [{"setName":"icon/misc/globe","name":"globe","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Earth-1--Streamline-Ultimate\">\n  <desc>\n    Earth 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M24 12a12 12 0 1 0 -12 12h0.12A11.89 11.89 0 0 0 24 12.12zm-2 0a9.94 9.94 0 0 1 -0.36 2.63 0.49 0.49 0 0 1 -0.26 0.32 0.51 0.51 0 0 1 -0.38 0.05 3.47 3.47 0 0 1 -1.52 -1.27l-2.22 -3.33a2.5 2.5 0 0 0 -2.08 -1.11h-0.43a2.75 2.75 0 0 1 0 -5.5h2.77a0.48 0.48 0 0 1 0.29 0.09A10 10 0 0 1 22 12M2.18 10.16a0.49 0.49 0 0 1 0.49 -0.41H7a3.44 3.44 0 0 1 2.47 1l1.13 1.15a3.5 3.5 0 0 1 0.14 4.8l-1.36 1.53a2.49 2.49 0 0 0 -0.63 1.66v0.83a0.49 0.49 0 0 1 -0.23 0.42 0.52 0.52 0 0 1 -0.47 0A10 10 0 0 1 2 12a9.26 9.26 0 0 1 0.18 -1.84\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/wifi","name":"wifi","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wifi--Streamline-Ultimate\">\n  <desc>\n    Wifi Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M4.05 9.92a1.24 1.24 0 0 0 0 1.76 1.23 1.23 0 0 0 1.76 0 8.77 8.77 0 0 1 12.38 0 1.25 1.25 0 0 0 1.77 0 1.27 1.27 0 0 0 0 -1.76 11.26 11.26 0 0 0 -15.91 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.78 6.09a15.25 15.25 0 0 0 -21.56 0A1.25 1.25 0 0 0 3 7.86a12.78 12.78 0 0 1 18 0 1.25 1.25 0 0 0 1.76 -1.77Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.38 12a7.27 7.27 0 0 0 -7.51 1.71 1.27 1.27 0 0 0 0 1.77 1.25 1.25 0 0 0 0.89 0.37 1.21 1.21 0 0 0 0.88 -0.37 4.75 4.75 0 0 1 6.53 -0.15 1.53 1.53 0 0 0 1.07 0.52 1.26 1.26 0 0 0 0.89 -2.14A7.18 7.18 0 0 0 14.38 12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M9.5 19.87a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/battery","name":"battery","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M0.337891 0.342694c0.390521 -0.3905217 1.023539 -0.3905164 1.414059 0L7.16406 5.7548H18c0.7956 0 1.5585 0.3163 2.1211 0.87891 0.5626 0.5626 0.8789 1.32547 0.8789 2.12109v0.5h1.5c0.3978 0 0.7792 0.15815 1.0605 0.43946 0.2813 0.2813 0.4395 0.66274 0.4395 1.06054v2.5c0 0.3978 -0.1582 0.7793 -0.4395 1.0606 -0.2813 0.2812 -0.6627 0.4394 -1.0605 0.4394H21v0.5c0 0.7956 -0.3163 1.5585 -0.8789 2.1211 -0.2294 0.2294 -0.4937 0.4149 -0.7783 0.5576l4.3193 4.3194c0.3903 0.3905 0.3905 1.0236 0 1.414s-1.0236 0.3903 -1.4141 0L0.337891 1.75676c-0.3904786 -0.39049 -0.3904079 -1.023535 0 -1.414066M14.7236 18.2548H3c-0.79562 0 -1.55849 -0.3163 -2.121094 -0.8789C0.316322 16.8133 0.0000280534 16.0504 0 15.2548v-6.5c0 -0.79562 0.31633 -1.55849 0.878906 -2.12109 0.396214 -0.39621 0.892304 -0.66754 1.428714 -0.79492z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/sun","name":"sun","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Uv-Sun--Streamline-Ultimate\">\n  <desc>\n    Uv Sun Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12.35 16.05a0.24 0.24 0 0 0 0 -0.27 0.23 0.23 0 0 0 -0.25 -0.11 4.6 4.6 0 0 1 -0.84 0.08 4.5 4.5 0 1 1 2.89 -1.05 0.15 0.15 0 0 0 -0.05 0.19 0.16 0.16 0 0 0 0.16 0.11 2.26 2.26 0 0 1 1.35 0.45 0.24 0.24 0 0 0 0.3 0 2.15 2.15 0 0 1 0.49 -0.28 0.2 0.2 0 0 0 0.1 -0.08 6.5 6.5 0 1 0 -5.24 2.66l0.52 0a0.25 0.25 0 0 0 0.23 -0.25v-0.23a2.25 2.25 0 0 1 0.34 -1.22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.5 11.25a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h1.5a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4.36 5.77a1 1 0 0 0 0.7 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.41L4.71 3.29a1 1 0 0 0 -1.42 1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.25 3.5a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1.5a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m4.36 16.73 -1.07 1.06a1 1 0 0 0 0 1.42 1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29l1.06 -1.07a1 1 0 0 0 -1.41 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 11.25a1 1 0 0 0 1 1h1.5a1 1 0 0 0 0 -2H20a1 1 0 0 0 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.44 6.06a1 1 0 0 0 0.7 -0.29l1.07 -1.06a1 1 0 1 0 -1.42 -1.42l-1.06 1.07a1 1 0 0 0 0 1.41 1 1 0 0 0 0.71 0.29\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18 17.25a0.75 0.75 0 0 0 -1.5 0v4.5a0.75 0.75 0 0 1 -1.5 0v-4.5a0.75 0.75 0 0 0 -1.5 0v4.5a2.25 2.25 0 0 0 4.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.25 16.5a0.76 0.76 0 0 0 -0.75 0.75v1.5a6.77 6.77 0 0 1 -0.5 2.59 0.25 0.25 0 0 1 -0.46 0 6.77 6.77 0 0 1 -0.54 -2.59v-1.5a0.75 0.75 0 0 0 -1.5 0v1.5a8.34 8.34 0 0 0 1.65 4.95 0.75 0.75 0 0 0 1.2 0A8.34 8.34 0 0 0 24 18.75v-1.5a0.76 0.76 0 0 0 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/moon","name":"moon","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Astrology-Moon--Streamline-Ultimate\">\n  <desc>\n    Astrology Moon Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M10 0a12 12 0 0 0 -7.89 3 0.52 0.52 0 0 0 -0.11 0.54 0.51 0.51 0 0 0 0.57 0.25 8.46 8.46 0 1 1 0 16.42 0.51 0.51 0 0 0 -0.57 0.25 0.52 0.52 0 0 0 0.12 0.61A12 12 0 1 0 10 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/grid","name":"grid","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Layout--Streamline-Ultimate\">\n  <desc>\n    Layout Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m3 1.5 8.2539 0 0 10.5 0 10.5L3 22.5c-0.82843 0 -1.5 -0.6716 -1.5 -1.5l0 -18c0 -0.82842 0.67157 -1.5 1.5 -1.5m9.7539 11.25 0 9.75L21 22.5c0.8284 0 1.5 -0.6716 1.5 -1.5l0 -8.25zm9.7461 -1.5 -9.7461 0 0 -9.75L21 1.5c0.8284 0 1.5 0.67157 1.5 1.5z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
