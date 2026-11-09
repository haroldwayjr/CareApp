
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

const BATCH = [{"setName":"icon/files/press","name":"press","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Force-Touch-Press--Streamline-Ultimate\">\n  <desc>\n    Force Touch Press Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M11 0c2.2091 0 4 1.79086 4 4v3.77148c-0.1899 -0.16271 -0.3892 -0.31505 -0.5986 -0.4541 -0.4367 -0.28987 -0.9086 -0.51982 -1.4014 -0.68945V4c0 -1.10457 -0.8954 -2 -2 -2H4c-1.10457 0 -2 0.89543 -2 2v16c0 1.1046 0.89543 2 2 2h7c0.1061 0 0.2099 -0.0114 0.3115 -0.0273 0.222 0.5765 0.6046 1.0818 1.1094 1.4492 0.0959 0.0697 0.1967 0.1311 0.2988 0.1894C12.1987 23.8599 11.6158 24 11 24H4c-2.20914 0 -4 -1.7909 -4 -4V4c0 -2.20914 1.79086 -4 4 -4zm-0.0801 10.8027c0.2072 0 0.4124 0.0413 0.6035 0.1211 0.1912 0.0799 0.3652 0.1964 0.5108 0.3438l3.6133 3.6035 1.7236 -1.2285c0.6075 -0.435 1.3501 -0.6407 2.0947 -0.5791s1.443 0.3862 1.9707 0.915L24 16.542V24h-2.1943l-2.6094 -1.9111 -4.7149 0.4414c-0.4189 0.0403 -0.8383 -0.0737 -1.1787 -0.3213 -0.3404 -0.2478 -0.5784 -0.6123 -0.6689 -1.0235 -0.0904 -0.4111 -0.0272 -0.8412 0.1777 -1.2089 0.205 -0.3677 0.5374 -0.6478 0.9346 -0.7871l1.3135 -0.4415 -5.25296 -5.2529c-0.29253 -0.2968 -0.45698 -0.6966 -0.45703 -1.1133 0 -0.4167 0.16446 -0.8174 0.45703 -1.1142 0.14548 -0.1472 0.31886 -0.264 0.50976 -0.3438 0.1911 -0.0798 0.3964 -0.121 0.6035 -0.1211M9.4873 8.04102c0.6753 -0.23078 1.3957 -0.30325 2.1035 -0.21192 0.6194 0.08002 1.2161 0.28346 1.7539 0.59766 0.0766 0.04475 0.1525 0.09143 0.2266 0.14062 0.0369 0.02451 0.0723 0.05164 0.1084 0.07715 -0.036 -0.02542 -0.0716 -0.05175 -0.1084 -0.07617 0.5943 0.39471 1.0903 0.92146 1.4492 1.53804 0.2081 0.358 0.0864 0.8171 -0.2715 1.0254 -0.3578 0.208 -0.817 0.0871 -1.0254 -0.2705 -0.2433 -0.418 -0.5795 -0.7753 -0.9824 -1.04294 -0.403 -0.26753 -0.863 -0.43899 -1.3428 -0.50098 -0.4798 -0.06187 -0.968 -0.01287 -1.42574 0.14356 -0.45771 0.15649 -0.87332 0.41622 -1.21485 0.75876 -0.34162 0.3428 -0.60082 0.7594 -0.75586 1.2178 -0.15495 0.4583 -0.20213 0.9471 -0.13867 1.4268 0.06358 0.4794 0.23709 0.9387 0.50586 1.3408 0.26889 0.4019 0.62717 0.7376 1.0459 0.9795 0.35812 0.2073 0.48133 0.6659 0.27441 1.0244 -0.20711 0.3585 -0.66676 0.4813 -1.02539 0.2744 -0.61779 -0.3569 -1.14537 -0.8522 -1.54199 -1.4453 -0.39653 -0.5932 -0.65239 -1.2702 -0.74609 -1.9776 -0.09359 -0.7074 -0.02348 -1.4275 0.20507 -2.1035 0.22866 -0.6761 0.61039 -1.29035 1.11426 -1.79587 0.50382 -0.50545 1.11671 -0.88925 1.79199 -1.12011\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/postcard","name":"postcard","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Envelope-Postcard--Streamline-Ultimate\">\n  <desc>\n    Envelope Postcard Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M22 7.25H2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2m-1 3.5v4a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.5 -0.5v-4a0.5 0.5 0 0 1 0.5 -0.5h4a0.5 0.5 0 0 1 0.5 0.5M4.5 17h9a0.75 0.75 0 0 1 0 1.5h-9a0.75 0.75 0 0 1 0 -1.5m-0.75 -2.75a0.76 0.76 0 0 1 0.75 -0.75h2a0.75 0.75 0 0 1 0 1.5h-2a0.76 0.76 0 0 1 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.5 5.75h17a1 1 0 0 0 0 -2h-17a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 2.75h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/folder.shared","name":"folder-shared","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Folder-Shared--Streamline-Ultimate\">\n  <desc>\n    Folder Shared Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M2.73362 1.9834c-1.34646 0 -2.434792 1.08833 -2.434792 2.43479V19.5814c0 1.3464 1.088332 2.4348 2.434792 2.4348H21.2664c1.3464 0 2.4348 -1.0884 2.4348 -2.4348V7.78779c0 -1.34647 -1.0884 -2.4348 -2.4348 -2.4348H10.6902l-1.795 -2.39333c-0.46038 -0.62292 -1.19201 -0.97626 -1.94959 -0.97626zm9.26988 11.1632c1.2791 0 2.316 -1.0369 2.316 -2.316 0 -1.27905 -1.0369 -2.31595 -2.316 -2.31595s-2.316 1.0369 -2.316 2.31595c0 1.2791 1.0369 2.316 2.316 2.316m-0.0043 1.3661c1.9287 0 3.6567 1.0704 4.611 2.638 0.3493 0.5739 -0.1267 1.2289 -0.7985 1.2289H8.18669c-0.67186 0 -1.14784 -0.655 -0.7985 -1.2289 0.95422 -1.5676 2.68221 -2.638 4.61101 -2.638\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/commerce/credit.card","name":"credit-card","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Credit-Card--Streamline-Ultimate\">\n  <desc>\n    Credit Card Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M21 0H6a3 3 0 0 0 -3 3v4.5a1 1 0 0 0 1 1 1 1 0 0 0 1 -1v-0.25A0.25 0.25 0 0 1 5.25 7h16.5a0.25 0.25 0 0 1 0.25 0.25V12a1 1 0 0 1 -0.54 0.89 0.92 0.92 0 0 0 -0.46 0.84 1 1 0 0 0 1.45 0.9A3 3 0 0 0 24 12V3a3 3 0 0 0 -3 -3M5.25 4A0.25 0.25 0 0 1 5 3.75V3a1 1 0 0 1 1 -1h15a1 1 0 0 1 1 1v0.75a0.25 0.25 0 0 1 -0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17 10H2a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h15a2 2 0 0 0 2 -2V12a2 2 0 0 0 -2 -2M6 15.5a0.5 0.5 0 0 1 -0.5 0.5h-2a0.5 0.5 0 0 1 -0.5 -0.5v-2a0.5 0.5 0 0 1 0.5 -0.5h2a0.5 0.5 0 0 1 0.5 0.5Zm8.5 5.5a2 2 0 0 1 -1.33 -0.51 0.27 0.27 0 0 0 -0.34 0 2 2 0 0 1 -1.33 0.51 2 2 0 0 1 0 -4 2 2 0 0 1 1.33 0.51 0.26 0.26 0 0 0 0.34 0A2 2 0 0 1 14.5 17a2 2 0 0 1 0 4\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/wallet","name":"wallet","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Money-Wallet--Streamline-Ultimate\">\n  <desc>\n    Money Wallet Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M19.62 18.5a3.75 3.75 0 0 1 0 -7.5h2.26a0.25 0.25 0 0 0 0.24 -0.25v-2.5a2.5 2.5 0 0 0 -2.5 -2.5h-17a2.51 2.51 0 0 0 -2.5 2.5v13a2.51 2.51 0 0 0 2.5 2.5h17a2.5 2.5 0 0 0 2.5 -2.5v-2.5a0.25 0.25 0 0 0 -0.24 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.62 12.5h-3a2.25 2.25 0 0 0 0 4.5h3a1.51 1.51 0 0 0 1.26 -1.5V14a1.51 1.51 0 0 0 -1.26 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.81 1.18a1.21 1.21 0 0 0 -0.56 -0.76 1.24 1.24 0 0 0 -0.94 -0.13L5.44 3.76a0.24 0.24 0 0 0 -0.18 0.24 0.25 0.25 0 0 0 0.24 0.22l14.77 0a0.24 0.24 0 0 0 0.19 -0.1 0.23 0.23 0 0 0 0.05 -0.12Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/coupon","name":"coupon","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Coupon-Cut--Streamline-Ultimate\">\n  <desc>\n    Coupon Cut Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M10.5 17.43H10a1 1 0 0 0 0 2h0.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15 17.43h-1.5a1 1 0 0 0 0 2H15a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 17.43H18a1 1 0 0 0 0 2h1.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 17.43h-0.5a1 1 0 0 0 0 2h0.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.92 15.93a0.25 0.25 0 0 0 0.21 -0.11 0.39 0.39 0 0 0 0.06 -0.11 1 1 0 0 0 -0.57 -1.3l-5.73 -2.19a0.25 0.25 0 0 1 0 -0.46l11.47 -4.48a1 1 0 0 0 0.06 -1.84 11 11 0 0 0 -10.88 0.64 14 14 0 0 0 -3.61 3.43 0.28 0.28 0 0 1 -0.24 0.1 0.27 0.27 0 0 1 -0.2 -0.17 12.53 12.53 0 0 1 -0.75 -4.14 3.87 3.87 0 1 0 -3.87 3.87 3.81 3.81 0 0 0 2 -0.53 0.26 0.26 0 0 1 0.23 0 0.24 0.24 0 0 1 0.14 0.17 17.72 17.72 0 0 0 1.15 3.09 0.22 0.22 0 0 1 0 0.22 15.93 15.93 0 0 0 -1.19 3.09 0.28 0.28 0 0 1 -0.15 0.17 0.25 0.25 0 0 1 -0.22 0 3.87 3.87 0 1 0 1.91 3.32 12.51 12.51 0 0 1 0.75 -4.16 0.27 0.27 0 0 1 0.2 -0.17 0.28 0.28 0 0 1 0.24 0.1 15.42 15.42 0 0 0 1.15 1.39 0.23 0.23 0 0 0 0.18 0.07Zm-14 -8.76A1.87 1.87 0 1 1 5.74 5.3a1.87 1.87 0 0 1 -1.87 1.87Zm0 13.4a1.87 1.87 0 1 1 1.82 -1.87 1.87 1.87 0 0 1 -1.87 1.87Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
