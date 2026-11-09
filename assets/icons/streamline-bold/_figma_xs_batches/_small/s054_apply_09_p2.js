
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

const BATCH = [{"setName":"icon/actions/cancel","name":"cancel","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Lock-Cancel-Slash--Streamline-Ultimate\">\n  <desc>\n    Lock Cancel Slash Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M16.15 5.93115c0 -2.0477 -1.6523 -3.69995 -3.7 -3.69995 -2.0478 0 -3.70005 1.65225 -3.70005 3.69995v1.92312H16.15zm2 1.92312V5.93115c0 -3.1523 -2.5478 -5.699949 -5.7 -5.699949 -3.15232 0 -5.70005 2.547649 -5.70005 5.699949v1.92312H6.6123L1.89232 3.87511c-0.42225 -0.35598 -1.053134 -0.30225 -1.409114 0.12 -0.355978 0.42226 -0.302252 1.05314 0.120001 1.40912l0.472623 0.39844c0.02362 0.01571 0.0466 0.03292 0.06881 0.05165L22.1867 23.5938c0.4188 0.2878 0.9957 0.2163 1.3301 -0.1803 0.356 -0.4223 0.3023 -1.0531 -0.12 -1.4091l-2.9252 -2.4661c0.0186 -0.109 0.0283 -0.2206 0.0283 -0.3341l0 -9.29988c0 -1.11418 -0.9357 -2.05005 -2.05 -2.05005zM17.0845 21.2543 4.3999 10.5606l0.00005 8.6436c0 1.1142 0.93575 2.0501 2.05 2.0501z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/discover","name":"discover","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Discover-Pay--Streamline-Ultimate\">\n  <desc>\n    Discover Pay Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M9.64755 10.8832c-0.61678 0 -1.11679 0.5 -1.11679 1.1168s0.50001 1.1168 1.11679 1.1168c0.18405 0 0.35635 -0.0441 0.50825 -0.122 0.2457 -0.1259 0.5471 -0.0287 0.673 0.217 0.1259 0.2458 0.0287 0.5471 -0.217 0.673 -0.2898 0.1485 -0.61798 0.232 -0.96425 0.232 -1.16907 0 -2.11679 -0.9477 -2.11679 -2.1168s0.94772 -2.11679 2.11679 -2.11679c0.34627 0 0.67445 0.08353 0.96425 0.23199 0.2457 0.1259 0.3429 0.4272 0.217 0.673 -0.1259 0.2457 -0.4273 0.3429 -0.673 0.217 -0.1519 -0.0779 -0.3242 -0.122 -0.50825 -0.122m-2.50552 -0.6602c-0.31885 -0.25054 -0.76075 -0.37061 -1.16386 -0.33298 -0.41584 0.03881 -0.8869 0.26458 -1.06312 0.80258 -0.06884 0.2101 -0.09613 0.4225 -0.06038 0.6316 0.03652 0.2136 0.13274 0.3879 0.25488 0.5269 0.20969 0.2386 0.51797 0.389 0.72937 0.4922l0.02774 0.0135c0.25635 0.1255 0.44203 0.225 0.54601 0.3356 0.04235 0.0451 0.04862 0.0698 0.05002 0.0773l0.00003 0.0002c0.00093 0.0049 0.00779 0.0412 -0.03239 0.1275 -0.07247 0.1556 -0.19222 0.2187 -0.36853 0.2194 -0.20651 0.0008 -0.4018 -0.0925 -0.47949 -0.1702 -0.19526 -0.1952 -0.51184 -0.1952 -0.7071 0 -0.19527 0.1953 -0.19527 0.5119 0 0.7071 0.28557 0.2856 0.74615 0.4648 1.19047 0.4631 0.47452 -0.0019 1.00056 -0.2162 1.27115 -0.7972 0.11161 -0.2397 0.15481 -0.488 0.10879 -0.7339 -0.04542 -0.2427 -0.16854 -0.4337 -0.30425 -0.5781 -0.24471 -0.2604 -0.59582 -0.432 -0.81549 -0.5394l-0.01967 -0.0096c-0.12156 -0.0595 -0.21722 -0.1071 -0.29856 -0.1562 -0.08094 -0.0488 -0.12423 -0.0856 -0.14697 -0.1115 -0.01774 -0.0202 -0.01923 -0.0289 -0.02031 -0.0352 -0.00185 -0.0108 -0.00665 -0.0552 0.02499 -0.1518 0.0155 -0.0473 0.054 -0.104 0.20574 -0.1182 0.16447 -0.0154 0.34817 0.0412 0.45311 0.1236 0.21714 0.1706 0.53146 0.1329 0.70207 -0.0842 0.17061 -0.2172 0.13289 -0.5315 -0.08425 -0.7021m-7.0990612 0.2164c0 -0.2761 0.2238572 -0.49997 0.5000002 -0.49997h0.950091c1.01055 0 1.91784 0.88357 1.91784 2.04937 0 0.6013 -0.25795 1.1119 -0.61419 1.4681 -0.34889 0.3489 -0.82488 0.5813 -1.30365 0.5813H0.542969c-0.276143 0 -0.5000002 -0.2239 -0.5000002 -0.5zm1.0000012 0.5v2.0988h0.45009c0.16437 0 0.39729 -0.0892 0.59654 -0.2884 0.19189 -0.1919 0.3213 -0.456 0.3213 -0.761 0 -0.6466 -0.4921 -1.0494 -0.91784 -1.0494zm3.00976 -0.99997c0.27615 0 0.5 0.22387 0.5 0.49997v3.0988c0 0.2761 -0.22385 0.5 -0.5 0.5 -0.27614 0 -0.5 -0.2239 -0.5 -0.5l0 -3.0988c0 -0.2761 0.22386 -0.49997 0.5 -0.49997M10.8464 12c0 -1.1067 0.8972 -2.00391 2.0039 -2.00391 1.1068 0 2.0039 0.89721 2.0039 2.00391s-0.8971 2.0039 -2.0039 2.0039c-1.1067 0 -2.0039 -0.8972 -2.0039 -2.0039m4.8271 -1.7551c-0.1074 -0.2544 -0.4008 -0.37352 -0.6551 -0.26608 -0.2544 0.10748 -0.3736 0.40078 -0.2661 0.65518l1.342 3.1773c0.0776 0.1838 0.2571 0.3039 0.4566 0.3055 0.1996 0.0015 0.3809 -0.1157 0.4615 -0.2983l1.4012 -3.1773c0.1114 -0.2527 -0.0031 -0.5478 -0.2558 -0.65926 -0.2526 -0.11143 -0.5478 0.00307 -0.6592 0.25576l-0.9338 2.1175zm2.9298 0.1945c0 -0.2761 0.2238 -0.49997 0.5 -0.49997h1.4918c0.2761 0 0.5 0.22387 0.5 0.49997 0 0.2762 -0.2239 0.5 -0.5 0.5h-0.9918v0.5887h0.9468c0.2762 0 0.5 0.2239 0.5 0.5s-0.2238 0.5 -0.5 0.5h-0.9468v0.5887h0.9918c0.2761 0 0.5 0.2238 0.5 0.5 0 0.2761 -0.2239 0.5 -0.5 0.5h-1.4918c-0.2762 0 -0.5 -0.2239 -0.5 -0.5zm3.1391 -0.49997c-0.2761 0 -0.5 0.22387 -0.5 0.49997v3.1774c0 0.2761 0.2239 0.5 0.5 0.5 0.2762 0 0.5 -0.2239 0.5 -0.5v-0.7385l0.7527 1.0329c0.1626 0.2232 0.4754 0.2723 0.6986 0.1097 0.2231 -0.1626 0.2722 -0.4754 0.1096 -0.6986l-0.6168 -0.8464c0.1235 -0.0593 0.2356 -0.1334 0.3349 -0.2221 0.2973 -0.2656 0.4355 -0.6241 0.4355 -0.9769 0 -0.3466 -0.1287 -0.703 -0.4353 -0.9649 -0.2987 -0.2551 -0.7097 -0.37257 -1.1891 -0.37257zm0.5 0.99997v0.7135h0.0901c0.3 0 0.4521 -0.0818 0.5227 -0.1449 0.0692 -0.0618 0.1017 -0.1413 0.1017 -0.2311 0 -0.0959 -0.0306 -0.1582 -0.0848 -0.2045 -0.062 -0.053 -0.2133 -0.133 -0.5396 -0.133z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
