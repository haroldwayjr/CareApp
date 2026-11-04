
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

const BATCH = [{"setName":"icon/health/family.care","name":"family-care","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Family-Home--Streamline-Ultimate\">\n  <desc>\n    Family Home Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.49 6.13 12.93 0.23a2 2 0 0 0 -1.88 0L0.51 6.13a1 1 0 0 0 1 1.74l10.34 -5.82a0.28 0.28 0 0 1 0.25 0l10.41 5.82A1 1 0 0 0 23 8a1 1 0 0 0 0.87 -0.51 1 1 0 0 0 -0.38 -1.36\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M9.5 10a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 13a3.5 3.5 0 0 0 -3.5 3.5v2a0.51 0.51 0 0 0 0.5 0.5h0.59a0.49 0.49 0 0 1 0.5 0.45l0.41 4.1a0.5 0.5 0 0 0 0.5 0.45h2a0.5 0.5 0 0 0 0.5 -0.45l0.41 -4.1a0.49 0.49 0 0 1 0.5 -0.45H15a0.51 0.51 0 0 0 0.5 -0.5v-2A3.5 3.5 0 0 0 12 13\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18 11.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.25 14A3.26 3.26 0 0 0 17 17.25V19a0.51 0.51 0 0 0 0.5 0.5h0.5a0.5 0.5 0 0 1 0.5 0.45l0.37 3.6a0.49 0.49 0 0 0 0.49 0.45h1.84a0.49 0.49 0 0 0 0.49 -0.45L22 20a0.5 0.5 0 0 1 0.5 -0.45h0.5a0.51 0.51 0 0 0 0.5 -0.5v-1.8A3.26 3.26 0 0 0 20.25 14\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.5 11.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.75 14A3.26 3.26 0 0 0 0.5 17.25V19a0.47 0.47 0 0 0 0.15 0.35 0.47 0.47 0 0 0 0.35 0.15h0.47A0.5 0.5 0 0 1 2 20l0.37 3.6a0.49 0.49 0 0 0 0.49 0.45h1.81a0.49 0.49 0 0 0 0.49 -0.45l0.37 -3.6a0.5 0.5 0 0 1 0.47 -0.5h0.5A0.51 0.51 0 0 0 7 19v-1.75A3.26 3.26 0 0 0 3.75 14\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/mental.wellness","name":"mental-wellness","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Mindfulness-2--Streamline-Ultimate\">\n  <desc>\n    Mindfulness 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M5.48795 1.96055C7.12798 0.843956 9.06658 0.24783 11.0506 0.250006c1.856 0.000037 3.3761 0.382892 4.6487 1.083604 1.2712 0.69993 2.2664 1.70106 3.0968 2.89519 1.3614 1.9577 2.3161 4.49863 3.3189 7.1673l0.0001 0.0003c0.2056 0.5472 0.4132 1.0998 0.6268 1.6538l0.0003 0.0007c0.0726 0.1893 0.0981 0.3935 0.0744 0.5948 -0.0238 0.2014 -0.0962 0.394 -0.2109 0.5612 -0.1148 0.1672 -0.2684 0.304 -0.4478 0.3986 -0.1793 0.0946 -0.379 0.1442 -0.5818 0.1445l-0.0007 0h-1.4v2.5c0 0.9283 -0.3688 1.8185 -1.0252 2.4749 -0.6563 0.6564 -1.5466 1.0251 -2.4748 1.0251h-1v2.5c0 0.2761 -0.2239 0.5 -0.5 0.5H4.67536c-0.27615 0 -0.5 -0.2239 -0.5 -0.5V17.2c-1.36989 -1.3272 -2.32685 -3.0244 -2.75255 -4.8869 -0.442101 -1.9343 -0.29066 -3.95691 0.43455 -5.80377 0.72521 -1.84687 1.99048 -3.43214 3.63059 -4.54878m5.72185 6.07558c-1.39717 0 -2.76449 0.78392 -3.7623 1.57547 -0.50333 0.3993 -0.92366 0.8092 -1.21996 1.142 -0.14786 0.166 -0.26757 0.3159 -0.35199 0.438 -0.04194 0.0607 -0.07812 0.1188 -0.10489 0.1714 -0.02068 0.0406 -0.05728 0.1176 -0.05728 0.2021 0 0.0846 0.0366 0.1615 0.05728 0.2021 0.02677 0.0527 0.06295 0.1107 0.10489 0.1714 0.08442 0.1222 0.20413 0.272 0.35199 0.4381 0.2963 0.3327 0.71663 0.7426 1.21996 1.1419 0.99781 0.7916 2.36513 1.5755 3.7623 1.5755 1.3972 0 2.7646 -0.7854 3.7623 -1.5775 0.5033 -0.3996 0.9236 -0.8097 1.2198 -1.1421 0.1478 -0.1658 0.2675 -0.3154 0.3518 -0.4371 0.0419 -0.0604 0.0781 -0.1182 0.1048 -0.1704 0.0205 -0.04 0.0576 -0.117 0.0576 -0.2019 0 -0.0848 -0.0371 -0.1619 -0.0576 -0.2018 -0.0267 -0.0523 -0.0629 -0.1101 -0.1048 -0.1705 -0.0843 -0.1217 -0.204 -0.2712 -0.3518 -0.4371 -0.2962 -0.3324 -0.7165 -0.7425 -1.2198 -1.14208 -0.9977 -0.79213 -2.3651 -1.57749 -3.7623 -1.57749M6.93348 5.4096c-0.24854 -0.33136 -0.71864 -0.3985 -1.05 -0.14997 -0.33137 0.24854 -0.39851 0.71865 -0.14997 1.05001l0.85205 1.13599c0.24854 0.33136 0.71864 0.3985 1.05001 0.14996 0.33136 -0.24854 0.3985 -0.71864 0.14996 -1.05001zm9.74502 -0.14997c-0.3313 -0.24853 -0.8014 -0.18139 -1.05 0.14997l-0.852 1.13598c-0.2486 0.33137 -0.1814 0.80147 0.1499 1.05001 0.3314 0.24854 0.8015 0.1814 1.05 -0.14996l0.8521 -1.13599c0.2485 -0.33136 0.1814 -0.80147 -0.15 -1.05001m-4.719 -0.80802c0 -0.41422 -0.3358 -0.74999 -0.75 -0.74999 -0.4143 0.00001 -0.75 0.33581 -0.75 0.75002l0 1.408c0 0.41421 0.3358 0.74999 0.75 0.74998s0.75 -0.3358 0.75 -0.75002zm-0.7439 8.28379 -0.0062 0c-0.6464 0 -1.1703 -0.524 -1.1703 -1.1703 0 -0.6443 0.5206 -1.167 1.1641 -1.1703l0.0062 0c0.6463 0 1.1703 0.5239 1.1703 1.1703 0 0.6443 -0.5206 1.1669 -1.1641 1.1703\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/crisis","name":"crisis","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Emergency-Call--Streamline-Ultimate\">\n  <desc>\n    Emergency Call Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M3.14746 4.86035c0.206 0 0.41026 0.04033 0.60059 0.11914 0.19043 0.07892 0.36405 0.19501 0.50976 0.34082l2.77246 2.77246c0.14581 0.14572 0.26191 0.31933 0.34082 0.50977 0.07887 0.19038 0.11914 0.39451 0.11914 0.60058 -0.00001 0.2061 -0.04023 0.41019 -0.11914 0.60059 -0.07891 0.19043 -0.19501 0.36309 -0.34082 0.50879 -0.29406 0.2942 -0.45889 0.6934 -0.45898 1.1094 0 0.4159 0.16506 0.8151 0.45898 1.1093l4.43853 4.4376c0.2941 0.294 0.6934 0.4598 1.1093 0.4599 0.4161 0 0.8152 -0.1658 1.1094 -0.4599 0.1457 -0.1459 0.3193 -0.261 0.5098 -0.3399 0.1904 -0.0789 0.3944 -0.1201 0.6006 -0.1201 0.206 0 0.4102 0.0412 0.6005 0.1201s0.3632 0.1942 0.5088 0.3399l2.7754 2.7744c0.2942 0.2942 0.46 0.6933 0.46 1.1093 -0.0001 0.4161 -0.1658 0.8152 -0.46 1.1094l-0.6582 0.6592c-0.7574 0.7575 -1.7506 1.2338 -2.8154 1.3506 -1.0651 0.1168 -2.1383 -0.1334 -3.042 -0.709l-0.0108 -0.0059C7.65777 20.218 3.78385 16.3446 0.744141 11.8467l-0.007813 -0.0108c-0.575432 -0.9038 -0.8249531 -1.97692 -0.7080077 -3.04195C0.145292 7.72884 0.621946 6.73494 1.37988 5.97754l0.65821 -0.65723c0.14569 -0.14578 0.31838 -0.2619 0.50879 -0.34082 0.19035 -0.07888 0.39454 -0.1191 0.60058 -0.11914M18.9658 0c0.4046 0 0.7332 0.349738 0.7334 0.78125v1.97363l1.5996 -0.98633c0.3503 -0.21593 0.7984 -0.08827 1.001 0.28516l0.9658 1.78223c0.2026 0.37377 0.0829 0.85233 -0.2676 1.06836l-1.5996 0.98535 1.5996 0.98633c0.3505 0.21603 0.4702 0.69458 0.2676 1.06836l-0.9658 1.78222c-0.2027 0.37334 -0.6507 0.50104 -1.001 0.28514l-1.5996 -0.98631V10.998c0 0.4318 -0.3286 0.7823 -0.7334 0.7823h-1.9316c-0.4048 0 -0.7334 -0.3505 -0.7334 -0.7823V9.02539l-1.5996 0.98631c-0.3503 0.2159 -0.7983 0.0882 -1.001 -0.28514l-0.9658 -1.78222c-0.2026 -0.37378 -0.0829 -0.85233 0.2676 -1.06836l1.5996 -0.98633 -1.5996 -0.98535c-0.3505 -0.21603 -0.4702 -0.69459 -0.2676 -1.06836l0.9658 -1.78223c0.2026 -0.37341 0.6507 -0.50108 1.001 -0.28516l1.5996 0.98633V0.78125C16.301 0.349739 16.6296 0 17.0342 0z\" stroke-width=\"1\"></path>\n</svg>"}];
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