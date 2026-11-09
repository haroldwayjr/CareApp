
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

const BATCH = [{"setName":"icon/health/radiology","name":"radiology","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Radiology-Scan--Streamline-Ultimate\">\n  <desc>\n    Radiology Scan Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M22.5 0h-21A1.5 1.5 0 0 0 0 1.5v21A1.5 1.5 0 0 0 1.5 24h21a1.5 1.5 0 0 0 1.5 -1.5v-21A1.5 1.5 0 0 0 22.5 0m-2.22 9.7a1 1 0 0 1 -1.41 0.14 10.51 10.51 0 0 0 -5.31 -2 0.5 0.5 0 0 0 -0.56 0.49v1.49a0.5 0.5 0 0 0 0.45 0.5 14.84 14.84 0 0 1 2.78 0.51 12.82 12.82 0 0 1 2 0.78 1 1 0 0 1 -0.44 1.89 1 1 0 0 1 -0.44 -0.1 10.7 10.7 0 0 0 -1.7 -0.65 13.13 13.13 0 0 0 -2.11 -0.41 0.49 0.49 0 0 0 -0.39 0.12 0.5 0.5 0 0 0 -0.17 0.38v1.23a0.5 0.5 0 0 0 0.46 0.5 14.88 14.88 0 0 1 2.77 0.51A1 1 0 0 1 16 17a0.9 0.9 0 0 1 -0.28 0 13.25 13.25 0 0 0 -2.12 -0.41 0.47 0.47 0 0 0 -0.38 0.12 0.5 0.5 0 0 0 -0.17 0.38v2.66a1 1 0 0 1 -2 0v-2.66a0.5 0.5 0 0 0 -0.17 -0.38 0.47 0.47 0 0 0 -0.38 -0.12 13.25 13.25 0 0 0 -2.17 0.41 1 1 0 1 1 -0.56 -1.92 14.88 14.88 0 0 1 2.77 -0.51 0.5 0.5 0 0 0 0.46 -0.5v-1.23a0.5 0.5 0 0 0 -0.17 -0.38 0.49 0.49 0 0 0 -0.39 -0.12 13.13 13.13 0 0 0 -2.11 0.41 10.7 10.7 0 0 0 -1.7 0.65 1 1 0 1 1 -0.88 -1.79 12.82 12.82 0 0 1 2 -0.78 14.88 14.88 0 0 1 2.77 -0.51 0.5 0.5 0 0 0 0.46 -0.5V8.33a0.5 0.5 0 0 0 -0.56 -0.49 10.51 10.51 0 0 0 -5.31 2 1 1 0 0 1 -1.39 -0.14 1 1 0 0 1 0.15 -1.41 12.51 12.51 0 0 1 6.68 -2.47 0.5 0.5 0 0 0 0.45 -0.5V3.75a1 1 0 0 1 2 0v1.57a0.5 0.5 0 0 0 0.45 0.5 12.51 12.51 0 0 1 6.68 2.47 1 1 0 0 1 0.15 1.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/signal","name":"signal","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Signal-Wave--Streamline-Ultimate\">\n  <desc>\n    Signal Wave Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M18.6094 0.361858c-0.3775 -0.4031119 -1.0103 -0.4238603 -1.4135 -0.046343 -0.4031 0.377518 -0.4238 1.010345 -0.0463 1.413455 5.3849 5.75002 5.3849 14.79203 0 20.54203 -0.3775 0.4031 -0.3568 1.036 0.0463 1.4135 0.4032 0.3775 1.036 0.3568 1.4135 -0.0464 6.1052 -6.5191 6.1052 -16.75712 0 -23.276242M13.2848 2.96745c0.3905 -0.39052 1.0237 -0.39052 1.4142 0 4.9671 4.96711 4.9671 13.00075 0 17.96785 -0.3905 0.3905 -1.0237 0.3905 -1.4142 0 -0.3905 -0.3906 -0.3905 -1.0237 0 -1.4142 4.1861 -4.1861 4.1861 -10.95337 0 -15.13943 -0.3905 -0.39053 -0.3905 -1.02369 0 -1.41422m-2.0361 3.21338c-0.3905 -0.39052 -1.0237 -0.39052 -1.41423 0 -0.39052 0.39053 -0.39052 1.02369 0 1.41422 2.43333 2.43335 2.43333 6.47405 0 8.90745 -0.39052 0.3905 -0.39052 1.0237 0 1.4142 0.39053 0.3905 1.02373 0.3905 1.41423 0 3.2144 -3.2144 3.2144 -8.52149 0 -11.73587M1.4875 12.0498c0 -2.07106 1.67894 -3.75 3.75 -3.75 2.07107 0 3.75 1.67894 3.75 3.75 0 2.0711 -1.67893 3.75 -3.75 3.75 -2.07106 0 -3.75 -1.6789 -3.75 -3.75\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/accessibility","name":"accessibility","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Tools-Reality-Accessibility--Streamline-Ultimate\">\n  <desc>\n    Tools Reality Accessibility Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0.208374 12C0.208374 5.48765 5.48768 0.208344 12 0.208344 18.5124 0.208344 23.7917 5.48765 23.7917 12c0 6.5123 -5.2793 11.7916 -11.7917 11.7916C5.48768 23.7916 0.208374 18.5123 0.208374 12M9.93007 5.59725c0 -1.14318 0.92673 -2.06991 2.06993 -2.06991s2.0699 0.92673 2.0699 2.06991 -0.9267 2.0699 -2.0699 2.0699 -2.06993 -0.92672 -2.06993 -2.0699m7.23933 3.53432c0.7401 -0.15461 1.5603 0.19453 1.841 0.94293 0.2748 0.733 -0.0909 1.596 -0.9042 1.7697 -1.0627 0.227 -2.1878 0.2879 -3.2337 0.3446l-0.0815 0.0044v2.6043c0 0.0754 -0.0052 0.1496 -0.0153 0.2225l0.8016 3.75c0.1874 0.8765 -0.4808 1.7027 -1.3772 1.7027 -0.6649 0 -1.2392 -0.4651 -1.3775 -1.1155l-0.628 -2.9545h-0.3892l-0.6281 2.9545c-0.1382 0.6504 -0.7126 1.1155 -1.3775 1.1155 -0.89631 0 -1.56457 -0.8262 -1.3772 -1.7028l0.80158 -3.7496c-0.01014 -0.073 -0.01537 -0.1473 -0.01537 -0.2228v-2.6043l-0.08152 -0.0044c-1.04585 -0.0567 -2.17087 -0.1176 -3.2334 -0.3446 -0.81331 -0.1736 -1.17906 -1.0367 -0.90421 -1.7696 0.28066 -0.74846 1.10094 -1.0976 1.84101 -0.94299 1.41149 0.29488 2.99235 0.28483 4.44061 0.27563l0.0001 0 0.0008 -0.00001c0.247 -0.00157 0.4901 -0.00311 0.7278 -0.00311 0.238 0 0.4814 0.00155 0.7286 0.00312 1.4483 0.00919 3.0292 0.01923 4.4408 -0.27567\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
