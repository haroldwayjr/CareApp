
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
function bindStrokes(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'LINE') {
      const hasStroke = Array.isArray(n.strokes) && n.strokes.length > 0;
      const hasFill = Array.isArray(n.fills) && n.fills.some(f => f.type === 'SOLID' && f.visible !== false);
      if (hasStroke || (!hasFill && n.type === 'VECTOR')) {
        n.fills = [];
        n.strokes = [figma.variables.setBoundVariableForPaint(
          { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault)];
        n.strokeWeight = 1.5;
        n.strokeJoin = 'ROUND';
        n.strokeCap = 'ROUND';
        try { n.strokeAlign = 'CENTER'; } catch (_) {}
      }
      if (hasFill && !hasStroke) {
        n.fills = [figma.variables.setBoundVariableForPaint(
          { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault)];
      }
    }
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
const SIZE_PX = { sm: 20, md: 24, lg: 32 };
function reimportRegular(set, svg) {
  const results = {};
  for (const [size, px] of Object.entries(SIZE_PX)) {
    const variant = set.children.find(c => c.name === 'Size=' + size);
    if (!variant) continue;
    variant.visible = true;
    for (const c of [...variant.children]) c.remove();
    const node = figma.createNodeFromSvg(svg);
    node.name = set.name.split('/').pop();
    node.resize(px, px);
    node.x = 0; node.y = 0;
    node.clipsContent = false;
    if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    variant.appendChild(node);
    try { variant.resizeWithoutConstraints(px, px); } catch (_) { try { variant.resize(px, px); } catch(__){} }
    bindStrokes(node);
    variant.clipsContent = false;
    results[size] = node.findAll(n => n.type==='VECTOR' || n.type==='ELLIPSE' || n.type==='LINE' || n.type==='BOOLEAN_OPERATION').length;
  }
  for (const c of set.children) c.visible = (c.name === 'Size=md');
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return results;
}

const SVGS = {"icon/health/blood": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Blood-Types-1--Streamline-Ultimate\">\n  <desc>\n    Blood Types 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.6071 15.8272c0 1.7827 -0.7583 3.4923 -2.1081 4.7529 -1.3498 1.2605 -3.1805 1.9687 -5.08937 1.9687 -1.90889 0 -3.73959 -0.7082 -5.08938 -1.9687 -1.34979 -1.2606 -2.10809 -2.9702 -2.10809 -4.7529 0 -5.7118 6.16465 -12.4334 7.19747 -12.4334s7.19747 6.7216 7.19747 12.4334Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.818 15.0102c1.4113 0 2.7647 -0.5235 3.7626 -1.4555 0.9979 -0.9319 1.5585 -2.1958 1.5585 -3.5138 0 -4.22274 -4.5575 -9.192023 -5.3211 -9.192023 -0.4686 0 -2.3664 1.871913 -3.7626 4.294243\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" d=\"M5.55298 15.0098h5.71332\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" d=\"m8.40967 12.1536 0 5.7133\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" d=\"M16.4324 8.74121h3.4699\" stroke-width=\"1\"></path>\n</svg>", "icon/health/blood.pressure": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21.25 3.5c0 -1.51878 -4.1414 -2.75 -9.25 -2.75 -5.10863 0 -9.25 1.23122 -9.25 2.75\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.25 10.8735c0.8687 -0.0803 1.7924 -0.1235 2.75 -0.1235s1.8813 0.0432 2.75 0.1235\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M2.75 3.5v10c0 0.9808 1.72723 1.8418 4.32677 2.3286C8.23393 16.0453 9.25 15.1103 9.25 13.933V7.95007c0 -1.03324 -0.79028 -1.88484 -1.80912 -2.05675C4.63976 5.42069 2.75 4.52595 2.75 3.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21.25 3.5v10c0 0.9808 -1.7272 1.8418 -4.3268 2.3286 -1.1571 0.2167 -2.1732 -0.7183 -2.1732 -1.8956V7.95007c0 -1.03324 0.7903 -1.88484 1.8091 -2.05675C19.3602 5.42069 21.25 4.52595 21.25 3.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 20.75a4 2.5 0 1 0 8 0 4 2.5 0 1 0 -8 0\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16 20.75h1\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 20.7501H4.20774c-0.6267 0 -1.24161 -0.1704 -1.77899 -0.4928l-0.14225 -0.0853C1.33326 19.6 0.75 18.5699 0.75 17.4582c0 -0.6248 0.184941 -1.2356 0.53152 -1.7555L2.75 13.5\" stroke-width=\"1\"></path>\n</svg>", "icon/health/brain": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Brain--Streamline-Ultimate\">\n  <desc>\n    Brain Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M22.8 12a2.808 2.808 0 0 1 -2.614 2.8 3.493 3.493 0 0 1 -3.095 5.622 1.874 1.874 0 1 1 -3.677 0.592 2.819 2.819 0 0 1 -2.82 0 1.874 1.874 0 1 1 -3.677 -0.592A3.493 3.493 0 0 1 3.818 14.8a2.8 2.8 0 0 1 0 -5.592 3.493 3.493 0 0 1 3.1 -5.622 1.874 1.874 0 1 1 3.672 -0.596 2.819 2.819 0 0 1 2.82 0 1.874 1.874 0 1 1 3.677 0.592A3.493 3.493 0 0 1 20.182 9.2 2.808 2.808 0 0 1 22.8 12Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 13.597 0 0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 9.278 0 0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 4.959 0 0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m12 17.916 0 0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M6.602 8.339a1.408 1.408 0 1 0 2.816 0 1.408 1.408 0 1 0 -2.816 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M14.816 8.245a1.408 1.408 0 1 0 2.816 0 1.408 1.408 0 1 0 -2.816 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M5.898 16.694a1.408 1.408 0 1 0 2.816 0 1.408 1.408 0 1 0 -2.816 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M14.934 14.816a1.408 1.408 0 1 0 2.816 0 1.408 1.408 0 1 0 -2.816 0Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M6.133 11.625h0.938a0.938 0.938 0 0 0 0.939 -0.939v-0.939\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "icon/health/ear": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Earpods-Ear--Streamline-Ultimate\">\n  <desc>\n    Earpods Ear Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M18.637 8.78906 22.8 18.9311c0.0747 0.1822 0.1128 0.3774 0.1121 0.5744 -0.0007 0.197 -0.0402 0.392 -0.1162 0.5737 -0.0761 0.1817 -0.1872 0.3467 -0.327 0.4855 -0.1398 0.1388 -0.3056 0.2486 -0.4879 0.3234 -0.1823 0.0747 -0.3775 0.1128 -0.5745 0.1121 -0.197 -0.0007 -0.3919 -0.0402 -0.5736 -0.1163 -0.1818 -0.076 -0.3467 -0.1872 -0.4855 -0.327 -0.1388 -0.1398 -0.2487 -0.3056 -0.3234 -0.4878l-2.467 -6.02c-0.7363 0.8068 -1.7058 1.3642 -2.7737 1.5945 -1.0678 0.2303 -2.1808 0.1221 -3.1843 -0.3095L8.81201 8.53406c0.49112 -1.21295 1.41869 -2.19798 2.59999 -2.761 0.6709 -0.28892 1.3931 -0.43991 2.1236 -0.444 0.7304 -0.00408 1.4542 0.13883 2.1283 0.42022 0.6741 0.2814 1.2847 0.69553 1.7955 1.21775 0.5108 0.52222 0.9112 1.14185 1.1776 1.82203Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M13.3071 10.875c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M13.3071 10.875c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <g>\n    <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12.4111 2.25898c-0.8433 -0.65917 -1.8264 -1.11666 -2.87397 -1.337414 -1.62706 -0.361033 -3.32896 -0.148451 -4.8171 0.601694 -1.48813 0.75015 -2.6709 1.99168 -3.34772 3.51406 -0.67682 1.52238 -0.806029 3.2319 -0.36572 4.83864 0.44031 1.60674 1.42304 3.01184 2.78154 3.97694 0.63641 0.4152 1.14484 0.9991 1.46852 1.6864 0.32368 0.6873 0.44987 1.451 0.36448 2.2059 -0.07905 0.5541 -0.06247 1.1177 0.049 1.6662 0.23754 1.1409 0.88045 2.1571 1.80976 2.8607 0.92931 0.7035 2.08212 1.0469 3.24511 0.9664 1.163 -0.0805 2.2575 -0.5793 3.081 -1.4042 0.8234 -0.8248 1.3201 -1.9199 1.3981 -3.0826\" stroke-width=\"1\"></path>\n    <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7.98013 3.76063c-0.8944 -0.00206 -1.76629 0.28037 -2.48961 0.80647 -0.72332 0.52609 -1.26059 1.26859 -1.53412 2.12015 -0.27354 0.85156 -0.26917 1.76804 0.01247 2.61695 0.28164 0.8489 0.82596 1.5863 1.55426 2.1054\" stroke-width=\"1\"></path>\n  </g>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
