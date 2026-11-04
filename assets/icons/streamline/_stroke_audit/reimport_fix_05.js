
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

const SVGS = {"icon/status/blocked": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Tags-Block--Streamline-Ultimate\">\n  <desc>\n    Tags Block Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8.99998 19.188c-0.28129 0.2812 -0.66275 0.4392 -1.0605 0.4392 -0.39774 0 -0.77921 -0.158 -1.0605 -0.4392l-5.379 -5.378c-0.13939 -0.1393 -0.24996 -0.3047 -0.3254 -0.4867 -0.07545 -0.1821 -0.11428 -0.3772 -0.11428 -0.5743 0 -0.197 0.03883 -0.3922 0.11428 -0.5742 0.07544 -0.1821 0.18601 -0.3475 0.3254 -0.4868L12 1.18802c0.1393 -0.13926 0.3048 -0.249713 0.4868 -0.325038 0.1821 -0.075324 0.3772 -0.114048 0.5742 -0.113958h5.378c0.3978 0 0.7793 0.158035 1.0606 0.439336 0.2813 0.28131 0.4394 0.66284 0.4394 1.06066v5.379c-0.0001 0.39755 -0.158 0.7788 -0.439 1.06\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M16.189 4.87402c-0.2071 0 -0.375 -0.16789 -0.375 -0.375 0 -0.2071 0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M16.189 4.87402c0.2071 0 0.375 -0.16789 0.375 -0.375 0 -0.2071 -0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16.939 23.249c3.3137 0 6 -2.6863 6 -6s-2.6863 -6 -6 -6 -6 2.6863 -6 6 2.6863 6 6 6Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m21.182 13.006 -8.484 8.485\" stroke-width=\"1\"></path>\n</svg>", "icon/status/help": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Question-Circle--Streamline-Ultimate\">\n  <desc>\n    Question Circle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 9.00004c0.00011 -0.54997 0.15139 -1.08933 0.43732 -1.55913s0.69548 -0.85196 1.18398 -1.10472c0.4884 -0.25275 1.037 -0.36637 1.5856 -0.32843 0.5487 0.03793 1.0764 0.22596 1.5254 0.54353 0.449 0.31757 0.8021 0.75246 1.0206 1.25714 0.2186 0.50468 0.2942 1.05973 0.2186 1.60448 -0.0756 0.54475 -0.2994 1.05829 -0.6471 1.48439 -0.3477 0.4261 -0.8059 0.7484 -1.3244 0.9317 -0.2926 0.1035 -0.5459 0.2951 -0.725 0.5485 -0.1791 0.2535 -0.2752 0.5562 -0.275 0.8665v1.006\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M12 18c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M12 18c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-miterlimit=\"10\" d=\"M12 23.25c6.2132 0 11.25 -5.0368 11.25 -11.25S18.2132 0.75 12 0.75 0.75 5.7868 0.75 12 5.7868 23.25 12 23.25Z\" stroke-width=\"1\"></path>\n</svg>", "icon/status/lock": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Lock--Streamline-Ultimate\">\n  <desc>\n    Lock Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" d=\"M12 14.625c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M12 14.625c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 9.75V7.5c-0.0026 -0.99375 -0.3986 -1.94604 -1.1013 -2.64873C13.946 4.14858 12.9938 3.75264 12 3.75v0c-0.9937 0.0029 -1.9458 0.39892 -2.64844 1.10156C8.64892 5.55419 8.2529 6.50633 8.25 7.5v2.25\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M0.75 3.75v-1.5c0 -0.39782 0.158035 -0.77936 0.43934 -1.06066C1.47064 0.908035 1.85218 0.75 2.25 0.75h1.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.25 3.75v-1.5c0 -0.39782 -0.158 -0.77936 -0.4393 -1.06066C22.5294 0.908035 22.1478 0.75 21.75 0.75h-1.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M0.75 20.25v1.5c0 0.3978 0.158035 0.7794 0.43934 1.0607 0.2813 0.2813 0.66284 0.4393 1.06066 0.4393h1.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.25 20.25v1.5c0 0.3978 -0.158 0.7794 -0.4393 1.0607s-0.6629 0.4393 -1.0607 0.4393h-1.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 9.75h-7.5c-0.82843 0 -1.5 0.6716 -1.5 1.5v6c0 0.8284 0.67157 1.5 1.5 1.5h7.5c0.8284 0 1.5 -0.6716 1.5 -1.5v-6c0 -0.8284 -0.6716 -1.5 -1.5 -1.5Z\" stroke-width=\"1\"></path>\n</svg>", "icon/status/notification": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Alert-Notification--Streamline-Ultimate\">\n  <desc>\n    Alert Notification Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M18.582 0.907008c-0.7614 -0.17781 -1.5504 -0.203909 -2.3219 -0.076807 -0.7714 0.127101 -1.5104 0.404919 -2.1745 0.817579 -0.6641 0.41266 -1.2404 0.9521 -1.6961 1.5875 -0.4556 0.6354 -0.7817 1.35432 -0.9595 2.11573l-0.021 0.091c-0.3012 1.07579 -0.2928 2.21471 0.024 3.286L8.83301 11.957l4.05099 -0.871c0.6619 0.6646 1.469 1.1666 2.3577 1.4665 0.8888 0.2999 1.835 0.3896 2.7642 0.2619 0.9293 -0.1276 1.8163 -0.4691 2.5912 -0.9976 0.7749 -0.5284 1.4167 -1.2295 1.8749 -2.04794 0.4582 -0.81847 0.7202 -1.73207 0.7655 -2.66896 0.0454 -0.93689 -0.1273 -1.87153 -0.5043 -2.73041 -0.377 -0.85888 -0.9481 -1.61859 -1.6684 -2.2194 -0.7203 -0.6008 -1.5702 -1.02632 -2.4828 -1.243082v0Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M17.245 10.007c-0.2071 0 -0.375 -0.1679 -0.375 -0.37501 0 -0.20711 0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M17.245 10.007c0.2071 0 0.375 -0.1679 0.375 -0.37501 0 -0.20711 -0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.245 6.88199v-3\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12.75 14.75v5.768c0 0.7246 -0.2878 1.4195 -0.8002 1.9318 -0.5123 0.5124 -1.2072 0.8002 -1.9318 0.8002H3.25c-0.66304 0 -1.29893 -0.2634 -1.76777 -0.7322C1.01339 22.0489 0.75 21.413 0.75 20.75v-16c0 -0.66304 0.26339 -1.29893 0.73223 -1.76777C1.95107 2.51339 2.58696 2.25 3.25 2.25h5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M0.75 18.75h12\" stroke-width=\"1\"></path>\n</svg>", "icon/status/shield": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Lock-Shield--Streamline-Ultimate\">\n  <desc>\n    Lock Shield Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 9.75h-7.5c-0.82843 0 -1.5 0.6716 -1.5 1.5v4.5c0 0.8284 0.67157 1.5 1.5 1.5h7.5c0.8284 0 1.5 -0.6716 1.5 -1.5v-4.5c0 -0.8284 -0.6716 -1.5 -1.5 -1.5Z\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M12 13.875c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M12 13.875c0.2071 0 0.375 -0.1679 0.375 -0.375s-0.1679 -0.375 -0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8.25 9.75V7.5c0 -0.99456 0.39509 -1.94839 1.09835 -2.65165C10.0516 4.14509 11.0054 3.75 12 3.75c0.9946 0 1.9484 0.39509 2.6517 1.09835C15.3549 5.55161 15.75 6.50544 15.75 7.5v2.25\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 23.25C5.324 21.469 0.75 17.51 0.75 10.5V0.75h22.5v9.75c0 7.005 -4.567 10.967 -11.25 12.75Z\" stroke-width=\"1\"></path>\n</svg>", "icon/status/warning": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Alert-Circle--Streamline-Ultimate\">\n  <desc>\n    Alert Circle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" d=\"M12 17.25c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" d=\"M12 17.25c0.2071 0 0.375 -0.1679 0.375 -0.375S12.2071 16.5 12 16.5\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-miterlimit=\"10\" d=\"M12 13.5V5.25\" stroke-width=\"1\"></path>\n  <path stroke=\"#000000\" stroke-miterlimit=\"10\" d=\"M12 23.25c6.2132 0 11.25 -5.0368 11.25 -11.25S18.2132 0.75 12 0.75 0.75 5.7868 0.75 12 5.7868 23.25 12 23.25Z\" stroke-width=\"1\"></path>\n</svg>"};

const out = {};
for (const [setName, svg] of Object.entries(SVGS)) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
  if (!set) { out[setName] = { error: 'missing' }; continue; }
  try { out[setName] = reimportRegular(set, svg); }
  catch (e) { out[setName] = { error: String(e && e.message || e) }; }
}
return out;
