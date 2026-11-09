
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

const BATCH = [{"setName":"icon/status/online","name":"online","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Online-Video-Chat--Streamline-Ultimate\">\n  <desc>\n    Online Video Chat Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.294 0.12a2.462 2.462 0 0 0 -2.462 2.462v15.29L0.158 22.893a0.75 0.75 0 0 0 0.893 0.965l6.76 -1.69h13.607a2.462 2.462 0 0 0 2.463 -2.462V2.582A2.462 2.462 0 0 0 21.418 0.119H4.294Zm2.281 6.136h9.08c0.595 0 1.078 0.482 1.078 1.077v7.541c0 0.595 -0.483 1.077 -1.077 1.077h-9.08a1.077 1.077 0 0 1 -1.078 -1.077V7.333c0 -0.595 0.482 -1.077 1.077 -1.077m13.407 8.126 -3.25 -1.218v-4.12l3.25 -1.219a0.488 0.488 0 0 1 0.66 0.456v5.644a0.488 0.488 0 0 1 -0.66 0.457M11.748 8.05h-1.264a0.5 0.5 0 0 0 -0.5 0.5v1.42H8.56a0.5 0.5 0 0 0 -0.5 0.5v1.264a0.5 0.5 0 0 0 0.5 0.5h1.423v1.423a0.5 0.5 0 0 0 0.5 0.5l1.264 0a0.5 0.5 0 0 0 0.5 -0.5v-1.423h1.422a0.5 0.5 0 0 0 0.5 -0.5V10.47a0.5 0.5 0 0 0 -0.5 -0.5h-1.422V8.55a0.5 0.5 0 0 0 -0.5 -0.5Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];

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
