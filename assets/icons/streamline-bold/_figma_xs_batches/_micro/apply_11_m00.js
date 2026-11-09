
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

const BATCH = [{"setName": "icon/status/lock", "name": "lock", "category": "status", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock--Streamline-Ultimate\">\n  <desc>\n    Lock Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M8.65 21.5H2.5v-6.15a1.25 1.25 0 0 0 -2.5 0v6.4A2.25 2.25 0 0 0 2.25 24h6.4a1.25 1.25 0 0 0 0 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.25 9.9A1.25 1.25 0 0 0 2.5 8.65V2.5h6.15a1.25 1.25 0 0 0 0 -2.5h-6.4A2.25 2.25 0 0 0 0 2.25v6.4A1.25 1.25 0 0 0 1.25 9.9\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.75 14.1a1.25 1.25 0 0 0 -1.25 1.25v6.15h-6.15a1.25 1.25 0 0 0 0 2.5h6.4A2.25 2.25 0 0 0 24 21.75v-6.4a1.25 1.25 0 0 0 -1.25 -1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21.75 0h-6.4a1.25 1.25 0 0 0 0 2.5h6.15v6.15a1.25 1.25 0 0 0 2.5 0v-6.4A2.25 2.25 0 0 0 21.75 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 3.76a4.49 4.49 0 0 0 -4.5 4.46V9h-0.38a1.62 1.62 0 0 0 -1.62 1.65v7.24a1.62 1.62 0 0 0 1.62 1.61h9.76a1.62 1.62 0 0 0 1.62 -1.61v-7.24A1.62 1.62 0 0 0 16.88 9h-0.38v-0.78A4.49 4.49 0 0 0 12 3.76M9.5 8.22a2.5 2.5 0 0 1 5 0V9h-5ZM12 15a1.5 1.5 0 1 1 1.5 -1.5A1.5 1.5 0 0 1 12 15\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/status/star", "name": "star", "category": "status", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rating-Star--Streamline-Ultimate\">\n  <desc>\n    Rating Star Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.56 8.73a1.51 1.51 0 0 0 -1.41 -1h-6.09a0.5 0.5 0 0 1 -0.47 -0.33l-2.18 -6.2A1.52 1.52 0 0 0 12 0.25a1.49 1.49 0 0 0 -1.4 1L8.41 7.42a0.5 0.5 0 0 1 -0.47 0.33H1.85a1.5 1.5 0 0 0 -1.41 1 1.52 1.52 0 0 0 0.45 1.65l5.18 4.3a0.5 0.5 0 0 1 0.16 0.54l-2.18 6.53a1.5 1.5 0 0 0 2.31 1.69l5.34 -3.92a0.49 0.49 0 0 1 0.59 0l5.35 3.92A1.5 1.5 0 0 0 20 21.77l-2.18 -6.53a0.5 0.5 0 0 1 0.16 -0.54l5.19 -4.31a1.51 1.51 0 0 0 0.39 -1.66\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/status/shield.check", "name": "shield-check", "category": "status", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Shield--Streamline-Ultimate\">\n  <desc>\n    Check Shield Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.42 0H3.58a1.5 1.5 0 0 0 -1.49 1.5v6.26a18.26 18.26 0 0 0 9.68 16.18 0.47 0.47 0 0 0 0.46 0 18.26 18.26 0 0 0 9.68 -16.18V1.5A1.5 1.5 0 0 0 20.42 0M17.9 7.94l-7.11 6.7a1 1 0 0 1 -0.68 0.27 1 1 0 0 1 -0.71 -0.29L7 12.22a1 1 0 0 1 0 -1.41 1 1 0 0 1 1.42 0l1.68 1.7 6.4 -6a1 1 0 0 1 1.4 1.43\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
