
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

const BATCH = [{"setName":"icon/misc/tablet","name":"tablet","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tablet--Streamline-Ultimate\">\n  <desc>\n    Tablet Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M19 0H5a2.5 2.5 0 0 0 -2.5 2.5v19A2.5 2.5 0 0 0 5 24h14a2.5 2.5 0 0 0 2.5 -2.5v-19A2.5 2.5 0 0 0 19 0M5 4.5a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1H6a1 1 0 0 1 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.5 14.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 14.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/scanner","name":"scanner","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Scanner--Streamline-Ultimate\">\n  <desc>\n    Scanner Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0.33 20a0.25 0.25 0 0 0 -0.19 0.09 0.28 0.28 0 0 0 -0.05 0.2C0.46 22.59 2.45 24 5.5 24h13c3.05 0 5 -1.41 5.41 -3.71a0.28 0.28 0 0 0 -0.05 -0.2 0.25 0.25 0 0 0 -0.19 -0.09Zm19.17 1a0.75 0.75 0 1 1 -0.75 0.75 0.76 0.76 0 0 1 0.75 -0.75m-3 0a0.75 0.75 0 1 1 -0.75 0.75 0.76 0.76 0 0 1 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4 9.75a0.25 0.25 0 0 0 -0.23 0.16L0.3 18.66a0.27 0.27 0 0 0 0 0.23 0.26 0.26 0 0 0 0.23 0.11h22.94a0.26 0.26 0 0 0 0.21 -0.11 0.27 0.27 0 0 0 0 -0.23L20.2 9.91a0.25 0.25 0 0 0 -0.2 -0.16Zm15.88 7.53a0.48 0.48 0 0 1 -0.41 0.22H4.5a0.48 0.48 0 0 1 -0.41 -0.22 0.45 0.45 0 0 1 0 -0.46l2 -5a0.48 0.48 0 0 1 0.46 -0.32h11a0.48 0.48 0 0 1 0.46 0.32l2 5a0.45 0.45 0 0 1 -0.1 0.46Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.09 8.25a0.24 0.24 0 0 0 0.24 -0.2L22 0.61a0.49 0.49 0 0 0 -0.1 -0.42 0.51 0.51 0 0 0 -0.4 -0.19h-19a0.51 0.51 0 0 0 -0.39 0.19 0.49 0.49 0 0 0 -0.11 0.42l1.67 7.44a0.24 0.24 0 0 0 0.24 0.2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/bug","name":"bug","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Catch-Bug--Streamline-Ultimate\">\n  <desc>\n    Catch Bug Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M14.0695 0.0166439C15.329 0.218829 16.0568 2.2099 15.695 4.46382c-0.3086 1.92231 -1.3101 3.41497 -2.3795 3.68714l-0.778 5.06354c0.2841 0.1123 0.5407 0.3052 0.7276 0.5855 1 1.5 3 3.5 6 3.5 2.2 0 4 1.8 4 4V24h-8v-4.2c-2 -1 -3.3 -2.1 -4.5 -4 -0.7212 -1.202 -0.4022 -2.0572 0.2347 -2.4546l0.8733 -5.68386c-0.6848 -0.76921 -1.0044 -2.27905 -0.7394 -3.9299 0.3618 -2.25392 1.6762 -3.917181 2.9358 -3.7149961M21.7651 13.0928c0 1.3807 -1.1193 2.5 -2.5 2.5s-2.5 -1.1193 -2.5 -2.5 1.1193 -2.5 2.5 -2.5 2.5 1.1193 2.5 2.5M17.176 4.70155c0.2138 -1.33157 0.1206 -2.65814 -0.2769 -3.745664 -0.0341 -0.093295 -0.0717 -0.187603 -0.1129 -0.282149 1.0862 0.410323 2.3454 1.066723 3.4276 2.107653 1.4191 1.29672 2.681 1.92337 3.4243 2.21031 0.3291 0.12703 0.4763 0.53193 0.2349 0.7891 -0.9746 1.03828 -3.5588 3.10685 -8.4701 2.77679 0.1223 -0.12566 0.2351 -0.25527 0.3378 -0.38523 0.7179 -0.90847 1.2216 -2.13923 1.4353 -3.47081M3.47951 8.39477c0.61144 -0.33969 0.71517 -1.3717 0.71883 -1.99856 0.5475 0.29914 1.3456 0.61654 1.88874 0.31479 0.9 -0.5 0.9 -1.39999 0.4 -2.29999s-1.3 -1.39999 -2.2 -0.89999c-0.61636 0.34242 -0.7168 1.38836 -0.7189 2.01362 -0.56793 -0.30337 -1.39775 -0.63671 -1.88867 -0.32989 -0.9 0.5 -0.899994 1.39999 -0.39999 2.29999 0.5 0.9 1.29999 1.40003 2.19999 0.90003\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
