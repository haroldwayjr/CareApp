
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

const BATCH = [{"setName":"icon/commerce/chart.bar","name":"chart-bar","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Analytics-Bars--Streamline-Ultimate\">\n  <desc>\n    Analytics Bars Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M1.25 17h3.5a0.25 0.25 0 0 0 0.25 -0.25v-2a1 1 0 0 0 -1 -1H2a1 1 0 0 0 -1 1v2a0.25 0.25 0 0 0 0.25 0.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8 8.75a1 1 0 0 0 -1 1v7a0.25 0.25 0 0 0 0.25 0.25h3.5a0.25 0.25 0 0 0 0.25 -0.25v-7a1 1 0 0 0 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14 10.75a1 1 0 0 0 -1 1v5a0.25 0.25 0 0 0 0.25 0.25h3.5a0.25 0.25 0 0 0 0.25 -0.25v-5a1 1 0 0 0 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.25 17h3.5a0.25 0.25 0 0 0 0.25 -0.25v-12a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v12a0.25 0.25 0 0 0 0.25 0.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 20.25h22a1 1 0 0 0 1 -1 1 1 0 0 0 -0.56 -0.9 1.05 1.05 0 0 0 -0.44 -0.1H1a1.05 1.05 0 0 0 -0.44 0.1 1 1 0 0 0 -0.56 0.9 1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/heart","name":"heart","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Heart-Approve-1--Streamline-Ultimate\">\n  <desc>\n    Heart Approve 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m13.3712 16.8208 9.1336 -8.31944c0.3686 1.85624 -0.0589 3.89474 -1.6682 5.50404 -0.0087 0.0087 -0.0176 0.0173 -0.0268 0.0255l-8.8528 8.0189c-0.2857 0.2588 -0.7212 0.2588 -1.007 0l-8.85275 -8.0189c-0.00915 -0.0082 -0.01809 -0.0168 -0.02683 -0.0255 -2.758379 -2.7584 -2.070065889 -6.75042 0.15224 -8.95706 1.12831 -1.12035 2.68562 -1.82625 4.44446 -1.69881 1.57066 0.1138 3.21256 0.88483 4.78638 2.45503 1.5735 -1.56979 3.2139 -2.33932 4.7831 -2.4506 0.9137 -0.0648 1.7724 0.09604 2.5446 0.42314l-7.438 6.7751 -2.70443 -2.44426C7.40955 6.997 5.51248 7.09287 4.40153 8.32208c-1.11094 1.22922 -1.01507 3.12632 0.21415 4.23722l4.72384 4.2694c1.14568 1.0354 2.89008 1.032 4.03168 -0.0079M22.888 6.12334c0.6124 -0.55785 0.6567 -1.50657 0.0988 -2.11901 -0.5579 -0.61245 -1.5066 -0.6567 -2.119 -0.09884l-9.5207 8.67211 -3.71412 -3.35682c-0.61461 -0.55548 -1.56314 -0.50754 -2.11861 0.10707 -0.55548 0.6146 -0.50754 1.56315 0.10707 2.11865l4.72386 4.2693c0.5728 0.5177 1.445 0.516 2.0158 -0.0039z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/stethoscope","name":"stethoscope","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Stethoscope-Website--Streamline-Ultimate\">\n  <desc>\n    Stethoscope Website Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6.825 10.64h-0.882v3.705a2.764 2.764 0 0 0 5.527 0V10.64h-0.881a1 1 0 1 1 0 -2h0.94a1.941 1.941 0 0 1 1.941 1.941v3.764a4.764 4.764 0 0 1 -3.736 4.652 3.234 3.234 0 0 0 6.441 -0.418v-1.557a2.537 2.537 0 1 1 2 0v1.557a5.234 5.234 0 0 1 -10.45 0.427 4.764 4.764 0 0 1 -3.782 -4.661V10.58a1.94 1.94 0 0 1 1.94 -1.94h0.942a1 1 0 1 1 0 2\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M2.074 21.245V5.981h19.852v15.264a0.681 0.681 0 0 1 -0.68 0.681h-2.461a6.736 6.736 0 0 1 -1.75 2h4.21c1.48 0 2.681 -1.2 2.681 -2.68V2.754c0 -1.48 -1.2 -2.681 -2.68 -2.681H2.754a2.68 2.68 0 0 0 -2.681 2.68v18.491c0 1.48 1.2 2.681 2.68 2.681h6.093a6.738 6.738 0 0 1 -1.75 -2H2.755a0.681 0.681 0 0 1 -0.681 -0.68m6.843 0.681a5.234 5.234 0 0 0 8.049 0h-8.05ZM4.53 3.152a0.956 0.956 0 1 1 -1.911 0 0.956 0.956 0 0 1 1.911 0m2.316 0.956a0.956 0.956 0 1 0 0 -1.911 0.956 0.956 0 0 0 0 1.911\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/pill","name":"pill","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Pill--Streamline-Ultimate\">\n  <desc>\n    Pill Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M21.89 2.11a7.22 7.22 0 0 0 -10.2 0l-9.57 9.58A7.2 7.2 0 0 0 7.21 24a7.15 7.15 0 0 0 5.1 -2.1l9.58 -9.58A7.13 7.13 0 0 0 24 7.22a7.16 7.16 0 0 0 -2.11 -5.11m-1.41 8.79 -3.73 3.72a0.5 0.5 0 0 1 -0.71 0L9.38 8a0.51 0.51 0 0 1 0 -0.71l3.73 -3.72a5.21 5.21 0 0 1 7.37 7.37Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.63 3.16a4.13 4.13 0 0 0 -2.91 1.2 0.75 0.75 0 0 0 0 1.06 0.74 0.74 0 0 0 1.06 0 2.7 2.7 0 0 1 3.7 0 0.74 0.74 0 0 0 0.53 0.22 0.71 0.71 0 0 0 0.53 -0.22 0.74 0.74 0 0 0 0 -1.06 4.1 4.1 0 0 0 -2.91 -1.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/first.aid","name":"first-aid","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hospital-First-Aid--Streamline-Ultimate\">\n  <desc>\n    Hospital First Aid Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M21.5 5.87h-4.25a0.5 0.5 0 0 1 -0.5 -0.5V3.88A2.75 2.75 0 0 0 14 1.13h-4a2.75 2.75 0 0 0 -2.75 2.75v1.49a0.5 0.5 0 0 1 -0.5 0.5H2.5A2.5 2.5 0 0 0 0 8.37v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5 -2.5v-12a2.5 2.5 0 0 0 -2.5 -2.5m-11.75 -2a0.25 0.25 0 0 1 0.25 -0.24h4a0.25 0.25 0 0 1 0.25 0.25v1.49a0.5 0.5 0 0 1 -0.5 0.5h-3.5a0.5 0.5 0 0 1 -0.5 -0.5Zm6.75 12a0.5 0.5 0 0 1 -0.5 0.5h-2a0.5 0.5 0 0 0 -0.5 0.5v2a0.5 0.5 0 0 1 -0.5 0.5h-2a0.5 0.5 0 0 1 -0.5 -0.5v-2a0.5 0.5 0 0 0 -0.5 -0.5H8a0.5 0.5 0 0 1 -0.5 -0.5v-2a0.5 0.5 0 0 1 0.5 -0.5h2a0.5 0.5 0 0 0 0.5 -0.5v-2a0.5 0.5 0 0 1 0.5 -0.5h2a0.5 0.5 0 0 1 0.5 0.5v2a0.5 0.5 0 0 0 0.5 0.5h2a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/thermometer","name":"thermometer","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Temperature-Thermometer--Streamline-Ultimate\">\n  <desc>\n    Temperature Thermometer Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M16.56 14.1a0.23 0.23 0 0 1 -0.06 -0.16V4.5a4.5 4.5 0 0 0 -9 0v9.44a0.23 0.23 0 0 1 -0.06 0.16 6 6 0 1 0 9.12 0M12 22a4 4 0 0 1 -2.8 -6.86 1 1 0 0 0 0.3 -0.71V4.5a2.5 2.5 0 0 1 5 0v9.93a1 1 0 0 0 0.3 0.71A4 4 0 0 1 12 22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.11 16.34a0.26 0.26 0 0 1 -0.11 -0.21V7a1 1 0 0 0 -2 0v9.13a0.26 0.26 0 0 1 -0.11 0.21 2 2 0 1 0 2.22 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
