
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

const BATCH = [{"setName": "icon/status/notification", "name": "notification", "category": "status", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Notification--Streamline-Ultimate\">\n  <desc>\n    Alert Notification Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12 14a1 1 0 0 0 -1 1v5H2V6.5a0.5 0.5 0 0 1 0.5 -0.5H8a1 1 0 0 0 0 -2H2.5A2.5 2.5 0 0 0 0 6.5v15A2.5 2.5 0 0 0 2.5 24h8a2.5 2.5 0 0 0 2.5 -2.5V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 2A6.83 6.83 0 0 0 18.76 0.18a6.71 6.71 0 0 0 -8.06 5.06 6.63 6.63 0 0 0 -0.08 3.31l-2.37 2.94a0.74 0.74 0 0 0 -0.05 0.86 0.75 0.75 0 0 0 0.79 0.34l3.67 -0.79a6.73 6.73 0 0 0 4.51 1.72A6.81 6.81 0 0 0 24 6.82 6.79 6.79 0 0 0 22 2m-5 0.75a0.75 0.75 0 0 1 0.75 0.75v3a0.75 0.75 0 0 1 -1.5 0v-3a0.76 0.76 0 0 1 0.75 -0.75m0 5.88a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/media/play", "name": "play", "category": "media", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Button-Play--Streamline-Ultimate\">\n  <desc>\n    Button Play Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236 3.35977 3.34094 1.8217 5.21509 0.913451 7.4078 0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411s1.605908 4.466 3.284138 6.1442 3.81643 2.8211 6.1442 3.2841c2.32778 0.463 4.74058 0.2254 6.93328 -0.6828 2.1927 -0.9083 4.0669 -2.4464 5.3854 -4.4198C23.2962 16.6935 24 14.3734 24 12c0 -3.1826 -1.2643 -6.23485 -3.5147 -8.48528C18.2348 1.26428 15.1826 0 12 0m4.83 12.89 -7.37999 3.69c-0.15223 0.0767 -0.32155 0.1132 -0.49186 0.1061 -0.17032 -0.0071 -0.33598 -0.0577 -0.48126 -0.1469 -0.14528 -0.0891 -0.26536 -0.214 -0.34882 -0.3626s-0.12755 -0.3161 -0.12806 -0.4866V8.31c-0.0012 -0.17131 0.04163 -0.34006 0.12439 -0.49006 0.08276 -0.14999 0.20266 -0.27622 0.34822 -0.36656 0.14555 -0.09035 0.31188 -0.14179 0.48303 -0.14938 0.17114 -0.0076 0.34137 0.0289 0.49436 0.106L16.83 11.1c0.1664 0.0829 0.3064 0.2106 0.4043 0.3687 0.0978 0.1581 0.1496 0.3404 0.1496 0.5263s-0.0518 0.3682 -0.1496 0.5263c-0.0979 0.1581 -0.2379 0.2858 -0.4043 0.3687\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/media/skip.back", "name": "skip-back", "category": "media", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Previous--Streamline-Ultimate\">\n  <desc>\n    Button Previous Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5 15.38a1 1 0 0 1 -1.67 0.74l-3.75 -3.38a1 1 0 0 1 0 -1.48l3.75 -3.38a1 1 0 0 1 1.67 0.74ZM10 8v8a1 1 0 0 1 -1 1H8a1 1 0 0 1 -1 -1V8a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
