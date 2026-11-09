
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

const BATCH = [{"setName":"icon/files/package.alt","name":"package-alt","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Package-Dimension--Streamline-Ultimate\">\n  <desc>\n    Package Dimension Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.05833 1.12503c0 -0.404463 -0.24364 -0.769099 -0.61731 -0.92388 -0.37368 -0.1547813 -0.8038 -0.069226 -1.08979 0.216772L0.420915 2.34823c-0.009846 0.00977 -0.019489 0.01973 -0.028924 0.02989C0.226309 2.55658 0.125 2.79563 0.125 3.05835l0.000004 0.00301c0.000391 0.13234 0.026488 0.25863 0.073561 0.37414 0.048815 0.12007 0.121924 0.23257 0.219328 0.32997L2.35123 5.6988c0.28599 0.286 0.71611 0.37156 1.08979 0.21678 0.37367 -0.15479 0.61731 -0.51942 0.61731 -0.92388v-0.93335h9.59997v0.93335c0 0.40446 0.2437 0.76909 0.6173 0.92388 0.3737 0.15478 0.8038 0.06922 1.0898 -0.21678l1.9334 -1.93333c0.0948 -0.09484 0.1666 -0.204 0.2154 -0.32051 0.0499 -0.11894 0.0775 -0.24955 0.0775 -0.38661 0 -0.14155 -0.0294 -0.27623 -0.0825 -0.39827 -0.0423 -0.09749 -0.1008 -0.18961 -0.1756 -0.27225 -0.0126 -0.01385 -0.0255 -0.02735 -0.0387 -0.04048L15.3654 0.417922c-0.286 -0.285998 -0.7161 -0.3715533 -1.0898 -0.216772 -0.3736 0.154781 -0.6173 0.519417 -0.6173 0.92388v0.93332H4.05833zM20.2315 6.70424c0.0098 -0.00985 0.0198 -0.01949 0.0299 -0.02892 0.0879 -0.08165 0.1869 -0.14457 0.2919 -0.18877 0.1194 -0.05037 0.2506 -0.07822 0.3884 -0.07822l0.003 0c0.2549 0.00076 0.5096 0.09839 0.7041 0.29289l1.9333 1.93333c0.286 0.286 0.3716 0.71612 0.2168 1.08979 -0.1548 0.37366 -0.5194 0.61736 -0.9239 0.61736h-0.9333v9.6h0.9333c0.4045 0 0.7691 0.2436 0.9239 0.6173 0.1548 0.3736 0.0692 0.8038 -0.2168 1.0898l-1.9333 1.9333c-0.0949 0.0948 -0.204 0.1666 -0.3205 0.2154 -0.119 0.0499 -0.2496 0.0775 -0.3866 0.0775 -0.1416 0 -0.2763 -0.0294 -0.3983 -0.0825 -0.0975 -0.0422 -0.1896 -0.1008 -0.2723 -0.1756 -0.0138 -0.0125 -0.0273 -0.0254 -0.0404 -0.0387l-1.9295 -1.9294c-0.286 -0.286 -0.3715 -0.7162 -0.2168 -1.0898 0.1548 -0.3737 0.5195 -0.6173 0.9239 -0.6173h0.9334v-9.6h-0.9334c-0.4044 0 -0.7691 -0.2437 -0.9239 -0.61736 -0.1547 -0.37367 -0.0692 -0.80379 0.2168 -1.08979zm-19.19452 0.70409h3.24396v6.28887c0 0.5523 0.44772 1 1 1h6.02966c0.5523 0 1 -0.4477 1 -1V7.40833h3.2441c0.6222 0 1.037 0.41479 1.037 1.03697V22.963c0 0.6222 -0.4148 1.037 -1.037 1.037H1.03698C0.414792 24 0 23.5852 0 22.963V8.4453c0 -0.62218 0.414792 -1.03697 1.03698 -1.03697m9.27362 0H6.28094v5.28887h4.02966z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/commerce/dollar","name":"dollar","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Currency-Dollar--Streamline-Ultimate\">\n  <desc>\n    Currency Dollar Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M18.13 16.1a4.79 4.79 0 0 0 -3 -4.47l-5.1 -2a1.82 1.82 0 0 1 0.67 -3.5h5a1.5 1.5 0 0 0 0 -3h-2a0.25 0.25 0 0 1 -0.25 -0.25V1.5a1.5 1.5 0 0 0 -3 0v1.37a0.25 0.25 0 0 1 -0.23 0.25 4.81 4.81 0 0 0 -1.38 9.25l5.1 2a1.82 1.82 0 0 1 -0.67 3.5h-5a1.5 1.5 0 1 0 0 3h2a0.25 0.25 0 0 1 0.25 0.25v1.38a1.5 1.5 0 0 0 3 0v-1.37a0.25 0.25 0 0 1 0.23 -0.25 4.81 4.81 0 0 0 4.38 -4.78\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/commerce/bag","name":"bag","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Shopping-Bag--Streamline-Ultimate\">\n  <desc>\n    Shopping Bag Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M18.9142 6.33594c0.5025 -0.01294 0.9938 0.151 1.3857 0.46679 0.3498 0.28201 0.6003 0.66712 0.7168 1.09766l0.042 0.1875 0.0029 0.02344 1.96 13.63187 0.0059 0.0654c0.016 0.2926 -0.0298 0.5858 -0.1348 0.8594 -0.1051 0.2734 -0.2669 0.5219 -0.4746 0.7285 -0.2079 0.2067 -0.4573 0.3671 -0.7315 0.4707 -0.26 0.0982 -0.537 0.1406 -0.8144 0.1299v0.0009H3.12999v-0.0009c-0.27764 0.0108 -0.5552 -0.0317 -0.81543 -0.1299 -0.27407 -0.1035 -0.52362 -0.2642 -0.73144 -0.4707 -0.20775 -0.2066 -0.36944 -0.4551 -0.47461 -0.7285 -0.10517 -0.2736 -0.151613 -0.5668 -0.135745 -0.8594l0.006836 -0.0654L2.93858 8.11133l0.00391 -0.02344c0.08886 -0.5061 0.35866 -0.96276 0.75879 -1.28516 0.39229 -0.31601 0.88381 -0.48006 1.38672 -0.46679v-0.00196h13.8262zM12.003 0.206055c1.0879 0.003446 2.1412 0.386566 2.9786 1.081055 0.837 0.69444 1.4067 1.65836 1.6113 2.72656 0.1035 0.54222 -0.2518 1.06602 -0.794 1.16992 -0.5422 0.10371 -1.0658 -0.25183 -1.1699 -0.79394 -0.1173 -0.61258 -0.4447 -1.16528 -0.9248 -1.56348 -0.4795 -0.39767 -1.0821 -0.6166 -1.7051 -0.61914 -0.6199 0.00278 -1.2201 0.21964 -1.6982 0.61426 -0.47899 0.39543 -0.80613 0.9452 -0.92579 1.55469 -0.10664 0.54157 -0.63214 0.89433 -1.17383 0.78808 -0.54177 -0.10637 -0.89516 -0.63207 -0.78906 -1.17383 0.20882 -1.06322 0.78059 -2.02116 1.61621 -2.71093C9.86424 0.589538 10.9135 0.209392 11.9972 0.206055l0.0029 0.834965z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/commerce/discount","name":"discount","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Discount--Streamline-Ultimate\">\n  <desc>\n    Discount Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0.5 4.5a4 4 0 1 0 8 0 4 4 0 1 0 -8 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 19.5a4 4 0 1 0 8 0 4 4 0 1 0 -8 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.41 1.59a2 2 0 0 0 -2.82 0l-18 18a2 2 0 0 0 0 2.82 2 2 0 0 0 2.82 0l18 -18a2 2 0 0 0 0 -2.82\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
