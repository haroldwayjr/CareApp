
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

const BATCH = [{"setName":"icon/health/pharmacy","name":"pharmacy","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Pharmacy--Streamline-Ultimate\">\n  <desc>\n    Pharmacy Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m16.123 1.77856 -1.9414 4.14867 4.7589 0c0.099 0 0.1967 0.00402 0.2932 0.01189l0.6536 -2.86734c0.2269 -0.99504 -0.3313 -2.00141 -1.2955 -2.335881 -0.9685 -0.335964 -2.0343 0.114158 -2.4688 1.042661M20.8425 20.759c0.4181 1.2918 -0.5451 2.6158 -1.9028 2.6158H5.06006c-1.35775 0 -2.32088 -1.324 -1.90284 -2.6158l1.3354 -4.1264c0.2591 -0.8006 0.2591 -1.6625 0 -2.4632L3.15723 10.043c-0.41805 -1.29174 0.54509 -2.61575 1.90283 -2.61575H18.9397c1.3577 0 2.3209 1.32401 1.9028 2.61575l-1.3354 4.1264c-0.2591 0.8007 -0.2591 1.6626 0 2.4632zm-10.368 -2.2586c0 0.5523 0.4477 1 1 1h1.0551c0.5522 0 1 -0.4477 1 -1v-1.5718h1.573c0.5522 0 1 -0.4477 1 -1v-1.055c0 -0.5523 -0.4478 -1 -1 -1h-1.573v-1.5718c0 -0.5522 -0.4478 -1 -1 -1h-1.0551c-0.5523 0 -1 0.4478 -1 1v1.5718l-1.57047 0c-0.55229 0 -1 0.4477 -1 1v1.055c0 0.5523 0.44771 1 0.99999 1h1.57048z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/vaccine","name":"vaccine","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Vaccine-Bottle-1--Streamline-Ultimate\">\n  <desc>\n    Vaccine Bottle 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M16.6497 2.93829v3.38493h-0.2667c-0.3736 -0.00021 -0.7435 0.07321 -1.0887 0.21607 -0.3451 0.14285 -0.6587 0.35233 -0.9228 0.61647 -0.2642 0.26414 -0.4737 0.57775 -0.6165 0.9229 -0.1429 0.34515 -0.2163 0.71507 -0.2161 1.08861l0.0805 8.11493h-1.1726c-0.5523 0 -1 0.4477 -1 1s0.4477 1 1 1h4.2023v2.1979h-2.0139c-0.5523 0 -1 0.4477 -1 1s0.4477 1 1 1h6.0298c0.5523 0 1 -0.4477 1 -1s-0.4477 -1 -1 -1h-2.0159v-2.1979h4.2029c0.5523 0 1 -0.4477 1 -1s-0.4477 -1 -1 -1h-1.173l0.0228 -2.3008h-2.4601c-0.4142 0 -0.75 -0.3357 -0.75 -0.75 0 -0.4142 0.3358 -0.75 0.75 -0.75h2.475l0.0233 -2.3452h-2.4983c-0.4142 0 -0.75 -0.3358 -0.75 -0.75 0 -0.41418 0.3358 -0.74997 0.75 -0.74997h2.5132l0.0046 -0.46896c0.0002 -0.37354 -0.0732 -0.74346 -0.216 -1.08862 -0.1429 -0.34515 -0.3524 -0.65875 -0.6165 -0.92289s-0.5777 -0.47362 -0.9229 -0.61647c-0.3451 -0.14286 -0.7151 -0.21628 -1.0886 -0.21607h-0.2658V2.93829c0 -0.55228 -0.4477 -1 -1 -1 -0.5522 0 -1 0.44772 -1 1M1.86182 6.81873c-0.55229 0 -1.000004 0.44771 -1.000004 1 0 0.55228 0.447714 1 1.000004 1h0.50634v1.14598h5.56598V8.81873h0.50358c0.55228 0 1 -0.44772 1 -1 0 -0.55229 -0.44772 -1 -1 -1zM0.419922 13.8462c0 -1.3591 1.101748 -2.4608 2.460828 -2.4608h4.53782c1.35908 0 2.46082 1.1017 2.46082 2.4608v7.0226c0 1.3591 -1.10174 2.4608 -2.46082 2.4608H2.88075c-1.35908 0 -2.460828 -1.1017 -2.460828 -2.4608v-0.0181H3.81772c0.41422 0 0.75 -0.3358 0.75 -0.75v-5.4861c0 -0.4142 -0.33578 -0.75 -0.75 -0.75H0.419922zm0 1.5184v3.9861H3.06772v-3.9861z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/virus","name":"virus","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Medical-Specialty-Virus--Streamline-Ultimate\">\n  <desc>\n    Medical Specialty Virus Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.25 9.2a0.76 0.76 0 0 0 -0.75 0.75v1.3h-1.61a8.93 8.93 0 0 0 -2.07 -5L20 5.11l0.92 0.91a0.74 0.74 0 0 0 0.53 0.22 0.73 0.73 0 0 0 0.48 -0.24 0.75 0.75 0 0 0 0 -1.06l-1.44 -1.42L19 2.07a0.75 0.75 0 1 0 -1 1.06l0.91 0.92 -1.15 1.13a8.93 8.93 0 0 0 -5 -2.07V1.5h1.3a0.76 0.76 0 0 0 0.74 -0.75 0.76 0.76 0 0 0 -0.75 -0.75H10a0.76 0.76 0 0 0 -0.8 0.75 0.76 0.76 0 0 0 0.8 0.75h1.3v1.61a8.93 8.93 0 0 0 -5 2.07L5.11 4 6 3.13a0.75 0.75 0 1 0 -1 -1.06L3.51 3.51 2.07 5a0.75 0.75 0 0 0 0 1 0.75 0.75 0 0 0 1.06 0l0.92 -0.91 1.13 1.15a8.93 8.93 0 0 0 -2.07 5H1.5V10a0.76 0.76 0 0 0 -0.75 -0.8 0.76 0.76 0 0 0 -0.75 0.8v4.1a0.76 0.76 0 0 0 0.75 0.75 0.76 0.76 0 0 0 0.75 -0.75v-1.3h1.61a8.93 8.93 0 0 0 2.07 5l-1.13 1.09 -0.92 -0.89a0.75 0.75 0 0 0 -1.06 0 0.75 0.75 0 0 0 0 1.06l1.44 1.45L5 21.93a0.74 0.74 0 0 0 0.53 0.22 0.73 0.73 0 0 0 0.47 -0.22 0.75 0.75 0 0 0 0 -1.06L5.11 20l1.13 -1.14a8.93 8.93 0 0 0 5 2.07v1.57H10a0.75 0.75 0 0 0 0 1.5h4.1a0.75 0.75 0 0 0 0 -1.5h-1.3v-1.61a8.93 8.93 0 0 0 5 -2.07L18.89 20l-0.91 0.92a0.75 0.75 0 0 0 0 1.06 0.73 0.73 0 0 0 0.53 0.22 0.74 0.74 0 0 0 0.53 -0.22l1.44 -1.44L21.93 19a0.75 0.75 0 0 0 -1.06 -1l-0.92 0.91 -1.13 -1.13a8.93 8.93 0 0 0 2.07 -5h1.61v1.3a0.75 0.75 0 0 0 1.5 0V10a0.76 0.76 0 0 0 -0.75 -0.8M5 9.43a1.13 1.13 0 1 1 1.13 1.13A1.13 1.13 0 0 1 5 9.43M17.32 11c-0.41 -0.9 -1.43 -1.23 -2.72 -0.89 -2.63 0.69 -3.92 -0.26 -4.45 -0.88a3.34 3.34 0 0 1 -0.44 -3.49 0.75 0.75 0 0 1 1.38 0.59 1.82 1.82 0 0 0 0.2 1.92c0.53 0.62 1.57 0.76 2.93 0.41 2.43 -0.64 3.92 0.53 4.46 1.73a3.05 3.05 0 0 1 -1 3.83 0.74 0.74 0 0 1 -0.42 0.13 0.73 0.73 0 0 1 -0.62 -0.33 0.75 0.75 0 0 1 0.2 -1 1.59 1.59 0 0 0 0.48 -2.02M9 13.07A0.94 0.94 0 0 0 8 13a0.91 0.91 0 0 0 -0.5 0.95 0.75 0.75 0 0 1 -1.5 0.11 2.44 2.44 0 0 1 4 -2.11c0.37 0.33 1.16 1.29 0.5 3.2 -0.23 0.66 -0.13 1.16 0.29 1.39a0.71 0.71 0 0 0 0.9 -0.14 0.75 0.75 0 1 1 1.17 0.93 2.14 2.14 0 0 1 -1.69 0.81 2.31 2.31 0 0 1 -1.1 -0.28 2.51 2.51 0 0 1 -1 -3.21c0.26 -0.74 0.23 -1.32 -0.07 -1.58m3.67 1.12a1.12 1.12 0 1 1 1.52 0.48 1.21 1.21 0 0 1 -0.52 0.13 1 1 0 0 1 -0.34 -0.06 1.13 1.13 0 0 1 -0.66 -0.55\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/mask","name":"mask","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Mask-Circle--Streamline-Ultimate\">\n  <desc>\n    Mask Circle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2m0 21.5a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-19a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4.75 12a7.25 7.25 0 1 0 14.5 0 7.25 7.25 0 1 0 -14.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
