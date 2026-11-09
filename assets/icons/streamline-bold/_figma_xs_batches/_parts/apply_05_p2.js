
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

const BATCH = [{"setName":"icon/health/eye.health","name":"eye-health","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Eye-Drop--Streamline-Ultimate\">\n  <desc>\n    Eye Drop Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M8.54351 8.28716c0 -1.47018 -2.05554 -4.58134 -2.93041 -5.83892 -0.19084 -0.27433 -0.58671 -0.27769 -0.78186 -0.00641 -0.90164 1.25339 -3.03351 4.37265 -3.03351 5.84533 0 0.89455 0.35536 1.75244 0.9879 2.38504 0.63254 0.6325 1.49044 0.9879 2.38499 0.9879s1.75245 -0.3554 2.38499 -0.9879c0.63254 -0.6326 0.9879 -1.49049 0.9879 -2.38504m-7.2548 5.49824c0.3624 -0.4006 0.81192 -0.8616 1.33227 -1.3456 0.76086 0.4671 1.6422 0.7203 2.54964 0.7203 1.29237 0 2.53181 -0.5134 3.44565 -1.4273 0.91385 -0.9138 1.42723 -2.15326 1.42723 -3.44563 0 -0.06326 -0.002 -0.12675 -0.0058 -0.19036 0.6447 -0.14789 1.3013 -0.23115 1.9624 -0.23115 3.0419 0 5.9896 1.76278 8.1091 3.47294 1.0745 0.8671 1.9707 1.7487 2.6023 2.4468 0.3152 0.3484 0.5707 0.658 0.752 0.9031 0.0896 0.1211 0.1692 0.2374 0.2301 0.3415 0.03 0.0512 0.0632 0.1125 0.091 0.1783 0.0184 0.0434 0.0755 0.1793 0.0755 0.3511s-0.0571 0.3077 -0.0755 0.3511c-0.0278 0.0658 -0.061 0.1271 -0.091 0.1783 -0.0609 0.1041 -0.1405 0.2204 -0.2301 0.3415 -0.1813 0.2451 -0.4368 0.5547 -0.752 0.9031 -0.6316 0.6981 -1.5278 1.5797 -2.6023 2.4468 -2.1195 1.7101 -5.0672 3.4729 -8.1091 3.4729 -3.04185 0 -5.98961 -1.7628 -8.10907 -3.4729 -1.07455 -0.8671 -1.97075 -1.7487 -2.60232 -2.4468 -0.315191 -0.3484 -0.570674 -0.658 -0.751976 -0.9031 -0.089594 -0.1211 -0.169246 -0.2374 -0.230143 -0.3415 -0.030003 -0.0512 -0.063135 -0.1125 -0.091002 -0.1783 -0.018367 -0.0434 -0.075452 -0.1793 -0.075452 -0.3511s0.057085 -0.3077 0.075452 -0.3511c0.027867 -0.0658 0.060999 -0.1271 0.091002 -0.1783 0.060897 -0.1041 0.140549 -0.2204 0.230143 -0.3415 0.181302 -0.2451 0.436785 -0.5547 0.751976 -0.9031m14.16699 1.7741c0 1.9087 -1.5474 3.4561 -3.4561 3.4561 -1.9088 0 -3.45614 -1.5474 -3.45614 -3.4561 0 -1.9088 1.54734 -3.4561 3.45614 -3.4561 1.9087 0 3.4561 1.5473 3.4561 3.4561\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/ear","name":"ear","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Earpods-Ear--Streamline-Ultimate\">\n  <desc>\n    Earpods Ear Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M16.14 17.63a1 1 0 0 0 -1.09 0.9 3.62 3.62 0 0 1 -5.66 2.66 3.78 3.78 0 0 1 -1.57 -2.9 5.4 5.4 0 0 0 -2.71 -4.47 6.26 6.26 0 0 1 2.4 -11.63 6 6 0 0 1 4.72 1.66 1 1 0 0 0 1.39 -1.44A8 8 0 0 0 7.32 0.19a8.27 8.27 0 0 0 -3.21 15.36 3.43 3.43 0 0 1 1.72 2.93 5.62 5.62 0 0 0 11.17 0.25 1 1 0 0 0 -0.86 -1.1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4 7a1 1 0 1 0 1.92 0.55A2.78 2.78 0 0 1 9 5.56a1 1 0 1 0 0.29 -2A4.78 4.78 0 0 0 4 7\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.41 13.11 16.34 6a3.71 3.71 0 0 0 -3 -1 5.17 5.17 0 0 0 -3.15 1.55 5.19 5.19 0 0 0 -1.51 3 1.51 1.51 0 0 0 0.43 1.26l2.51 2.51a1.51 1.51 0 0 0 1.26 0.43 5.19 5.19 0 0 0 3 -1.51l0.16 -0.16a0.51 0.51 0 0 1 0.72 0l3.9 3.9a2 2 0 0 0 2.82 -2.83ZM12.5 8.5a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/wheelchair","name":"wheelchair","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wheelchair-Way--Streamline-Ultimate\">\n  <desc>\n    Wheelchair Way Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.81 15.54a0.5 0.5 0 0 0 -0.49 0L8.82 23a0.5 0.5 0 0 0 -0.26 0.56 0.51 0.51 0 0 0 0.49 0.39h14.5a0.51 0.51 0 0 0 0.5 -0.5V16a0.5 0.5 0 0 0 -0.24 -0.46\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.73 18.85a1 1 0 0 0 -1.39 -0.26 4.5 4.5 0 0 1 -5.44 -7.16A1 1 0 0 0 2.61 9.9a6.5 6.5 0 0 0 7.85 10.34 1 1 0 0 0 0.27 -1.39\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4.43 3.28a2.75 2.75 0 1 0 5.5 0 2.75 2.75 0 1 0 -5.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.4 7.39a1.2 1.2 0 0 0 -0.56 0.53 1.55 1.55 0 0 0 -0.24 0.83v4.47a2.63 2.63 0 0 0 2.63 2.63h2.14a0.53 0.53 0 0 1 0.41 0.19l1.48 1.84a1.55 1.55 0 0 0 1.23 0.59 1.57 1.57 0 0 0 1.23 -2.56l-1.47 -1.84a3.7 3.7 0 0 0 -2.87 -1.38H8.75v-2.42l2.44 0.52a1.24 1.24 0 0 0 0.27 0 1.31 1.31 0 0 0 0.28 -2.6 21.68 21.68 0 0 0 -4.56 -1.02 1.48 1.48 0 0 0 -0.78 0.22\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/prescription","name":"prescription","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Prescription-Px--Streamline-Ultimate\">\n  <desc>\n    Prescription Px Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.33765 2.13673v7.54028l3.70888 0.01416c0.05956 -0.00511 0.11949 -0.00488 0.17901 0.00068l1.24989 0.00477c2.08217 0 3.77017 -1.68794 3.77017 -3.77013s-1.688 -3.77013 -3.77017 -3.77013zm0 9.54027 3.39071 0.013 6.34064 6.3407 -4.22069 4.2207c-0.38924 0.3892 -0.38923 1.0203 0.00001 1.4096 0.38928 0.3892 1.02038 0.3892 1.40958 -0.0001l4.2206 -4.2206 4.2208 4.2208c0.3893 0.3893 1.0204 0.3893 1.4096 0 0.3893 -0.3892 0.3893 -1.0203 0 -1.4095l-4.2208 -4.2209 4.2215 -4.2216c0.3892 -0.3892 0.3892 -1.0203 -0.0001 -1.4096 -0.3892 -0.3892 -1.0203 -0.3892 -1.4095 0l-4.2215 4.2216 -5.0095 -5.0097c2.7133 -0.4709 4.7766 -2.83694 4.7766 -5.68491 0 -3.18676 -2.5834 -5.770134 -5.77017 -5.770134L3.83803 0.134827c-0.5193 0 -0.94615 0.395837 -0.99528 0.902243 -0.00337 0.02884 -0.0051 0.05818 -0.0051 0.08793v18.097c0 0.4142 0.33578 0.75 0.75 0.75 0.41421 0 0.75 -0.3358 0.75 -0.75z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/pharmacy","name":"pharmacy","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Pharmacy--Streamline-Ultimate\">\n  <desc>\n    Pharmacy Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m16.123 1.77856 -1.9414 4.14867 4.7589 0c0.099 0 0.1967 0.00402 0.2932 0.01189l0.6536 -2.86734c0.2269 -0.99504 -0.3313 -2.00141 -1.2955 -2.335881 -0.9685 -0.335964 -2.0343 0.114158 -2.4688 1.042661M20.8425 20.759c0.4181 1.2918 -0.5451 2.6158 -1.9028 2.6158H5.06006c-1.35775 0 -2.32088 -1.324 -1.90284 -2.6158l1.3354 -4.1264c0.2591 -0.8006 0.2591 -1.6625 0 -2.4632L3.15723 10.043c-0.41805 -1.29174 0.54509 -2.61575 1.90283 -2.61575H18.9397c1.3577 0 2.3209 1.32401 1.9028 2.61575l-1.3354 4.1264c-0.2591 0.8007 -0.2591 1.6626 0 2.4632zm-10.368 -2.2586c0 0.5523 0.4477 1 1 1h1.0551c0.5522 0 1 -0.4477 1 -1v-1.5718h1.573c0.5522 0 1 -0.4477 1 -1v-1.055c0 -0.5523 -0.4478 -1 -1 -1h-1.573v-1.5718c0 -0.5522 -0.4478 -1 -1 -1h-1.0551c-0.5523 0 -1 0.4478 -1 1v1.5718l-1.57047 0c-0.55229 0 -1 0.4477 -1 1v1.055c0 0.5523 0.44771 1 0.99999 1h1.57048z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/vaccine","name":"vaccine","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Vaccine-Bottle-1--Streamline-Ultimate\">\n  <desc>\n    Vaccine Bottle 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M16.6497 2.93829v3.38493h-0.2667c-0.3736 -0.00021 -0.7435 0.07321 -1.0887 0.21607 -0.3451 0.14285 -0.6587 0.35233 -0.9228 0.61647 -0.2642 0.26414 -0.4737 0.57775 -0.6165 0.9229 -0.1429 0.34515 -0.2163 0.71507 -0.2161 1.08861l0.0805 8.11493h-1.1726c-0.5523 0 -1 0.4477 -1 1s0.4477 1 1 1h4.2023v2.1979h-2.0139c-0.5523 0 -1 0.4477 -1 1s0.4477 1 1 1h6.0298c0.5523 0 1 -0.4477 1 -1s-0.4477 -1 -1 -1h-2.0159v-2.1979h4.2029c0.5523 0 1 -0.4477 1 -1s-0.4477 -1 -1 -1h-1.173l0.0228 -2.3008h-2.4601c-0.4142 0 -0.75 -0.3357 -0.75 -0.75 0 -0.4142 0.3358 -0.75 0.75 -0.75h2.475l0.0233 -2.3452h-2.4983c-0.4142 0 -0.75 -0.3358 -0.75 -0.75 0 -0.41418 0.3358 -0.74997 0.75 -0.74997h2.5132l0.0046 -0.46896c0.0002 -0.37354 -0.0732 -0.74346 -0.216 -1.08862 -0.1429 -0.34515 -0.3524 -0.65875 -0.6165 -0.92289s-0.5777 -0.47362 -0.9229 -0.61647c-0.3451 -0.14286 -0.7151 -0.21628 -1.0886 -0.21607h-0.2658V2.93829c0 -0.55228 -0.4477 -1 -1 -1 -0.5522 0 -1 0.44772 -1 1M1.86182 6.81873c-0.55229 0 -1.000004 0.44771 -1.000004 1 0 0.55228 0.447714 1 1.000004 1h0.50634v1.14598h5.56598V8.81873h0.50358c0.55228 0 1 -0.44772 1 -1 0 -0.55229 -0.44772 -1 -1 -1zM0.419922 13.8462c0 -1.3591 1.101748 -2.4608 2.460828 -2.4608h4.53782c1.35908 0 2.46082 1.1017 2.46082 2.4608v7.0226c0 1.3591 -1.10174 2.4608 -2.46082 2.4608H2.88075c-1.35908 0 -2.460828 -1.1017 -2.460828 -2.4608v-0.0181H3.81772c0.41422 0 0.75 -0.3358 0.75 -0.75v-5.4861c0 -0.4142 -0.33578 -0.75 -0.75 -0.75H0.419922zm0 1.5184v3.9861H3.06772v-3.9861z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_05_p2' };
