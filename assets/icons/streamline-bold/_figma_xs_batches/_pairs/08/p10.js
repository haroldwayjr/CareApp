
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

const BATCH = [{"setName":"icon/health/crisis","name":"crisis","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Emergency-Call--Streamline-Ultimate\">\n  <desc>\n    Emergency Call Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M3.14746 4.86035c0.206 0 0.41026 0.04033 0.60059 0.11914 0.19043 0.07892 0.36405 0.19501 0.50976 0.34082l2.77246 2.77246c0.14581 0.14572 0.26191 0.31933 0.34082 0.50977 0.07887 0.19038 0.11914 0.39451 0.11914 0.60058 -0.00001 0.2061 -0.04023 0.41019 -0.11914 0.60059 -0.07891 0.19043 -0.19501 0.36309 -0.34082 0.50879 -0.29406 0.2942 -0.45889 0.6934 -0.45898 1.1094 0 0.4159 0.16506 0.8151 0.45898 1.1093l4.43853 4.4376c0.2941 0.294 0.6934 0.4598 1.1093 0.4599 0.4161 0 0.8152 -0.1658 1.1094 -0.4599 0.1457 -0.1459 0.3193 -0.261 0.5098 -0.3399 0.1904 -0.0789 0.3944 -0.1201 0.6006 -0.1201 0.206 0 0.4102 0.0412 0.6005 0.1201s0.3632 0.1942 0.5088 0.3399l2.7754 2.7744c0.2942 0.2942 0.46 0.6933 0.46 1.1093 -0.0001 0.4161 -0.1658 0.8152 -0.46 1.1094l-0.6582 0.6592c-0.7574 0.7575 -1.7506 1.2338 -2.8154 1.3506 -1.0651 0.1168 -2.1383 -0.1334 -3.042 -0.709l-0.0108 -0.0059C7.65777 20.218 3.78385 16.3446 0.744141 11.8467l-0.007813 -0.0108c-0.575432 -0.9038 -0.8249531 -1.97692 -0.7080077 -3.04195C0.145292 7.72884 0.621946 6.73494 1.37988 5.97754l0.65821 -0.65723c0.14569 -0.14578 0.31838 -0.2619 0.50879 -0.34082 0.19035 -0.07888 0.39454 -0.1191 0.60058 -0.11914M18.9658 0c0.4046 0 0.7332 0.349738 0.7334 0.78125v1.97363l1.5996 -0.98633c0.3503 -0.21593 0.7984 -0.08827 1.001 0.28516l0.9658 1.78223c0.2026 0.37377 0.0829 0.85233 -0.2676 1.06836l-1.5996 0.98535 1.5996 0.98633c0.3505 0.21603 0.4702 0.69458 0.2676 1.06836l-0.9658 1.78222c-0.2027 0.37334 -0.6507 0.50104 -1.001 0.28514l-1.5996 -0.98631V10.998c0 0.4318 -0.3286 0.7823 -0.7334 0.7823h-1.9316c-0.4048 0 -0.7334 -0.3505 -0.7334 -0.7823V9.02539l-1.5996 0.98631c-0.3503 0.2159 -0.7983 0.0882 -1.001 -0.28514l-0.9658 -1.78222c-0.2026 -0.37378 -0.0829 -0.85233 0.2676 -1.06836l1.5996 -0.98633 -1.5996 -0.98535c-0.3505 -0.21603 -0.4702 -0.69459 -0.2676 -1.06836l0.9658 -1.78223c0.2026 -0.37341 0.6507 -0.50108 1.001 -0.28516l1.5996 0.98633V0.78125C16.301 0.349739 16.6296 0 17.0342 0z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/oxygen","name":"oxygen","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Oxygen-Tank-O2-1--Streamline-Ultimate\">\n  <desc>\n    Oxygen Tank O2 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M3.34815 0.948242c-0.55229 0 -1 0.447718 -1 0.999998 0 0.55229 0.44771 1 1 1h0.43823l0 1.39917h-0.97965c-0.19904 0 -0.38993 0.07913 -0.5306 0.21995 -0.14068 0.14082 -0.2196 0.33179 -0.2194 0.53084l0.0026 2.48064C0.957933 8.31835 0.225111 9.56773 0.20105 10.9905c0.035803 -0.0039 0.072174 -0.0059 0.109009 -0.0059l8.953231 0c0.03702 0 0.07357 0.002 0.10955 0.006 -0.02403 -1.42258 -0.75661 -2.6718 -1.8577 -3.41137l0.00034 -0.32389c0.04123 0.00518 0.08324 0.00784 0.12588 0.00784l1.87671 0v0.43836c0 0.55228 0.44771 1 1.00003 1 0.5523 0 1 -0.44772 1 -1V4.82495c0 -0.55228 -0.4477 -1 -1 -1 -0.55232 0 -1.00003 0.44772 -1.00003 1v0.43823l-1.87671 0c-0.04192 0 -0.08324 0.00258 -0.1238 0.00759l0.00018 -0.17257c0.00021 -0.19905 -0.07872 -0.39002 -0.21939 -0.53084 -0.14068 -0.14082 -0.33156 -0.21995 -0.53061 -0.21995h-0.98136V2.94824h0.43835c0.55229 0 1 -0.44771 1 -1 0 -0.55228 -0.44771 -0.999998 -1 -0.999998zM0.205212 16.9219l-0.003213 -3.9431c0.035497 0.0039 0.07155 0.0058 0.10806 0.0058l8.953231 0c0.03669 0 0.07293 -0.002 0.1086 -0.0058l-0.00321 3.9432c-0.03463 -0.0036 -0.0698 -0.0055 -0.10539 -0.0055l-8.953231 0c-0.035409 0 -0.070388 0.0018 -0.104847 0.0054m0.001621 1.9893 0.000751 0.922C0.208696 21.1976 1.31505 22.303 2.67942 22.303h4.21505c1.36437 0 2.47073 -1.1054 2.47184 -2.4698l0.00075 -0.922c-0.03411 0.0035 -0.06873 0.0053 -0.10377 0.0053H0.310059c-0.034854 0 -0.069291 -0.0018 -0.103226 -0.0053M14.1031 10.6914c-0.8741 0 -1.5827 0.7086 -1.5827 1.5828v3.6959c0 0.8741 0.7086 1.5827 1.5827 1.5827h0.7421c0.8742 0 1.5828 -0.7086 1.5828 -1.5827v-3.6959c0 -0.8742 -0.7086 -1.5828 -1.5828 -1.5828zm-3.5827 1.5828c0 -1.9787 1.604 -3.58279 3.5827 -3.58279h0.7421c1.9787 0 3.5828 1.60409 3.5828 3.58279v3.6959c0 1.9787 -1.6041 3.5827 -3.5828 3.5827h-0.7421c-1.9787 0 -3.5827 -1.604 -3.5827 -3.5827zm10.434 4.7741c-0.9471 0 -1.7501 0.6058 -2.0477 1.4478 -0.1841 0.5208 0.0888 1.0921 0.6096 1.2761 0.5207 0.1841 1.092 -0.0888 1.276 -0.6096 0.0241 -0.0679 0.089 -0.1143 0.1621 -0.1143h0.8115c0.0779 0 0.1412 0.0633 0.1412 0.1412 0 0.0561 -0.0333 0.1069 -0.0846 0.1294l-1.7385 0.7606c-0.7904 0.3458 -1.3012 1.1267 -1.3012 1.9895v0.6657c0 0.5523 0.4478 1 1 1h3.1243c0.5522 0 1 -0.4477 1 -1s-0.4478 -1 -1 -1h-1.6167l1.3337 -0.5835c0.7794 -0.341 1.283 -1.111 1.283 -1.9617 0 -1.1825 -0.9587 -2.1412 -2.1412 -2.1412z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
