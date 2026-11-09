
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

const BATCH = [{"setName":"icon/health/symptoms","name":"symptoms","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Smiley-Fever--Streamline-Ultimate\">\n  <desc>\n    Smiley Fever Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15.41 16.71a0.26 0.26 0 0 0 0.31 0l3.57 -2.37a0.25 0.25 0 0 0 0.07 -0.34l-0.56 -0.86a0.26 0.26 0 0 0 -0.35 -0.08l-3.91 2.53a0.24 0.24 0 0 0 -0.11 0.21 0.26 0.26 0 0 0 0.11 0.21 6.29 6.29 0 0 1 0.87 0.7\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5.36 6.45a2.69 2.69 0 0 0 -2.11 -1 1 1 0 0 1 0 -2c1.15 0 3.14 0.55 3.89 2.05a1 1 0 0 1 -0.44 1.34 0.93 0.93 0 0 1 -0.45 0.11 1 1 0 0 1 -0.89 -0.5m0.14 3.05A1.5 1.5 0 1 1 16 8a1.5 1.5 0 0 1 1.5 1.5m-9.25 -6a1 1 0 0 1 0 2 2.69 2.69 0 0 0 -2.11 1 1 1 0 0 1 -0.89 0.5 0.93 0.93 0 0 1 -0.45 -0.11 1 1 0 0 1 -0.44 -1.34C5.11 4.05 7.1 3.5 8.25 3.5m1.25 6A1.5 1.5 0 1 1 8 8a1.5 1.5 0 0 1 1.5 1.5M22 14.39l-5.32 3.52a0.25 0.25 0 0 0 -0.1 0.28 1 1 0 0 1 -0.4 1.14 1 1 0 0 1 -1.41 -0.33 4.49 4.49 0 0 0 -6.61 -1 1 1 0 0 1 -1.27 -1.55A6.55 6.55 0 0 1 11 15a6.34 6.34 0 0 1 1.38 0.15 0.25 0.25 0 0 0 0.19 0l7 -4.49A2.25 2.25 0 0 1 22 14.39\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/insurance","name":"insurance","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Insurance-Hand--Streamline-Ultimate\">\n  <desc>\n    Insurance Hand Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 6.12A1.12 1.12 0 0 0 22.88 5H19.5a0.5 0.5 0 0 1 -0.5 -0.5V1.12A1.12 1.12 0 0 0 17.88 0h-3.76A1.12 1.12 0 0 0 13 1.12V4.5a0.5 0.5 0 0 1 -0.5 0.5H9.12A1.12 1.12 0 0 0 8 6.12v3.76A1.12 1.12 0 0 0 9.12 11h3.38a0.5 0.5 0 0 1 0.5 0.5v3.38A1.12 1.12 0 0 0 14.12 16h3.76A1.12 1.12 0 0 0 19 14.88V11.5a0.5 0.5 0 0 1 0.5 -0.5h3.38A1.12 1.12 0 0 0 24 9.88Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 14.75a1 1 0 0 0 -1 1V23a1 1 0 0 0 2 0v-7.25a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 19.5H6.38a0.63 0.63 0 1 1 0 -1.25H8.9a1 1 0 0 0 0.92 -1.39 2.23 2.23 0 0 0 -2.06 -1.36H3.5a0.5 0.5 0 0 0 -0.5 0.5v6.5a0.5 0.5 0 0 0 0.5 0.5h10.76a2.24 2.24 0 0 0 2.24 -2.24v-0.26a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/sleep","name":"sleep","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sleep-Zzz--Streamline-Ultimate\">\n  <desc>\n    Sleep Zzz Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M11.6831 7.79864c0.165 0.35047 0.5175 0.57417 0.9048 0.57417h5.2707c0.5522 0 1 -0.44772 1 -1 0 -0.55229 -0.4478 -1 -1 -1h-3.1459l3.9164 -4.73549c0.2469 -0.29848 0.2992 -0.712688 0.1342 -1.063158C18.5984 0.223692 18.2459 0 17.8585 0h-5.2706c-0.5523 0 -1 0.447715 -1 1 0 0.55228 0.4477 1 1 1h3.1459l-3.9165 4.73548c-0.2469 0.29849 -0.2991 0.71269 -0.1342 1.06316M0.108384 16.3442c0.164947 0.3505 0.517454 0.5742 0.904796 0.5742h7.0678c0.55229 0 1 -0.4477 1 -1s-0.44771 -1 -1 -1H3.13793l5.71365 -6.90843c0.24686 -0.29849 0.29915 -0.71269 0.1342 -1.06316 -0.16494 -0.35047 -0.51745 -0.57416 -0.9048 -0.57416h-7.0678c-0.552281 0 -0.9999964 0.44771 -0.9999964 1 0 0.55228 0.4477154 1 0.9999964 1h4.94305L0.242587 15.2811c-0.24686411 0.2985 -0.2991493 0.7127 -0.134203 1.0631M14.2974 24.0001c-0.3874 0 -0.7399 -0.2237 -0.9048 -0.5742 -0.165 -0.3505 -0.1127 -0.7647 0.1342 -1.0631l7.0222 -8.4907h-6.2516c-0.5523 0 -1 -0.4477 -1 -1s0.4477 -1 1 -1h8.3763c0.3874 0 0.7399 0.2237 0.9048 0.5742 0.165 0.3504 0.1127 0.7646 -0.1342 1.0631l-7.0222 8.4907h6.2516c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/dosage","name":"dosage","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Medicine-Dosage--Streamline-Ultimate\">\n  <desc>\n    Medicine Dosage Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M5.532 1.08a1 1 0 0 0 -2 0.016l0.018 2.278 -2.303 0a1 1 0 0 0 0 2h2.318l0.018 2.293a1 1 0 0 0 2 -0.015l-0.018 -2.278h2.253a1 1 0 1 0 0 -2l-2.268 0 -0.018 -2.293Zm3.286 10.38a1 1 0 0 1 -1 1l-6.571 0a1 1 0 1 1 0 -2l6.571 0a1 1 0 0 1 1 1m5.517 2.315 4.323 4.322 -2.984 2.984a3.058 3.058 0 0 1 -4.351 -4.294zm4.6 -5.265a5.058 5.058 0 0 0 -3.565 1.402l-5.474 5.473a5.058 5.058 0 0 0 7.168 7.134l0.016 -0.015 3.682 -3.682a0.962 0.962 0 0 0 0.017 -0.017l1.742 -1.742 0.013 -0.013 0.007 -0.007a5.058 5.058 0 0 0 -3.605 -8.533Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/pharmacy.alt","name":"pharmacy-alt","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M17.3845 12.082c1.5133 -1.5132 3.9672 -1.5132 5.4805 0 1.513 1.5133 1.5132 3.9673 0 5.4805l-5.3037 5.3027c-1.5132 1.5131 -3.9663 1.513 -5.4795 0 -1.5133 -1.5132 -1.5132 -3.9662 0 -5.4795zm-1.0908 -5.21384c0.1107 -0.11598 0.3014 -0.1159 0.4121 0 0.6676 0.69925 1.6238 1.13178 2.669 1.13184 0.2724 0 0.5392 -0.03054 0.7959 -0.08691 0.1649 -0.03596 0.3291 0.08507 0.3291 0.2539v1.02637c-0.0003 0.14471 -0.1229 0.25875 -0.2676 0.25586 -1.4111 -0.02819 -2.8313 0.49536 -3.9082 1.57228l-5.3037 5.3027c-1.1374 1.1375 -1.65706 2.6582 -1.56156 4.1465 0.00939 0.149 -0.10561 0.2791 -0.25488 0.2793h-6.4541C1.78344 20.7499 0.999892 19.9663 0.999756 19V8.16699c0.000006 -0.16876 0.164274 -0.28971 0.329104 -0.2539 0.25669 0.05639 0.52344 0.08689 0.7959 0.08691 1.04521 0 2.00136 -0.4326 2.66894 -1.13184 0.1107 -0.11598 0.30136 -0.1159 0.41211 0C5.87335 7.56741 6.82957 7.99994 7.87476 8c1.04521 0 2.00136 -0.4326 2.66894 -1.13184 0.1107 -0.11598 0.3014 -0.1159 0.4121 0 0.6676 0.69925 1.6238 1.13178 2.669 1.13184 1.0452 0 2.0013 -0.4326 2.6689 -1.13184m5.1572 6.62794c-0.7321 -0.7321 -1.9191 -0.7319 -2.6513 0l-2.4746 2.4746c-0.0977 0.0976 -0.0976 0.2559 0 0.3535l2.2978 2.2988c0.096 0.0956 0.2498 0.0965 0.3477 0.004l2.4804 -2.4795c0.7319 -0.7322 0.7319 -1.9193 0 -2.6514M19.5134 0c0.1021 0.000109171 0.1945 0.062393 0.2324 0.157227l1.6758 4.193363c0.0498 0.12455 0.0778 0.25858 0.0606 0.3916 -0.1257 0.96676 -0.9931 1.75751 -2.1065 1.75781 -1.2053 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.336 -0.74966 -0.75 -0.75 -0.4142 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.9199 1.99968 -2.125 2 -1.2053 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.336 -0.74966 -0.75 -0.75 -0.4142 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.9199 1.99968 -2.12497 2 -1.20537 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.33607 -0.74966 -0.75 -0.75 -0.41421 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.91993 1.99968 -2.125 2C1.0121 6.5 0.143958 5.70915 0.0183105 4.74219c-0.01724928 -0.13297 0.0108045 -0.2671 0.0605469 -0.3916L1.75562 0.157227C1.7936 0.0624838 1.88499 0.0000865802 1.98706 0z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/otc","name":"otc","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Medicine-Liquid-Cup--Streamline-Ultimate\">\n  <desc>\n    Medicine Liquid Cup Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0.866215 0.135864c-0.215123 0 -0.419889 0.092375 -0.562259 0.253648C0.161587 0.550786 0.095324 0.765428 0.122007 0.97889l0.357344 2.85876H5.67275c0.41421 0 0.75 0.33578 0.75 0.75 0 0.41421 -0.33579 0.75 -0.75 0.75H0.666851L1.09617 8.7722c0.04556 -0.00864 0.09257 -0.01317 0.14065 -0.01317h4.43546c0.41421 0 0.75 0.33579 0.75 0.75 0 0.41422 -0.33579 0.74997 -0.75 0.74997H1.28202l0.41199 3.2959c0.04691 0.3753 0.36597 0.657 0.74421 0.657h5.68453c0.05036 -0.0575 0.10173 -0.1142 0.1541 -0.1702 0.0227 -0.0242 0.04579 -0.0481 0.06928 -0.0716l5.12007 -5.12011L14.6034 0.993301c0.0312 -0.215416 -0.0328 -0.433751 -0.1752 -0.598315 -0.1425 -0.164564 -0.3494 -0.259122 -0.5671 -0.259122zM14.1995 13.7736l4.3227 4.3226 -2.9841 2.9841c-0.5746 0.5464 -1.339 0.8483 -2.1321 0.8419 -0.7965 -0.0064 -1.559 -0.3234 -2.1254 -0.8834s-0.892 -1.3189 -0.9075 -2.1152c-0.0154 -0.7912 0.2766 -1.5574 0.814 -2.1376zM18.8 8.50917c-1.3168 -0.01851 -2.5889 0.47723 -3.5459 1.38187 -0.0046 0.00438 -0.0092 0.00881 -0.0137 0.01328 -0.0022 0.0021 -0.0043 0.00421 -0.0064 0.00632L9.76034 15.3843c-0.00782 0.0078 -0.01552 0.0158 -0.02309 0.0239 -0.90009 0.962 -1.38936 2.2371 -1.36373 3.5543 0.02562 1.3171 0.56411 2.5723 1.50093 3.4986 0.93685 0.9262 2.19805 1.4504 3.51535 1.461 1.3174 0.0107 2.5869 -0.493 3.5386 -1.404l0.0156 -0.0153 3.682 -3.682c0.006 -0.0057 0.0119 -0.0114 0.0177 -0.0172l1.7414 -1.7415 0.0133 -0.0135 0.0063 -0.0067c0.9047 -0.957 1.4004 -2.229 1.3819 -3.5458 -0.0039 -0.2752 -0.0301 -0.5479 -0.0778 -0.8155 -0.1803 -1.0129 -0.6666 -1.9538 -1.4033 -2.69042 -0.9312 -0.93119 -2.1888 -1.4625 -3.5055 -1.48101\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
