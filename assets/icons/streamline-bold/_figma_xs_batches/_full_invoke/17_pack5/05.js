
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
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function applyBoldXs(set, svg) {
  const xs = set.children.find(c => c.name === 'Size=xs');
  const md = set.children.find(c => c.name === 'Size=md');
  if (!xs) return { ok: false, reason: 'no-xs' };
  xs.visible = true;
  for (const c of [...xs.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = set.name.split('/').pop();
  node.resize(16, 16);
  node.x = 0; node.y = 0;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch(__){} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}
const BATCH = [{"setName": "icon/misc/passport", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Passport--Streamline-Ultimate\">\n  <desc>\n    Passport Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M8.3 13.5a0.49 0.49 0 0 0 0.5 -0.5 16.52 16.52 0 0 1 0.38 -2.62 0.48 0.48 0 0 0 -0.18 -0.5 0.5 0.5 0 0 0 -0.58 0 5.54 5.54 0 0 0 -2 3 0.5 0.5 0 0 0 0.09 0.44 0.49 0.49 0 0 0 0.39 0.19Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.7 13a0.5 0.5 0 0 0 0.5 0.47h1.39a0.49 0.49 0 0 0 0.39 -0.19 0.5 0.5 0 0 0 0.09 -0.44 5.54 5.54 0 0 0 -2 -3 0.5 0.5 0 0 0 -0.58 0 0.48 0.48 0 0 0 -0.21 0.53A16.52 16.52 0 0 1 14.7 13\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.39 8.81a9.77 9.77 0 0 0 -1.1 4.19 0.48 0.48 0 0 0 0.13 0.38 0.51 0.51 0 0 0 0.37 0.16h1.92a0.51 0.51 0 0 0 0.37 -0.16 0.48 0.48 0 0 0 0.13 -0.38 9.77 9.77 0 0 0 -1.1 -4.15 0.12 0.12 0 0 0 -0.11 -0.09h-0.58a0.12 0.12 0 0 0 -0.03 0.05\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.81 15.47a0.5 0.5 0 0 0 -0.5 -0.47h-1.4a0.49 0.49 0 0 0 -0.39 0.19 0.5 0.5 0 0 0 -0.09 0.44 5.5 5.5 0 0 0 2 3 0.5 0.5 0 0 0 0.58 0 0.51 0.51 0 0 0 0.21 -0.54 14.6 14.6 0 0 1 -0.41 -2.62\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.1 19.71a10.44 10.44 0 0 0 1.1 -4.17 0.45 0.45 0 0 0 -0.13 -0.38 0.48 0.48 0 0 0 -0.36 -0.16h-1.92a0.48 0.48 0 0 0 -0.36 0.16 0.45 0.45 0 0 0 -0.13 0.38 10.44 10.44 0 0 0 1.1 4.17l0.31 0 0.31 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.8 5.17a0.48 0.48 0 0 1 -0.3 -0.45V2a2 2 0 0 0 -2 -2h-13A3.5 3.5 0 0 0 2 3.5V21a3 3 0 0 0 3 3h15a2 2 0 0 0 2 -2V7a2 2 0 0 0 -1.2 -1.83M4 3.5A1.5 1.5 0 0 1 5.5 2H18a0.5 0.5 0 0 1 0.5 0.5v2a0.5 0.5 0 0 1 -0.5 0.5H5.5A1.5 1.5 0 0 1 4 3.5m7.75 17.75a7 7 0 1 1 7 -7 7 7 0 0 1 -7 7\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.19 15a0.5 0.5 0 0 0 -0.5 0.47 14.6 14.6 0 0 1 -0.4 2.63 0.51 0.51 0 0 0 0.21 0.54 0.5 0.5 0 0 0 0.58 0 5.5 5.5 0 0 0 2 -3 0.5 0.5 0 0 0 -0.09 -0.44 0.49 0.49 0 0 0 -0.39 -0.19Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/misc/award", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Award-Star--Streamline-Ultimate\">\n  <desc>\n    Award Star Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M6.52 10.14 9.64 10l1.19 3a1.28 1.28 0 0 0 2.43 -0.15l1 -3.57 3.57 -1a1.27 1.27 0 0 0 1 -1.18A1.24 1.24 0 0 0 18 5.83l-3 -1.19 0.18 -3.14a1.28 1.28 0 0 0 -0.8 -1.19A1.26 1.26 0 0 0 13 0.6l-1.88 1.88 -3.3 -1.31a1.27 1.27 0 0 0 -1.31 0.32 1.29 1.29 0 0 0 -0.31 1.34l1.28 3.3L5.6 8a1.24 1.24 0 0 0 -0.29 1.36 1.27 1.27 0 0 0 1.2 0.77Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.28 19.78a1.51 1.51 0 0 0 -1.5 1.5v2a0.5 0.5 0 0 0 0.5 0.5h12a0.5 0.5 0 0 0 0.5 -0.5v-2a1.5 1.5 0 0 0 -1.5 -1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.28 18.28a0.5 0.5 0 0 0 0.5 -0.5v-1.5a1.84 1.84 0 0 0 -1.34 -1.72l-3 -0.76a0.53 0.53 0 0 0 -0.25 0l-3 0.76a1.84 1.84 0 0 0 -1.35 1.72v1.5a0.5 0.5 0 0 0 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/misc/fire", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"House-Fire--Streamline-Ultimate\">\n  <desc>\n    House Fire Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M14.77 12.31a0.5 0.5 0 0 0 -0.74 0.28 5.13 5.13 0 0 1 -0.81 1.64 0.5 0.5 0 0 1 -0.78 0 4 4 0 0 1 -0.16 -4.93 0.5 0.5 0 0 0 -0.6 -0.75 10.14 10.14 0 0 0 -6.4 9.2 6.22 6.22 0 1 0 12.44 0 6.46 6.46 0 0 0 -2.95 -5.44\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.51 9.91 13 0.41a1.5 1.5 0 0 0 -2 0L0.49 9.91a1.5 1.5 0 0 0 2 2.22l9.15 -8.28a0.5 0.5 0 0 1 0.68 0l9.15 8.28a1.5 1.5 0 1 0 2 -2.22Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/misc/water", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Water-Straw--Streamline-Ultimate\">\n  <desc>\n    Water Straw Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M17.91 2h2.34a1 1 0 0 0 0 -2h-2.34a5 5 0 0 0 -4.86 3.84 0.22 0.22 0 0 1 -0.2 0.16h-8.6a1.39 1.39 0 0 0 -1.12 0.51 1.42 1.42 0 0 0 -0.35 1.23c1.52 9.17 0.88 5.32 2.62 15.75A3 3 0 0 0 8.35 24h6.8a3 3 0 0 0 3 -2.51c1.73 -10.43 1.09 -6.59 2.62 -15.73a1.41 1.41 0 0 0 -0.3 -1.18A1.44 1.44 0 0 0 19.25 4h-3.78a0.24 0.24 0 0 1 -0.21 -0.12 0.23 0.23 0 0 1 0 -0.24A3 3 0 0 1 17.91 2m-6.64 9.6a0.25 0.25 0 0 1 -0.3 0.19 3.61 3.61 0 0 1 -2.2 -1.41A1 1 0 0 0 8 10a1 1 0 0 0 -0.8 0.41 3.85 3.85 0 0 1 -1.07 1 0.26 0.26 0 0 1 -0.24 0 0.27 0.27 0 0 1 -0.14 -0.19L4.9 6.29a0.21 0.21 0 0 1 0 -0.2 0.25 0.25 0 0 1 0.24 -0.09h7.1a0.23 0.23 0 0 1 0.19 0.09 0.25 0.25 0 0 1 0.05 0.22Zm5.08 -1.21a1 1 0 0 0 -1.61 0 3.62 3.62 0 0 1 -0.89 0.86 0.26 0.26 0 0 1 -0.29 0 0.26 0.26 0 0 1 -0.1 -0.26l1.1 -4.79a0.25 0.25 0 0 1 0.24 -0.2h3.56a0.25 0.25 0 0 1 0.2 0.09 0.28 0.28 0 0 1 0.05 0.2l-0.81 4.89a0.29 0.29 0 0 1 -0.15 0.19 0.24 0.24 0 0 1 -0.23 0 3.7 3.7 0 0 1 -1.07 -0.98\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/misc/planet", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Astronomy-Planet--Streamline-Ultimate\">\n  <desc>\n    Astronomy Planet Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M18.5 13.25h-1.91a0.49 0.49 0 0 1 -0.49 -0.39 5.47 5.47 0 0 0 -0.15 -0.58 0.48 0.48 0 0 1 0.22 -0.58l1.66 -1a1 1 0 0 0 -1 -1.73l-1.66 1a0.52 0.52 0 0 1 -0.62 -0.1 4.16 4.16 0 0 0 -0.42 -0.42 0.5 0.5 0 0 1 -0.1 -0.62l1 -1.66a1 1 0 0 0 -1.73 -1l-1 1.66a0.48 0.48 0 0 1 -0.58 0.22c-0.19 -0.05 -0.38 -0.11 -0.58 -0.15a0.49 0.49 0 0 1 -0.39 -0.49V5.5a1 1 0 0 0 -2 0v1.91a0.49 0.49 0 0 1 -0.39 0.49c-0.2 0 -0.39 0.1 -0.58 0.15a0.49 0.49 0 0 1 -0.58 -0.22l-1 -1.66a1 1 0 0 0 -1.73 1l1 1.66a0.52 0.52 0 0 1 -0.1 0.62 4.16 4.16 0 0 0 -0.37 0.42 0.52 0.52 0 0 1 -0.62 0.1L2.67 9a1 1 0 0 0 -1 1.73l1.66 1a0.48 0.48 0 0 1 0.22 0.58 5.47 5.47 0 0 0 -0.15 0.58 0.49 0.49 0 0 1 -0.49 0.39H1a1 1 0 0 0 0 2h1.91a0.49 0.49 0 0 1 0.49 0.39 5.47 5.47 0 0 0 0.15 0.58 0.48 0.48 0 0 1 -0.22 0.58l-1.66 1a1 1 0 0 0 -0.36 1.36 1 1 0 0 0 0.86 0.5 1 1 0 0 0 0.5 -0.13l1.66 -1a0.52 0.52 0 0 1 0.62 0.1 4.16 4.16 0 0 0 0.42 0.42 0.5 0.5 0 0 1 0.1 0.62l-1 1.66a1 1 0 0 0 1.73 1l1 -1.66a0.48 0.48 0 0 1 0.58 -0.22c0.19 0.05 0.38 0.11 0.58 0.15a0.49 0.49 0 0 1 0.39 0.49V23a1 1 0 0 0 2 0v-1.91a0.49 0.49 0 0 1 0.39 -0.49c0.2 0 0.39 -0.1 0.58 -0.15a0.49 0.49 0 0 1 0.58 0.22l1 1.66a1 1 0 0 0 1.73 -1l-1 -1.66a0.52 0.52 0 0 1 0.1 -0.62 4.16 4.16 0 0 0 0.42 -0.42 0.52 0.52 0 0 1 0.62 -0.1l1.66 1a1 1 0 0 0 0.5 0.13 1 1 0 0 0 0.86 -0.5 1 1 0 0 0 -0.36 -1.36l-1.66 -1a0.48 0.48 0 0 1 -0.22 -0.58 5.47 5.47 0 0 0 0.15 -0.58 0.49 0.49 0 0 1 0.49 -0.39h1.91a1 1 0 0 0 0 -2m-10.25 4.5a2 2 0 1 1 2 -2 2 2 0 0 1 -2 2m3 -5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m1.5 3a0.5 0.5 0 1 1 0.5 -0.5 0.5 0.5 0 0 1 -0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m23.62 5.35 -0.43 -0.25a0.5 0.5 0 0 1 -0.19 -0.5l0 -0.35 0 -0.35a0.5 0.5 0 0 1 0.24 -0.5l0.43 -0.25a0.75 0.75 0 1 0 -0.75 -1.3l-0.43 0.25a0.5 0.5 0 0 1 -0.55 0 2.51 2.51 0 0 0 -0.61 -0.36 0.5 0.5 0 0 1 -0.33 -0.49v-0.5a0.75 0.75 0 0 0 -1.5 0v0.5a0.5 0.5 0 0 1 -0.31 0.46 2.51 2.51 0 0 0 -0.61 0.36 0.5 0.5 0 0 1 -0.55 0l-0.44 -0.25a0.75 0.75 0 0 0 -0.75 1.3l0.44 0.25a0.5 0.5 0 0 1 0.24 0.5l0 0.35 0 0.35a0.5 0.5 0 0 1 -0.24 0.5l-0.44 0.25a0.75 0.75 0 0 0 0.38 1.4 0.71 0.71 0 0 0 0.37 -0.1L18 6.4a0.5 0.5 0 0 1 0.55 0 2.51 2.51 0 0 0 0.61 0.36 0.5 0.5 0 0 1 0.31 0.46v0.5a0.75 0.75 0 0 0 1.5 0v-0.5a0.5 0.5 0 0 1 0.31 -0.46 2.51 2.51 0 0 0 0.61 -0.36 0.5 0.5 0 0 1 0.55 0l0.43 0.25a0.76 0.76 0 0 0 1 -0.27 0.75 0.75 0 0 0 -0.25 -1.03m-3.4 0.15a1.25 1.25 0 1 1 1.25 -1.25 1.25 1.25 0 0 1 -1.25 1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
