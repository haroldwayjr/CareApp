
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
const BATCH = [{"setName": "icon/misc/battery.charging", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Battery-Charging-2--Streamline-Ultimate\">\n  <desc>\n    Battery Charging 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M21.67 17.48a0.76 0.76 0 0 0 -0.75 0.75v3.11a0.41 0.41 0 0 1 -0.43 0.39h-4.72a0.75 0.75 0 0 0 0 1.5h4.72a1.92 1.92 0 0 0 1.93 -1.89v-3.11a0.76 0.76 0 0 0 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.85 14a0.75 0.75 0 0 0 -1 -0.21l-0.39 0.26a1.69 1.69 0 0 0 -1.69 -1.69h-0.08v-0.67a0.76 0.76 0 0 0 -0.75 -0.75h-3.58a0.75 0.75 0 0 0 -0.75 0.75v0.67a1.92 1.92 0 0 0 -1.78 1.89v5.54l-1.08 0.72a0.76 0.76 0 0 0 -0.21 1 0.77 0.77 0 0 0 0.63 0.34 0.69 0.69 0 0 0 0.41 -0.13L23.64 15a0.76 0.76 0 0 0 0.21 -1m-8.52 0.23a0.42 0.42 0 0 1 0.44 -0.39h0.59a0.76 0.76 0 0 0 0.75 -0.75v-0.67h2V13a0.75 0.75 0 0 0 0.75 0.75h0.83a0.19 0.19 0 0 1 0.19 0.19v1l-5.59 3.72Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.61 5.48v2l-1.08 -1.12a0.75 0.75 0 1 0 -1.06 1.06l2.36 2.37a0.75 0.75 0 0 0 1.06 0l2.37 -2.37a0.75 0.75 0 0 0 -1.06 -1.06l-1.09 1.09v-2a2.64 2.64 0 0 0 -2.64 -2.64h-4.72a0.75 0.75 0 0 0 0 1.5h4.72a1.14 1.14 0 0 1 1.14 1.17\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.81 20.32H6.08a1.15 1.15 0 0 1 -1.14 -1.14v-2L6 18.29a0.74 0.74 0 0 0 0.53 0.22 0.71 0.71 0 0 0 0.53 -0.22 0.74 0.74 0 0 0 0 -1.06l-2.34 -2.36a0.77 0.77 0 0 0 -1.06 0L1.3 17.23a0.75 0.75 0 0 0 1.06 1.06l1.08 -1.08v2a2.65 2.65 0 0 0 2.64 2.64h4.73a0.75 0.75 0 1 0 0 -1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.84 13.5a1.89 1.89 0 0 0 2 -1.75V4.47A1.86 1.86 0 0 0 7 2.73V1.52a0.74 0.74 0 0 0 -0.75 -0.75H2.6a0.75 0.75 0 0 0 -0.75 0.75v1.21A1.85 1.85 0 0 0 0 4.47v7.28a1.89 1.89 0 0 0 2 1.75ZM2 4.22h0.6a0.75 0.75 0 0 0 0.75 -0.75v-1.2H5.5v1.2a0.76 0.76 0 0 0 0.75 0.75h0.59c0.3 0 0.49 0.16 0.49 0.25v1.91h-5.8V4.47c0 -0.09 0.19 -0.25 0.47 -0.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
