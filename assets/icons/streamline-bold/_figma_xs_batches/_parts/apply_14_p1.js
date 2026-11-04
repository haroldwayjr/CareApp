
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

const BATCH = [{"setName":"icon/misc/wind","name":"wind","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wind-West--Streamline-Ultimate\">\n  <desc>\n    Wind West Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m9.33 10.47 8.5 3a0.51 0.51 0 0 0 0.17 0 0.52 0.52 0 0 0 0.38 -0.17 0.5 0.5 0 0 0 0.07 -0.55l-1.34 -2.67a0.28 0.28 0 0 1 0 -0.22l1.34 -2.67a0.5 0.5 0 0 0 -0.07 -0.55 0.52 0.52 0 0 0 -0.55 -0.14l-8.5 3a0.5 0.5 0 0 0 0 0.94Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 10a10 10 0 1 0 -19 4.36 0.24 0.24 0 0 0 0.23 0.14h1.53a0.27 0.27 0 0 0 0.24 -0.08 0.26 0.26 0 0 0 0 -0.19A1.77 1.77 0 0 1 7 14v-0.06a0.31 0.31 0 0 0 0 -0.13A7.9 7.9 0 0 1 6 10a8 8 0 1 1 8 8 0.18 0.18 0 0 0 -0.16 0.11 0.17 0.17 0 0 0 0.06 0.19 3.9 3.9 0 0 1 1.2 1.47 0.26 0.26 0 0 0 0.26 0.14A10 10 0 0 0 24 10\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 19H1a1 1 0 0 0 0 2h10.5a0.5 0.5 0 0 1 0 1 1 1 0 0 0 0 2 2.5 2.5 0 0 0 0 -5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 18h8.5a2.5 2.5 0 0 0 0 -5 1 1 0 0 0 0 2 0.5 0.5 0 0 1 0 1H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/food","name":"food","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Food-Delivery-Bag--Streamline-Ultimate\">\n  <desc>\n    Food Delivery Bag Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M21 7.64a1.55 1.55 0 0 0 -1.55 -1.46h-2v-1A5.2 5.2 0 0 0 7 5.2c0 4.09 0 3.91 0.14 4.17a0.75 0.75 0 0 1 -1.36 -0.43V6.18h-1.2A1.56 1.56 0 0 0 3 7.64c-1 13.92 -0.93 13.15 -0.93 13.88A2.48 2.48 0 0 0 4.58 24h14.84a2.48 2.48 0 0 0 2.48 -2.48c0 -0.71 0.04 0.11 -0.9 -13.88m-6.28 -1.46H8.53v-1a3.71 3.71 0 0 1 7.41 0c0 4.1 0 3.91 0.14 4.17a0.75 0.75 0 0 1 -1.36 -0.43Zm-1.05 5.21a0.5 0.5 0 0 1 0.66 -0.23 6.58 6.58 0 0 1 3 5.95 0.5 0.5 0 0 1 -0.5 0.5h-2.21v2.78a0.5 0.5 0 0 1 -0.5 0.5 0.51 0.51 0 0 1 -0.5 -0.5c0 -9.3 -0.02 -8.85 0.05 -9m-6.57 0.11a0.5 0.5 0 0 1 1 0v3.13c0 0.3 0.35 0.63 0.9 0.76V11.5a0.5 0.5 0 0 1 0.5 -0.5 0.5 0.5 0 0 1 0.5 0.5v3.89c0.55 -0.13 0.91 -0.46 0.91 -0.76V11.5a0.5 0.5 0 0 1 0.5 -0.5 0.5 0.5 0 0 1 0.5 0.5v3.13A2 2 0 0 1 10 16.41v4a0.5 0.5 0 0 1 -0.5 0.5 0.51 0.51 0 0 1 -0.5 -0.5v-4a2 2 0 0 1 -1.9 -1.78Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/bike","name":"bike","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Bicycle--Streamline-Ultimate\">\n  <desc>\n    Bicycle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M18.2393 4.42879c0.1344 0.53569 -0.1909 1.07889 -0.7266 1.21327l-0.8808 0.22094 1.703 4.6774c0.2312 -0.0333 0.4676 -0.0506 0.708 -0.0506 2.7165 0 4.9188 2.2023 4.9188 4.9189s-2.2023 4.9188 -4.9188 4.9188c-2.7166 0 -4.9189 -2.2022 -4.9189 -4.9188 0 -1.7674 0.9321 -3.317 2.3315 -4.1842l-0.4116 -1.1307 -3.8811 5.8675c-0.1852 0.28 -0.4984 0.4484 -0.8341 0.4484H9.77382c-0.46238 2.2366 -2.4433 3.9178 -4.8169 3.9178 -2.7166 0 -4.9188341 -2.2022 -4.9188341 -4.9188S2.24032 10.4898 4.95692 10.4898c0.66784 0 1.3046 0.1331 1.88519 0.3742l0.8489 -1.03703 -0.92955 -1.7114h-0.68871c-0.55228 0 -1 -0.44771 -1 -1 0 -0.55228 0.44772 -1 1 -1h2.93913c0.55228 0 1.00002 0.44772 1.00002 1 0 0.5438 -0.43408 0.98622 -0.97464 0.99969l0.3538 0.65139 5.61084 -1.53478 -0.4418 -1.21355 -0.0005 -0.00117c-0.0715 -0.19581 -0.1012 -0.40447 -0.087 -0.6125 0.0142 -0.20843 0.0721 -0.41155 0.1698 -0.59615 0.0978 -0.18462 0.2333 -0.3466 0.3978 -0.47543 0.1644 -0.12877 0.3539 -0.22155 0.5565 -0.27233l0.0003 -0.00009 1.4291 -0.35848c0.5356 -0.13439 1.0788 0.19094 1.2132 0.72662m-0.1358 11.32201 -0.9383 -2.577c-0.6366 0.5355 -1.0412 1.3379 -1.0412 2.2349 0 1.612 1.3068 2.9188 2.9189 2.9188 1.612 0 2.9188 -1.3068 2.9188 -2.9188 0 -1.6115 -1.3059 -2.9179 -2.9171 -2.9189l0.9382 2.5768c0.1889 0.519 -0.0786 1.0928 -0.5975 1.2818 -0.519 0.1889 -1.0929 -0.0786 -1.2818 -0.5976m-8.32927 -1.3411h1.01697l3.192 -4.8257 -4.52098 1.2367 -0.96245 1.1758c0.63193 0.6559 1.08339 1.487 1.27446 2.4132m-2.55637 -0.8472c0.20518 0.251 0.3694 0.5368 0.48245 0.8472H6.52445zm-1.7439 -1.027 -1.15305 1.4086c-0.34676 0.3994 -0.49295 0.9742 -0.29892 1.5118 0.22186 0.6148 0.79859 0.9538 1.42569 0.9538h2.2519c-0.4085 1.119 -1.48229 1.9178 -2.74266 1.9178 -1.61203 0 -2.91883 -1.3068 -2.91883 -2.9188 0 -1.6121 1.3068 -2.9189 2.91883 -2.9189 0.17644 0 0.34922 0.0157 0.51704 0.0457\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/office","name":"office","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Office-File-Text--Streamline-Ultimate\">\n  <desc>\n    Office File Text Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zM5.90723 18.6953c-0.41422 0 -0.75 0.3358 -0.75 0.75 0.00006 0.4142 0.33582 0.75 0.75 0.75H18.0938c0.4139 -0.0003 0.7499 -0.336 0.75 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm0 -3.5713c-0.41422 0 -0.75 0.3358 -0.75 0.75 0.00026 0.414 0.33595 0.75 0.75 0.75H18.0938c0.4138 -0.0002 0.7497 -0.3362 0.75 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm8.82417 -3.5722c-0.4141 0 -0.7499 0.3358 -0.75 0.75 0 0.4142 0.3358 0.75 0.75 0.75h3.3614c0.4142 -0.0001 0.75 -0.3358 0.75 -0.75 -0.0001 -0.4142 -0.3359 -0.75 -0.75 -0.75zM5.90723 4.3584c-0.4141 0 -0.74981 0.33595 -0.75 0.75v0.92187c0.0001 0.41413 0.33585 0.75 0.75 0.75s0.74989 -0.33587 0.75 -0.75V5.8584h1.26465v4.9521H6.8291c-0.41421 0 -0.75 0.3358 -0.75 0.75 0 0.4143 0.33579 0.75 0.75 0.75h3.6865c0.4142 0 0.75 -0.3357 0.75 -0.75 0 -0.4142 -0.3358 -0.75 -0.75 -0.75H9.42188V5.8584h1.26562v0.17187c0.0001 0.41413 0.3359 0.75 0.75 0.75 0.4141 -0.00009 0.7499 -0.33593 0.75 -0.75V5.1084c-0.0002 -0.41399 -0.336 -0.74991 -0.75 -0.75zM15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/graduation","name":"graduation","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Graduation-Hat--Streamline-Ultimate\">\n  <desc>\n    Graduation Hat Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23.325 7.258a0.654 0.654 0 0 1 0 1.214l-10.762 4.34c-0.422 0.17 -0.894 0.169 -1.314 -0.003L3.26 9.539l0 7.901a2.128 2.128 0 0 1 1.262 1.95v3.452a0.5 0.5 0 0 1 -0.5 0.5H0.753a0.5 0.5 0 0 1 -0.5 -0.5V19.39c0 -0.873 0.517 -1.62 1.263 -1.951l0 -8.615 -0.867 -0.354a0.655 0.655 0 0 1 0 -1.212l10.6 -4.338c0.42 -0.172 0.892 -0.173 1.314 -0.003l10.762 4.34Zm-10.273 6.768 5.85 -2.359v3.837a0.795 0.795 0 0 1 -0.344 0.668c-0.888 0.596 -3.417 2.074 -6.65 2.074 -3.234 0 -5.647 -1.48 -6.486 -2.074a0.787 0.787 0 0 1 -0.323 -0.65v-3.816l5.654 2.314a3.055 3.055 0 0 0 2.3 0.006Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/ticket","name":"ticket","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Ticket--Streamline-Ultimate\">\n  <desc>\n    Ticket Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.5 9.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 12.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.16 9.52a1 1 0 0 0 0.84 -1V5a1 1 0 0 0 -1 -1h-3.75a0.5 0.5 0 0 0 -0.5 0.5V6a0.75 0.75 0 0 1 -1.5 0V4.5a0.5 0.5 0 0 0 -0.5 -0.5H1a1 1 0 0 0 -1 1v3.54a1 1 0 0 0 0.86 1 2.5 2.5 0 0 1 0 4.94 1 1 0 0 0 -0.86 1V19a1 1 0 0 0 1 1h15.75a0.5 0.5 0 0 0 0.5 -0.5V18a0.75 0.75 0 0 1 1.5 0v1.5a0.5 0.5 0 0 0 0.5 0.5H23a1 1 0 0 0 1 -1v-3.53a1 1 0 0 0 -0.84 -1 2.5 2.5 0 0 1 0 -5ZM14.5 16a0.5 0.5 0 0 1 -0.5 0.5H6a0.5 0.5 0 0 1 -0.5 -0.5V8a0.5 0.5 0 0 1 0.5 -0.5h8a0.5 0.5 0 0 1 0.5 0.5Zm4.25 -2.5a0.75 0.75 0 0 1 -1.5 0v-3a0.75 0.75 0 0 1 1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/droplet","name":"droplet","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Drop-Shape--Streamline-Ultimate\">\n  <desc>\n    Drop Shape Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23 0.25 12 0.250164C5.51065 0.250164 0.25 5.51082 0.25 12.0002c0 6.4893 5.26065 11.75 11.75 11.75 6.4893 0 11.75 -5.2607 11.75 -11.75V1c0 -0.198914 -0.079 -0.389681 -0.2197 -0.530334C23.3897 0.329013 23.1989 0.249997 23 0.25\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_14_p1' };
