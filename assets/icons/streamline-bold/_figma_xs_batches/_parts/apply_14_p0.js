
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

const BATCH = [{"setName":"icon/misc/tool","name":"tool","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tools-Keys--Streamline-Ultimate\">\n  <desc>\n    Tools Keys Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m6 7.56 0.24 0a0.91 0.91 0 0 0 0.64 -0.34 0.92 0.92 0 0 0 0.17 -0.7A3.38 3.38 0 0 1 7 5.78 3.79 3.79 0 0 1 10.76 2a3.74 3.74 0 0 1 3 1.52 1 1 0 0 0 1.4 0.2 1 1 0 0 0 0.2 -1.41A5.79 5.79 0 0 0 5 5.78a5.39 5.39 0 0 0 0.1 1.07 0.88 0.88 0 0 0 0.9 0.71\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.33 22h-1.92a0.91 0.91 0 0 1 -0.91 -0.91v-4a0.37 0.37 0 0 1 0 -0.15 2.5 2.5 0 1 0 -2.08 0 0.37 0.37 0 0 1 0 0.15v4A2.92 2.92 0 0 0 13.41 24h1.92a1 1 0 0 0 0 -2m-3.8 -6.36a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 3a1 1 0 0 0 -1 1v0.89a0.5 0.5 0 0 1 -0.5 0.5h-0.7a2.5 2.5 0 1 0 0 2h1.74A1.48 1.48 0 0 0 24 5.93V4a1 1 0 0 0 -1 -1m-4.5 4.39a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m22.3 14 -0.95 1a0.48 0.48 0 0 1 -0.36 0.15 0.51 0.51 0 0 1 -0.36 -0.15l-1.58 -1.68a2.54 2.54 0 0 0 0.26 -1.1 2.5 2.5 0 1 0 -2.5 2.5 2.38 2.38 0 0 0 0.7 -0.11l2 2.14a1.93 1.93 0 0 0 1.37 0.6 1.92 1.92 0 0 0 1.35 -0.54l1.39 -1.32A1 1 0 0 0 22.3 14m-5.49 -0.82a1 1 0 0 1 0 -2 1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.76 9.64a2.5 2.5 0 0 0 -2.06 3.91L1 16.79a3.86 3.86 0 0 0 -1 2.81 3.79 3.79 0 0 0 1.33 2.65l1.44 1.26A1 1 0 0 0 4.09 22l-1.44 -1.26a1.85 1.85 0 0 1 -0.19 -2.64l3 -3.49 0.33 0a2.5 2.5 0 0 0 0 -5Zm0 3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/qr.scan","name":"qr-scan","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Iris-Scan--Streamline-Ultimate\">\n  <desc>\n    Iris Scan Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M8 12a4 4 0 1 0 4 -4 4 4 0 0 0 -4 4m5 0a1 1 0 1 1 -1 -1 1 1 0 0 1 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.89 13.36a0.23 0.23 0 0 0 -0.08 0.18 0.26 0.26 0 0 0 0.07 0.18l1.06 1.06a0.26 0.26 0 0 0 0.35 0c0.36 -0.34 0.71 -0.69 1 -1a2.6 2.6 0 0 0 0 -3.5c-0.31 -0.34 -0.66 -0.69 -1 -1a0.26 0.26 0 0 0 -0.35 0l-1.06 1.07a0.25 0.25 0 0 0 -0.08 0.18 0.3 0.3 0 0 0 0.08 0.18c0.35 0.32 0.67 0.64 1 1a0.58 0.58 0 0 1 0 0.78c-0.33 0.22 -0.65 0.51 -0.99 0.87\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.46 9.79a1 1 0 0 0 1.41 0 1 1 0 0 0 0 -1.41 0.32 0.32 0 0 1 -0.09 -0.26 0.35 0.35 0 0 1 0.16 -0.23 9.87 9.87 0 0 1 10.12 0 0.31 0.31 0 0 1 0.15 0.23 0.29 0.29 0 0 1 -0.08 0.26 1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0L23.29 5a1 1 0 1 0 -1.41 -1.41l-2.72 2.76a0.51 0.51 0 0 1 -0.61 0.08 12.06 12.06 0 0 0 -13.1 0 0.51 0.51 0 0 1 -0.61 -0.08L2.12 3.63A1 1 0 0 0 0.71 5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.71 14.78a0.26 0.26 0 0 0 0.35 0l1.06 -1.06a0.26 0.26 0 0 0 0.07 -0.18 0.23 0.23 0 0 0 -0.08 -0.18c-0.34 -0.32 -0.66 -0.65 -1 -1a0.6 0.6 0 0 1 0 -0.79c0.29 -0.31 0.62 -0.63 1 -0.95a0.31 0.31 0 0 0 0.09 -0.18 0.23 0.23 0 0 0 -0.08 -0.18L2.06 9.22a0.26 0.26 0 0 0 -0.35 0c-0.36 0.34 -0.71 0.69 -1 1a2.61 2.61 0 0 0 0 3.5c0.29 0.37 0.63 0.72 1 1.06\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.54 14.21a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41 0.33 0.33 0 0 1 0.09 0.28 0.32 0.32 0 0 1 -0.17 0.25 10 10 0 0 1 -10.1 0 0.31 0.31 0 0 1 -0.17 -0.24 0.33 0.33 0 0 1 0.09 -0.28 1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.41 0L0.71 19a1 1 0 0 0 1.41 1.41l2.72 -2.72a0.51 0.51 0 0 1 0.61 -0.08 12 12 0 0 0 13.1 0 0.51 0.51 0 0 1 0.61 0.08l2.72 2.72A1 1 0 0 0 23.29 19Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/flash.off","name":"flash-off","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash-Off--Streamline-Ultimate\">\n  <desc>\n    Flash Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.43 23.15a1 1 0 0 0 0 -1.41l-7.16 -7.17 3.41 -4.78a0.49 0.49 0 0 0 0 -0.52 0.5 0.5 0 0 0 -0.4 -0.27H11.9L13.76 0.61a0.49 0.49 0 0 0 -0.28 -0.61 0.5 0.5 0 0 0 -0.61 0.17L8.3 6.61 2 0.29A1 1 0 0 0 0.57 1.7l21.51 21.5a1 1 0 0 0 0.64 0.25 1 1 0 0 0 0.71 -0.3\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.45 9.69a0.25 0.25 0 0 0 -0.38 0l-3.2 4.49a0.51 0.51 0 0 0 0 0.52 0.52 0.52 0 0 0 0.45 0.27h7.37l-1.9 8.42a0.5 0.5 0 0 0 0.28 0.56 0.54 0.54 0 0 0 0.21 0.05 0.5 0.5 0 0 0 0.4 -0.21l4.41 -6.17a0.24 0.24 0 0 0 0 -0.32Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/history","name":"history","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"History-Fan--Streamline-Ultimate\">\n  <desc>\n    History Fan Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.84 11.89a13 13 0 0 0 -2 -3.8 0.25 0.25 0 0 0 -0.38 0l-4.19 4.41a0.25 0.25 0 0 1 -0.36 0 6.42 6.42 0 0 0 -0.7 -0.66 0.25 0.25 0 0 1 0 -0.36l4.28 -4.54a0.24 0.24 0 0 0 0 -0.35 11.08 11.08 0 0 0 -3.99 -2.37 0.25 0.25 0 0 0 -0.33 0.17l-1.67 6.24a0.25 0.25 0 0 1 -0.31 0.17 6.62 6.62 0 0 0 -0.95 -0.21 0.25 0.25 0 0 1 -0.2 -0.31L14.72 4a0.25 0.25 0 0 0 -0.2 -0.31 15.22 15.22 0 0 0 -5 0 0.25 0.25 0 0 0 -0.2 0.31L11 10.28a0.25 0.25 0 0 1 -0.21 0.31 6.48 6.48 0 0 0 -0.94 0.21 0.26 0.26 0 0 1 -0.32 -0.17l-1.7 -6.24a0.25 0.25 0 0 0 -0.32 -0.17 10.9 10.9 0 0 0 -3.95 2.36 0.24 0.24 0 0 0 0 0.35l4.28 4.54a0.24 0.24 0 0 1 0 0.36 5.49 5.49 0 0 0 -0.69 0.66 0.26 0.26 0 0 1 -0.37 0L2.55 8.07a0.25 0.25 0 0 0 -0.38 0 13.06 13.06 0 0 0 -2 3.8 1 1 0 0 0 0.58 1.24L10.58 17a0.25 0.25 0 0 1 0.07 0.43l-1.46 1.18a0.5 0.5 0 0 0 -0.14 0.61c0.07 0.13 0.7 1.28 2.95 1.28s2.88 -1.15 2.95 -1.28a0.51 0.51 0 0 0 -0.14 -0.61l-1.45 -1.17a0.25 0.25 0 0 1 0.06 -0.43l9.83 -3.88a1 1 0 0 0 0.59 -1.24M12 12.5a4.71 4.71 0 0 1 3.32 1.22 0.25 0.25 0 0 1 -0.09 0.41l-3.14 1.25a0.19 0.19 0 0 1 -0.18 0l-3.14 -1.25a0.25 0.25 0 0 1 -0.08 -0.41A4.62 4.62 0 0 1 12 12.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/weather","name":"weather","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Weather-Rain--Streamline-Ultimate\">\n  <desc>\n    Weather Rain Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <g>\n      <path d=\"M22.09 12.07a0.25 0.25 0 0 1 -0.09 -0.19 7 7 0 0 0 -13.66 -2 0.23 0.23 0 0 1 -0.22 0.17A5.5 5.5 0 0 0 5.34 20a0.28 0.28 0 0 0 0.18 0A2.59 2.59 0 0 1 6 20h0.12a0.25 0.25 0 0 0 0.22 -0.11 1.42 1.42 0 0 1 0.25 -0.3l0.51 -0.51a0.25 0.25 0 0 0 0.06 -0.22 0.25 0.25 0 0 0 -0.16 -0.19A3.5 3.5 0 0 1 8.5 12l0.5 0a1 1 0 0 0 1.11 -0.83A5 5 0 0 1 20 12l0 0.43a1 1 0 0 0 0.5 1 3 3 0 0 1 0.57 4.8 0.29 0.29 0 0 0 -0.08 0.14 1.89 1.89 0 0 1 -0.56 1.08L19 20.88a0.08 0.08 0 0 0 0 0.08 0.1 0.1 0 0 0 0 0.04 5 5 0 0 0 3.09 -8.93\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M5 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M9 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M13 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M7.47 21.53a0.75 0.75 0 0 0 1.06 0l3 -3a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M15.53 18.53a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06 0.75 0.75 0 0 0 1.06 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M19.53 18.53a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06 0.75 0.75 0 0 0 1.06 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    </g>\n    <path d=\"M8.25 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2.88 4.3a1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.42l-0.71 -0.7a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 8.25a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.08 2.42a1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 -0.29 0.67A0.25 0.25 0 0 0 12 4a8.75 8.75 0 0 1 2.12 -0.5 0.23 0.23 0 0 0 0.22 -0.19 1 1 0 0 0 -0.26 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.46 9.54a0.25 0.25 0 0 0 0.12 -0.29 2.76 2.76 0 0 1 -0.1 -0.77 3 3 0 0 1 3 -3 2.91 2.91 0 0 1 1.1 0.21 0.28 0.28 0 0 0 0.25 0 8 8 0 0 1 1.37 -0.92 0.23 0.23 0 0 0 0.13 -0.21 0.22 0.22 0 0 0 -0.11 -0.22 5 5 0 0 0 -7.74 4.14 5.13 5.13 0 0 0 0.33 1.8 0.26 0.26 0 0 0 0.18 0.16 0.23 0.23 0 0 0 0.22 -0.06 7.19 7.19 0 0 1 1.25 -0.84\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_14_p0' };
