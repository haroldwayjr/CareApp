
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

const BATCH = [{"setName":"icon/health/waiting.room","name":"waiting-room","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Waiting-Room-Lamp--Streamline-Ultimate\">\n  <desc>\n    Waiting Room Lamp Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5 7.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.24 17h-2.89a0.5 0.5 0 0 1 -0.5 -0.46c0 -0.05 -0.37 -3.31 -0.37 -3.31a1.5 1.5 0 0 0 -3 0.54l0.35 3.09A3.52 3.52 0 0 0 10.35 20h2.89a1.5 1.5 0 0 1 1.49 1.38l0.27 2.17a0.52 0.52 0 0 0 0.5 0.45h2a0.5 0.5 0 0 0 0.37 -0.17 0.52 0.52 0 0 0 0.13 -0.38l-0.24 -2.32A4.52 4.52 0 0 0 13.24 17\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.5 21.5H8.75a3.52 3.52 0 0 1 -3.43 -2.76l-0.68 -4a1.5 1.5 0 0 0 -1.48 -1.24H1.5a0.5 0.5 0 0 0 -0.5 0.5v9.5a0.5 0.5 0 0 0 0.5 0.5h11.19a0.48 0.48 0 0 0 0.37 -0.17 0.47 0.47 0 0 0 0.12 -0.39l-0.18 -1.5a0.51 0.51 0 0 0 -0.5 -0.44\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20 3.14V1a1 1 0 0 0 -2 0v2.14A4 4 0 0 0 15 7v0.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1V7a4 4 0 0 0 -3 -3.86\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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