
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

const BATCH = [{"setName":"icon/media/music","name":"music","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Music-Note--Streamline-Ultimate\">\n  <desc>\n    Music Note Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m16.79 4.59 -2.95 1.18a0.24 0.24 0 0 1 -0.23 0 0.24 0.24 0 0 1 -0.11 -0.21V4.44a0.5 0.5 0 0 1 0.31 -0.44l3.9 -1.56a1.24 1.24 0 0 0 0.7 -1.62 1.24 1.24 0 0 0 -1.62 -0.7l-4.38 1.72A2.24 2.24 0 0 0 11 3.93v11.82a0.25 0.25 0 0 1 -0.25 0.25H9.5a4 4 0 0 0 0 8 4.11 4.11 0 0 0 4 -4V8.76a0.25 0.25 0 0 1 0.16 -0.23l4.05 -1.62a1.25 1.25 0 0 0 -0.92 -2.32\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/comms/forward.mail","name":"forward-mail","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Email-Action-Share--Streamline-Ultimate\">\n  <desc>\n    Email Action Share Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M21.1816 11.0205c0.2018 -0.005 0.4045 0.013 0.6045 0.0527 0.5334 0.1061 1.0237 0.3675 1.4082 0.752 0.3846 0.3846 0.6468 0.8748 0.753 1.4082 0.1061 0.5334 0.0518 1.0864 -0.1563 1.5889s-0.5614 0.9322 -1.0137 1.2343c-0.4521 0.3021 -0.9836 0.4629 -1.5273 0.4629 -0.6057 -0.0012 -1.1938 -0.2047 -1.6699 -0.5791l-3.1299 1.8692c0.032 0.1511 0.0485 0.3055 0.0498 0.4599l2.75 1.1006c0.2564 -0.2737 0.5662 -0.492 0.9102 -0.6416 0.3439 -0.1496 0.7147 -0.2275 1.0898 -0.2285 0.5438 0 1.0751 0.1617 1.5273 0.4639 0.4522 0.3021 0.8056 0.7309 1.0137 1.2334 0.2081 0.5023 0.2623 1.0555 0.1563 1.5888 -0.1061 0.5335 -0.3684 1.0236 -0.753 1.4082s-0.8747 0.6469 -1.4082 0.753c-0.5333 0.106 -1.0864 0.0518 -1.5888 -0.1563 -0.5025 -0.2081 -0.9313 -0.5615 -1.2334 -1.0137 -0.3022 -0.4522 -0.4639 -0.9834 -0.4639 -1.5273l-2.75 -1.0996c-0.3119 0.3329 -0.7021 0.5828 -1.1348 0.7275 -0.4327 0.1448 -0.8951 0.1799 -1.3447 0.1016 -0.4493 -0.0784 -0.8723 -0.2674 -1.2305 -0.5498 -0.3583 -0.2826 -0.6403 -0.6504 -0.8212 -1.0693 -0.181 -0.419 -0.2548 -0.8765 -0.2149 -1.3311 0.0399 -0.4544 0.1923 -0.8916 0.4434 -1.2725 0.2511 -0.381 0.593 -0.6943 0.9951 -0.9101 0.4019 -0.2157 0.8514 -0.3283 1.3076 -0.3272 0.6057 0.0013 1.1938 0.2056 1.6699 0.5801l-0.001 -0.001 3.1299 -1.8691c-0.0319 -0.1511 -0.0486 -0.3056 -0.0498 -0.46 0 -0.0652 0.0022 -0.1305 0.0069 -0.1953 -0.0047 0.0648 -0.0059 0.1301 -0.0059 0.1953l0.0078 -0.2031c0.0351 -0.4722 0.1917 -0.9286 0.4561 -1.3242 0.2643 -0.3956 0.6259 -0.7147 1.0488 -0.9277l0.1846 -0.085c0.1754 -0.0727 0.3573 -0.1262 0.542 -0.1611 -0.0412 0.0077 -0.0823 0.0157 -0.1231 0.0254 0.0544 -0.0129 0.1091 -0.0247 0.1641 -0.0342l0.2002 -0.0264zM8.61621 8.10449C9.37125 8.68524 10.2974 8.99995 11.25 9c0.9525 -0.00005 1.8788 -0.31483 2.6338 -0.89551l8.5058 -6.54297c0.0711 0.22068 0.1104 0.45231 0.1104 0.68848v7.46094c-0.1385 -0.04266 -0.2789 -0.08094 -0.4219 -0.10938 -0.824 -0.16375 -1.6788 -0.08025 -2.4551 0.24121 -0.7762 0.32163 -1.4403 0.86683 -1.9072 1.56543 -0.3975 0.5949 -0.6367 1.2795 -0.6992 1.9883l-1.6143 0.9648c-0.518 -0.222 -1.0793 -0.3406 -1.6503 -0.3418 -0.7047 -0.0015 -1.3997 0.1725 -2.0206 0.5059 -0.621 0.3336 -1.1501 0.8167 -1.538 1.4053 -0.1197 0.1816 -0.22258 0.3728 -0.31254 0.5693H2.25c-0.59674 0 -1.16886 -0.2372 -1.59082 -0.6592C0.237223 15.4189 0 14.8467 0 14.25v-12c0 -0.23638 0.0381886 -0.4686 0.109375 -0.68945zm3.53909 7.91891c0.0452 -0.0319 0.0915 -0.0625 0.1386 -0.0918l0.002 -0.0009c-0.0478 0.0295 -0.0948 0.0604 -0.1406 0.0927m7.6904 -4.6191c0.0541 -0.0322 0.1096 -0.0624 0.166 -0.0908 0.0011 -0.0005 0.0019 -0.0015 0.0029 -0.002 -0.0576 0.0287 -0.1137 0.0601 -0.1689 0.0928m0.3516 -0.1748c-0.0486 0.0201 -0.0963 0.0419 -0.1436 0.0644 0.0473 -0.0228 0.0949 -0.0452 0.1436 -0.0654 0.0506 -0.0209 0.1027 -0.0388 0.1543 -0.0566 -0.0518 0.0179 -0.1036 0.0366 -0.1543 0.0576M20.25 0c0.4405 0 0.8673 0.12976 1.2305 0.367188L12.9697 6.91504c-0.4928 0.37915 -1.0979 0.58491 -1.7197 0.58496 -0.6217 -0.00005 -1.2259 -0.20594 -1.71875 -0.58496L1.01855 0.367188C1.38188 0.129475 1.80921 0 2.25 0z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/bookmark","name":"bookmark","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Bookmark-3--Streamline-Ultimate\">\n  <desc>\n    Bookmark 3 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M17.3996 1.42712c1.2142 0 2.15 0.93583 2.15 2.15003V21.1052c0 0.571 -0.2976 1.0547 -0.7616 1.3003 -0.4549 0.2408 -1.0093 0.2218 -1.4743 -0.0572 -0.0153 -0.0092 -0.0303 -0.019 -0.0449 -0.0292l-5.2692 -3.6977 -5.26917 3.6977c-0.01463 0.0102 -0.02962 0.02 -0.04495 0.0292 -0.47898 0.2874 -1.04541 0.2849 -1.49442 0.0722 -0.46239 -0.219 -0.84145 -0.6866 -0.84145 -1.3153V3.57715c0 -1.2142 0.93577 -2.15003 2.15 -2.15003z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
