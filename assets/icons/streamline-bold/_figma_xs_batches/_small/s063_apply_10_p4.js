
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

const BATCH = [{"setName":"icon/misc/watch","name":"watch","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Watch-Time--Streamline-Ultimate\">\n  <desc>\n    Watch Time Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M20 12a8 8 0 0 0 -4 -6.92V1.5A1.5 1.5 0 0 0 14.5 0h-5A1.5 1.5 0 0 0 8 1.5v3.58a8 8 0 0 0 0 13.85v3.57A1.5 1.5 0 0 0 9.5 24h5a1.5 1.5 0 0 0 1.5 -1.5v-3.57A8 8 0 0 0 20 12m-8 6a6 6 0 1 1 6 -6 6 6 0 0 1 -6 6\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.75 11.69V9a0.75 0.75 0 0 0 -1.5 0v3a0.75 0.75 0 0 0 0.22 0.53L14 15a0.76 0.76 0 0 0 1 0 0.75 0.75 0 0 0 0 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/code","name":"code","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Code--Streamline-Ultimate\">\n  <desc>\n    Folder Code Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M22.5 4.5H11.74a0.5 0.5 0 0 1 -0.45 -0.28l-0.95 -1.89A1.5 1.5 0 0 0 9 1.5H1.5A1.5 1.5 0 0 0 0 3v18a1.5 1.5 0 0 0 1.5 1.5h21A1.5 1.5 0 0 0 24 21V6a1.5 1.5 0 0 0 -1.5 -1.5m-12.22 13a0.75 0.75 0 0 1 -1.06 0l-4 -4a0.75 0.75 0 0 1 0 -1.06l4 -4a0.75 0.75 0 0 1 1.06 1.06L7 12.82a0.25 0.25 0 0 0 0 0.36l3.29 3.29a0.75 0.75 0 0 1 -0.01 1.06Zm8 -4 -4 4a0.75 0.75 0 0 1 -1.06 -1.06l3.29 -3.29a0.25 0.25 0 0 0 0 -0.36l-3.29 -3.26a0.75 0.75 0 0 1 1.06 -1.06l4 4a0.75 0.75 0 0 1 0 1.06Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/hammer","name":"hammer","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hammer--Streamline-Ultimate\">\n  <desc>\n    Hammer Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m23.05 8.57 -6.24 -6.24a0.51 0.51 0 0 0 -0.62 -0.07 4.5 4.5 0 0 1 -5.49 -0.9 0.51 0.51 0 0 0 -0.71 0L8.78 2.58a1.46 1.46 0 0 0 -0.44 1.06 1.47 1.47 0 0 0 0.44 1.06l9.07 9.07a1.5 1.5 0 0 0 2.12 0l3.08 -3.08a1.49 1.49 0 0 0 0 -2.12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11 9.28a0.48 0.48 0 0 0 -0.7 0l-9.06 9.07a2.49 2.49 0 0 0 -0.73 1.77 2.77 2.77 0 0 0 2.67 2.67A2.47 2.47 0 0 0 5 22.05L14 13a0.51 0.51 0 0 0 0.15 -0.35 0.53 0.53 0 0 0 -0.15 -0.36Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/face.id","name":"face-id","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Face-Id--Streamline-Ultimate\">\n  <desc>\n    Face Id Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M6.5 22H2.25a0.25 0.25 0 0 1 -0.25 -0.25V17.5a1 1 0 0 0 -2 0V22a2 2 0 0 0 2 2h4.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 7.5a1 1 0 0 0 1 -1V2.25A0.25 0.25 0 0 1 2.25 2H6.5a1 1 0 0 0 0 -2H2a2 2 0 0 0 -2 2v4.5a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 16.5a1 1 0 0 0 -1 1v4.25a0.25 0.25 0 0 1 -0.25 0.25H17.5a1 1 0 0 0 0 2H22a2 2 0 0 0 2 -2v-4.5a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 0h-4.5a1 1 0 0 0 0 2h4.25a0.25 0.25 0 0 1 0.25 0.25V6.5a1 1 0 0 0 2 0V2a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.77 14.45a1 1 0 1 1 1.68 1.1 6.51 6.51 0 0 1 -10.9 0 1 1 0 1 1 1.68 -1.1 4.49 4.49 0 0 0 7.54 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 11.5a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 11.5a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/flash","name":"flash","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash--Streamline-Ultimate\">\n  <desc>\n    Flash Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M17.5 8h-4.1L17.92 0.76a0.47 0.47 0 0 0 0 -0.5 0.51 0.51 0 0 0 -0.42 -0.26h-8a0.49 0.49 0 0 0 -0.5 0.38l-3 12a0.48 0.48 0 0 0 0.09 0.43 0.49 0.49 0 0 0 0.41 0.19h3.35L7 23.37a0.49 0.49 0 0 0 0.27 0.58 0.52 0.52 0 0 0 0.63 -0.17l10 -15a0.5 0.5 0 0 0 -0.4 -0.78\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/stopwatch","name":"stopwatch","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Stopwatch--Streamline-Ultimate\">\n  <desc>\n    Stopwatch Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m19.16 8.26 1.55 -1.55a1 1 0 1 0 -1.42 -1.42l-1.6 1.6A9.49 9.49 0 0 0 13 5.05V2h2a1 1 0 0 0 0 -2H9a1 1 0 0 0 0 2h2v3.05a9.51 9.51 0 1 0 8.16 3.21M12 22a7.5 7.5 0 1 1 7.5 -7.5A7.5 7.5 0 0 1 12 22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M9.21 10.29a1 1 0 1 0 -1.42 1.42l3.5 3.5a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/actions/clear","name":"clear","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Clear-Notification--Streamline-Ultimate\">\n  <desc>\n    Alert Clear Notification Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15 17.5a1 1 0 0 0 -1 1V20H2V3h12v1.5a1 1 0 0 0 2 0V3a3 3 0 0 0 -3 -3H3a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-2.5a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4.5 7H15s0.5 0 0.5 0.5V10s0 0.5 -0.5 0.5H4.5s-0.5 0 -0.5 -0.5V7.5s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 12.5H16s0.5 0 0.5 0.5v2.5s0 0.5 -0.5 0.5H5.5s-0.5 0 -0.5 -0.5V13s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21.5 7.75a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.5 11.5a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.25 14.5h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
