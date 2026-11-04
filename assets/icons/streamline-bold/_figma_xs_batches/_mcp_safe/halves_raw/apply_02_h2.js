
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

const BATCH = [{"setName": "icon/actions/flag.alt", "name": "flag-alt", "category": "actions", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flag--Streamline-Ultimate\">\n  <desc>\n    Flag Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m23.56 15.61 -6.77 -5.41a0.27 0.27 0 0 1 0 -0.4l6 -4.78c0.52 -0.42 0.49 -0.81 0.42 -1s-0.28 -0.52 -0.95 -0.52h-9.5V2A1.5 1.5 0 0 0 11.25 0.5h-6a0.5 0.5 0 0 0 -0.5 0.5v12a0.5 0.5 0 0 0 0.5 0.5h4.23a3.54 3.54 0 0 0 -1.56 1.62 1 1 0 0 0 0.1 0.94 1 1 0 0 0 0.83 0.44h14.4a0.5 0.5 0 0 0 0.31 -0.89Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.75 0a1.5 1.5 0 0 0 -1.5 1.5v21a1.5 1.5 0 0 0 3 0v-21A1.5 1.5 0 0 0 1.75 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/actions/star.add", "name": "star-add", "category": "actions", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rating-Star-Add--Streamline-Ultimate\">\n  <desc>\n    Rating Star Add Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M21.39 11.58a1.47 1.47 0 0 0 0.43 -1.58 1.48 1.48 0 0 0 -1.38 -1H14.5l-2.13 -6a1.46 1.46 0 0 0 -2.75 0L7.5 9H1.56a1.46 1.46 0 0 0 -0.94 2.59l5 4.14 -2.08 6.34a1.46 1.46 0 0 0 2.25 1.65L11 19.9l5.21 3.82a1.49 1.49 0 0 0 1.73 0 1.45 1.45 0 0 0 0.52 -1.65l-2.11 -6.34Zm-6.84 3.05a1 1 0 0 0 -0.31 1.09l1.55 4.64a0.26 0.26 0 0 1 -0.09 0.28 0.24 0.24 0 0 1 -0.3 0l-3.81 -2.79a1 1 0 0 0 -0.59 -0.19 1 1 0 0 0 -0.59 0.19L6.6 20.64a0.24 0.24 0 0 1 -0.3 0 0.25 0.25 0 0 1 -0.09 -0.28l1.55 -4.64a1 1 0 0 0 -0.31 -1.09l-3.87 -3.19a0.25 0.25 0 0 1 -0.08 -0.27 0.26 0.26 0 0 1 0.24 -0.17h4.47a1 1 0 0 0 0.94 -0.67l1.61 -4.59a0.26 0.26 0 0 1 0.48 0l1.61 4.59a1 1 0 0 0 0.94 0.67h4.47a0.26 0.26 0 0 1 0.24 0.17 0.25 0.25 0 0 1 -0.08 0.27Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.91 3h-2V1a1 1 0 0 0 -2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0V5h2a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/actions/send.alt", "name": "send-alt", "category": "actions", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Send-Email--Streamline-Ultimate\">\n  <desc>\n    Send Email Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.82 1.12a0.5 0.5 0 0 0 -0.51 -0.12l-23 9.5A0.5 0.5 0 0 0 0 11a0.51 0.51 0 0 0 0.32 0.46l6.33 2.45a0.52 0.52 0 0 0 0.47 -0.05l8.4 -6a0.5 0.5 0 0 1 0.64 0.77l-7 6.75a0.51 0.51 0 0 0 -0.15 0.36v6.76a0.49 0.49 0 0 0 0.37 0.48 0.49 0.49 0 0 0 0.56 -0.23l3.17 -5.42a0.25 0.25 0 0 1 0.33 -0.1l5.83 3.21a0.5 0.5 0 0 0 0.73 -0.33l4 -18.5a0.5 0.5 0 0 0 -0.18 -0.49\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
