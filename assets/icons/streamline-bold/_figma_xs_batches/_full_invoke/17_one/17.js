
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
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
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
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch(__){} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}
const BATCH = [{"setName": "icon/misc/bike", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Bicycle--Streamline-Ultimate\">\n  <desc>\n    Bicycle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M18.2393 4.42879c0.1344 0.53569 -0.1909 1.07889 -0.7266 1.21327l-0.8808 0.22094 1.703 4.6774c0.2312 -0.0333 0.4676 -0.0506 0.708 -0.0506 2.7165 0 4.9188 2.2023 4.9188 4.9189s-2.2023 4.9188 -4.9188 4.9188c-2.7166 0 -4.9189 -2.2022 -4.9189 -4.9188 0 -1.7674 0.9321 -3.317 2.3315 -4.1842l-0.4116 -1.1307 -3.8811 5.8675c-0.1852 0.28 -0.4984 0.4484 -0.8341 0.4484H9.77382c-0.46238 2.2366 -2.4433 3.9178 -4.8169 3.9178 -2.7166 0 -4.9188341 -2.2022 -4.9188341 -4.9188S2.24032 10.4898 4.95692 10.4898c0.66784 0 1.3046 0.1331 1.88519 0.3742l0.8489 -1.03703 -0.92955 -1.7114h-0.68871c-0.55228 0 -1 -0.44771 -1 -1 0 -0.55228 0.44772 -1 1 -1h2.93913c0.55228 0 1.00002 0.44772 1.00002 1 0 0.5438 -0.43408 0.98622 -0.97464 0.99969l0.3538 0.65139 5.61084 -1.53478 -0.4418 -1.21355 -0.0005 -0.00117c-0.0715 -0.19581 -0.1012 -0.40447 -0.087 -0.6125 0.0142 -0.20843 0.0721 -0.41155 0.1698 -0.59615 0.0978 -0.18462 0.2333 -0.3466 0.3978 -0.47543 0.1644 -0.12877 0.3539 -0.22155 0.5565 -0.27233l0.0003 -0.00009 1.4291 -0.35848c0.5356 -0.13439 1.0788 0.19094 1.2132 0.72662m-0.1358 11.32201 -0.9383 -2.577c-0.6366 0.5355 -1.0412 1.3379 -1.0412 2.2349 0 1.612 1.3068 2.9188 2.9189 2.9188 1.612 0 2.9188 -1.3068 2.9188 -2.9188 0 -1.6115 -1.3059 -2.9179 -2.9171 -2.9189l0.9382 2.5768c0.1889 0.519 -0.0786 1.0928 -0.5975 1.2818 -0.519 0.1889 -1.0929 -0.0786 -1.2818 -0.5976m-8.32927 -1.3411h1.01697l3.192 -4.8257 -4.52098 1.2367 -0.96245 1.1758c0.63193 0.6559 1.08339 1.487 1.27446 2.4132m-2.55637 -0.8472c0.20518 0.251 0.3694 0.5368 0.48245 0.8472H6.52445zm-1.7439 -1.027 -1.15305 1.4086c-0.34676 0.3994 -0.49295 0.9742 -0.29892 1.5118 0.22186 0.6148 0.79859 0.9538 1.42569 0.9538h2.2519c-0.4085 1.119 -1.48229 1.9178 -2.74266 1.9178 -1.61203 0 -2.91883 -1.3068 -2.91883 -2.9188 0 -1.6121 1.3068 -2.9189 2.91883 -2.9189 0.17644 0 0.34922 0.0157 0.51704 0.0457\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
