
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

const BATCH = [{"setName": "icon/misc/graduation", "name": "graduation", "category": "misc", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Graduation-Hat--Streamline-Ultimate\">\n  <desc>\n    Graduation Hat Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23.325 7.258a0.654 0.654 0 0 1 0 1.214l-10.762 4.34c-0.422 0.17 -0.894 0.169 -1.314 -0.003L3.26 9.539l0 7.901a2.128 2.128 0 0 1 1.262 1.95v3.452a0.5 0.5 0 0 1 -0.5 0.5H0.753a0.5 0.5 0 0 1 -0.5 -0.5V19.39c0 -0.873 0.517 -1.62 1.263 -1.951l0 -8.615 -0.867 -0.354a0.655 0.655 0 0 1 0 -1.212l10.6 -4.338c0.42 -0.172 0.892 -0.173 1.314 -0.003l10.762 4.34Zm-10.273 6.768 5.85 -2.359v3.837a0.795 0.795 0 0 1 -0.344 0.668c-0.888 0.596 -3.417 2.074 -6.65 2.074 -3.234 0 -5.647 -1.48 -6.486 -2.074a0.787 0.787 0 0 1 -0.323 -0.65v-3.816l5.654 2.314a3.055 3.055 0 0 0 2.3 0.006Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/misc/ticket", "name": "ticket", "category": "misc", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Ticket--Streamline-Ultimate\">\n  <desc>\n    Ticket Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.5 9.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 12.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.16 9.52a1 1 0 0 0 0.84 -1V5a1 1 0 0 0 -1 -1h-3.75a0.5 0.5 0 0 0 -0.5 0.5V6a0.75 0.75 0 0 1 -1.5 0V4.5a0.5 0.5 0 0 0 -0.5 -0.5H1a1 1 0 0 0 -1 1v3.54a1 1 0 0 0 0.86 1 2.5 2.5 0 0 1 0 4.94 1 1 0 0 0 -0.86 1V19a1 1 0 0 0 1 1h15.75a0.5 0.5 0 0 0 0.5 -0.5V18a0.75 0.75 0 0 1 1.5 0v1.5a0.5 0.5 0 0 0 0.5 0.5H23a1 1 0 0 0 1 -1v-3.53a1 1 0 0 0 -0.84 -1 2.5 2.5 0 0 1 0 -5ZM14.5 16a0.5 0.5 0 0 1 -0.5 0.5H6a0.5 0.5 0 0 1 -0.5 -0.5V8a0.5 0.5 0 0 1 0.5 -0.5h8a0.5 0.5 0 0 1 0.5 0.5Zm4.25 -2.5a0.75 0.75 0 0 1 -1.5 0v-3a0.75 0.75 0 0 1 1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/misc/droplet", "name": "droplet", "category": "misc", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Drop-Shape--Streamline-Ultimate\">\n  <desc>\n    Drop Shape Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23 0.25 12 0.250164C5.51065 0.250164 0.25 5.51082 0.25 12.0002c0 6.4893 5.26065 11.75 11.75 11.75 6.4893 0 11.75 -5.2607 11.75 -11.75V1c0 -0.198914 -0.079 -0.389681 -0.2197 -0.530334C23.3897 0.329013 23.1989 0.249997 23 0.25\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
