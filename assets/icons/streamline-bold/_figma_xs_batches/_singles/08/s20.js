
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

const BATCH = [{"setName":"icon/health/crisis","name":"crisis","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Emergency-Call--Streamline-Ultimate\">\n  <desc>\n    Emergency Call Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M3.14746 4.86035c0.206 0 0.41026 0.04033 0.60059 0.11914 0.19043 0.07892 0.36405 0.19501 0.50976 0.34082l2.77246 2.77246c0.14581 0.14572 0.26191 0.31933 0.34082 0.50977 0.07887 0.19038 0.11914 0.39451 0.11914 0.60058 -0.00001 0.2061 -0.04023 0.41019 -0.11914 0.60059 -0.07891 0.19043 -0.19501 0.36309 -0.34082 0.50879 -0.29406 0.2942 -0.45889 0.6934 -0.45898 1.1094 0 0.4159 0.16506 0.8151 0.45898 1.1093l4.43853 4.4376c0.2941 0.294 0.6934 0.4598 1.1093 0.4599 0.4161 0 0.8152 -0.1658 1.1094 -0.4599 0.1457 -0.1459 0.3193 -0.261 0.5098 -0.3399 0.1904 -0.0789 0.3944 -0.1201 0.6006 -0.1201 0.206 0 0.4102 0.0412 0.6005 0.1201s0.3632 0.1942 0.5088 0.3399l2.7754 2.7744c0.2942 0.2942 0.46 0.6933 0.46 1.1093 -0.0001 0.4161 -0.1658 0.8152 -0.46 1.1094l-0.6582 0.6592c-0.7574 0.7575 -1.7506 1.2338 -2.8154 1.3506 -1.0651 0.1168 -2.1383 -0.1334 -3.042 -0.709l-0.0108 -0.0059C7.65777 20.218 3.78385 16.3446 0.744141 11.8467l-0.007813 -0.0108c-0.575432 -0.9038 -0.8249531 -1.97692 -0.7080077 -3.04195C0.145292 7.72884 0.621946 6.73494 1.37988 5.97754l0.65821 -0.65723c0.14569 -0.14578 0.31838 -0.2619 0.50879 -0.34082 0.19035 -0.07888 0.39454 -0.1191 0.60058 -0.11914M18.9658 0c0.4046 0 0.7332 0.349738 0.7334 0.78125v1.97363l1.5996 -0.98633c0.3503 -0.21593 0.7984 -0.08827 1.001 0.28516l0.9658 1.78223c0.2026 0.37377 0.0829 0.85233 -0.2676 1.06836l-1.5996 0.98535 1.5996 0.98633c0.3505 0.21603 0.4702 0.69458 0.2676 1.06836l-0.9658 1.78222c-0.2027 0.37334 -0.6507 0.50104 -1.001 0.28514l-1.5996 -0.98631V10.998c0 0.4318 -0.3286 0.7823 -0.7334 0.7823h-1.9316c-0.4048 0 -0.7334 -0.3505 -0.7334 -0.7823V9.02539l-1.5996 0.98631c-0.3503 0.2159 -0.7983 0.0882 -1.001 -0.28514l-0.9658 -1.78222c-0.2026 -0.37378 -0.0829 -0.85233 0.2676 -1.06836l1.5996 -0.98633 -1.5996 -0.98535c-0.3505 -0.21603 -0.4702 -0.69459 -0.2676 -1.06836l0.9658 -1.78223c0.2026 -0.37341 0.6507 -0.50108 1.001 -0.28516l1.5996 0.98633V0.78125C16.301 0.349739 16.6296 0 17.0342 0z\" stroke-width=\"1\"></path>\n</svg>"}];

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
