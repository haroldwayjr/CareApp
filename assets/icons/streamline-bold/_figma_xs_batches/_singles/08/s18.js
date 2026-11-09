
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
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [{"setName":"icon/health/family.care","name":"family-care","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Family-Home--Streamline-Ultimate\">\n  <desc>\n    Family Home Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.49 6.13 12.93 0.23a2 2 0 0 0 -1.88 0L0.51 6.13a1 1 0 0 0 1 1.74l10.34 -5.82a0.28 0.28 0 0 1 0.25 0l10.41 5.82A1 1 0 0 0 23 8a1 1 0 0 0 0.87 -0.51 1 1 0 0 0 -0.38 -1.36\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M9.5 10a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 13a3.5 3.5 0 0 0 -3.5 3.5v2a0.51 0.51 0 0 0 0.5 0.5h0.59a0.49 0.49 0 0 1 0.5 0.45l0.41 4.1a0.5 0.5 0 0 0 0.5 0.45h2a0.5 0.5 0 0 0 0.5 -0.45l0.41 -4.1a0.49 0.49 0 0 1 0.5 -0.45H15a0.51 0.51 0 0 0 0.5 -0.5v-2A3.5 3.5 0 0 0 12 13\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18 11.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.25 14A3.26 3.26 0 0 0 17 17.25V19a0.51 0.51 0 0 0 0.5 0.5h0.5a0.5 0.5 0 0 1 0.5 0.45l0.37 3.6a0.49 0.49 0 0 0 0.49 0.45h1.84a0.49 0.49 0 0 0 0.49 -0.45L22 20a0.5 0.5 0 0 1 0.5 -0.45h0.5a0.51 0.51 0 0 0 0.5 -0.5v-1.8A3.26 3.26 0 0 0 20.25 14\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.5 11.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.75 14A3.26 3.26 0 0 0 0.5 17.25V19a0.47 0.47 0 0 0 0.15 0.35 0.47 0.47 0 0 0 0.35 0.15h0.47A0.5 0.5 0 0 1 2 20l0.37 3.6a0.49 0.49 0 0 0 0.49 0.45h1.81a0.49 0.49 0 0 0 0.49 -0.45l0.37 -3.6a0.5 0.5 0 0 1 0.47 -0.5h0.5A0.51 0.51 0 0 0 7 19v-1.75A3.26 3.26 0 0 0 3.75 14\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
