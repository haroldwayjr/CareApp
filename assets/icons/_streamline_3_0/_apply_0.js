const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const colorVar = await figma.variables.getVariableByIdAsync('VariableID:34:2');
const FILL = { r: 0.062745, g: 0.094118, b: 0.156863 };
const PARK = {
  'Size=xs, Style=outline': { x: 0, y: 0, w: 16, h: 16 },
  'Size=sm, Style=outline': { x: 24, y: 0, w: 20, h: 20 },
  'Size=md, Style=outline': { x: 52, y: 0, w: 24, h: 24 },
  'Size=lg, Style=outline': { x: 84, y: 0, w: 32, h: 32 },
  'Size=xs, Style=bold': { x: 124, y: 0, w: 16, h: 16 },
};
const OUTLINE = {
  'Size=xs, Style=outline': { glyph: 14.5, inset: 0.75, sw: 1 },
  'Size=sm, Style=outline': { glyph: 18, inset: 1, sw: 1.5 },
  'Size=md, Style=outline': { glyph: 22, inset: 1, sw: 1.5 },
  'Size=lg, Style=outline': { glyph: 30, inset: 1, sw: 1.5 },
};
function bindStrokes(root, sw) {
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
          { type: 'SOLID', color: FILL }, 'color', colorVar)];
        n.strokeWeight = sw;
        n.strokeJoin = 'ROUND';
        n.strokeCap = 'ROUND';
        try { n.strokeAlign = 'CENTER'; } catch (_) {}
      }
    }
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function paintFill(node) {
  node.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: FILL }, 'color', colorVar)];
  node.strokes = [];
}
function bindFills(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON') paintFill(n);
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function evenodd(root) {
  const vectors = root.findAll(n => n.type === 'VECTOR');
  for (const v of vectors) {
    const vn = v.vectorNetwork;
    if (!vn || !vn.regions) continue;
    let changed = false;
    const regions = vn.regions.map(r => {
      if (r.loops && r.loops.length >= 2 && r.windingRule !== 'EVENODD') {
        changed = true;
        return Object.assign({}, r, { windingRule: 'EVENODD' });
      }
      return r;
    });
    if (changed) v.vectorNetwork = { vertices: vn.vertices, segments: vn.segments, regions };
  }
}
function applyOutline(set, svg, filledOnOutline) {
  const out = {};
  for (const [vname, cfg] of Object.entries(OUTLINE)) {
    const variant = set.children.find(c => c.name === vname);
    if (!variant) { out[vname] = 'missing'; continue; }
    for (const c of [...variant.children]) c.remove();
    const node = figma.createNodeFromSvg(svg);
    node.name = '_outline';
    try { node.resize(cfg.glyph, cfg.glyph); } catch (e) {}
    node.x = cfg.inset;
    node.y = cfg.inset;
    node.clipsContent = false;
    if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    variant.appendChild(node);
    if (filledOnOutline) {
      evenodd(node);
      bindFills(node);
    } else {
      bindStrokes(node, cfg.sw);
    }
    variant.clipsContent = false;
    variant.visible = true;
    const park = PARK[vname];
    try { variant.resizeWithoutConstraints(park.w, park.h); } catch (e) { try { variant.resize(park.w, park.h); } catch (e2) {} }
    variant.x = park.x;
    variant.y = park.y;
    out[vname] = true;
  }
  return out;
}
function applyBoldXs(set, svg) {
  const bold = set.children.find(c => c.name === 'Size=xs, Style=bold');
  if (!bold) return { ok: false, reason: 'no-bold' };
  for (const c of [...bold.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = '_bold';
  try { node.resize(14, 14); } catch (e) {}
  node.x = 1;
  node.y = 1;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  bold.appendChild(node);
  evenodd(node);
  bindFills(node);
  bold.clipsContent = false;
  bold.visible = true;
  const park = PARK['Size=xs, Style=bold'];
  try { bold.resizeWithoutConstraints(park.w, park.h); } catch (e) { try { bold.resize(park.w, park.h); } catch (e2) {} }
  bold.x = park.x;
  bold.y = park.y;
  return { ok: true };
}
function parkSet(set) {
  const w = set.width;
  const h = set.height;
  const x = set.x;
  const y = set.y;
  set.clipsContent = true;
  try { set.resizeWithoutConstraints(16, 16); } catch (e) {}
  for (const c of set.children) {
    const park = PARK[c.name];
    if (park) {
      c.visible = true;
      c.x = park.x;
      c.y = park.y;
    } else {
      c.visible = true;
    }
  }
  return { kept: { w, h, x, y }, after: { w: set.width, h: set.height, x: set.x, y: set.y } };
}
const BATCH = [{"figma": "icon/actions/add", "regularName": "Add", "filledOnOutline": false, "outline": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Add--Streamline-Ultimate\"> <desc> Add Streamline Icon: https://streamlinehq.com </desc> <path d=\"m0.75 12 22.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> <path d=\"m12 0.75 0 22.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M0 12a1.5 1.5 0 0 0 1.5 1.5h8.75a.25.25 0 0 1 .25.25v8.75a1.5 1.5 0 0 0 3 0v-8.75a.25.25 0 0 1 .25-.25h8.75a1.5 1.5 0 0 0 0-3h-8.75a.25.25 0 0 1-.25-.25V1.5a1.5 1.5 0 0 0-3 0v8.75a.25.25 0 0 1-.25.25H1.5A1.5 1.5 0 0 0 0 12Z\" fill=\"#000000\"/></svg>"}, {"figma": "icon/actions/archive", "regularName": "Archive", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Archive--Streamline-Streamline-3.0\"> <desc> Archive Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M21.75 9.75v9.5a3 3 0 0 1 -3 3H5.25a3 3 0 0 1 -3 -3v-9.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M21.75 1.75H2.25a1.5 1.5 0 0 0 -1.5 1.5v3h22.5v-3a1.5 1.5 0 0 0 -1.5 -1.5Z\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M10 10.25h4s1.5 0 1.5 1.5v1s0 1.5 -1.5 1.5h-4s-1.5 0 -1.5 -1.5v-1s0 -1.5 1.5 -1.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </g> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Archive--Streamline-Streamline-3.0\"> <desc> Archive Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M21.5 2.5h-19a2 2 0 0 0 -2 2v3a1 1 0 0 0 1 1h21a1 1 0 0 0 1 -1v-3a2 2 0 0 0 -2 -2Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M21.5 10h-19a1 1 0 0 0 -1 1v8.5a2 2 0 0 0 2 2h17a2 2 0 0 0 2 -2V11a1 1 0 0 0 -1 -1Zm-6.25 3.5A1.25 1.25 0 0 1 14 14.75h-4a1.25 1.25 0 0 1 0 -2.5h4a1.25 1.25 0 0 1 1.25 1.25Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </g> </svg>"}, {"figma": "icon/actions/attach", "regularName": "Attachment", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Attachment--Streamline-Streamline-3.0\"> <desc> Attachment Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>attachment</title> <path d=\"M23.25 9.9 12.273 20.878a6.75 6.75 0 0 1 -9.546 -9.546l9.016 -9.015a4.5 4.5 0 1 1 6.363 6.363L9.091 17.7a2.25 2.25 0 0 1 -3.182 -3.181L14.925 5.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Attachment--Streamline-Streamline-3.0\"> <desc> Attachment Streamline Icon: https://streamlinehq.com </desc> <path d=\"M21.84 3.46a7 7 0 0 0 -9.84 0L1.62 13.83a5.13 5.13 0 0 0 7.25 7.25l8.43 -8.43A3.29 3.29 0 1 0 12.65 8l-5.19 5.18a1 1 0 0 0 0 1.42 1 1 0 0 0 1.41 0l5.19 -5.19a1.3 1.3 0 0 1 2.21 0.91 1.32 1.32 0 0 1 -0.38 0.92l-8.43 8.43a3.13 3.13 0 0 1 -5.34 -2.21A3.09 3.09 0 0 1 3 15.25L13.41 4.87a5 5 0 0 1 7 7l-7.78 7.78a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l7.78 -7.78a7 7 0 0 0 0 -9.84Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>"}, {"figma": "icon/actions/browse", "regularName": "E Commerce Apparel Browse", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"E-Commerce-Apparel-Browse--Streamline-Streamline-3.0\"> <desc> E Commerce Apparel Browse Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>e-commerce-apparel-browse</title> <path d=\"m17.25 12 -0.774 -3.04a0.952 0.952 0 0 0 -0.926 -0.71h-2.118a1.432 1.432 0 0 1 -2.864 0H8.45a0.952 0.952 0 0 0 -0.926 0.71L6.75 12H9v3.75h6V12Z\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m5.25 17.25 -1.5 1.5 1.5 1.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m3.75 18.75 3.75 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m18.75 17.25 1.5 1.5 -1.5 1.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m20.25 18.75 -3.75 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M21.643 0.75H2.357A1.611 1.611 0 0 0 0.75 2.365v19.269a1.611 1.611 0 0 0 1.607 1.616h19.286a1.612 1.612 0 0 0 1.607 -1.616V2.365A1.611 1.611 0 0 0 21.643 0.75Z\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m0.75 5.25 22.5 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"E-Commerce-Apparel-Browse--Streamline-Streamline-3.0\"> <desc> E Commerce Apparel Browse Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M16 16v-3.25a0.25 0.25 0 0 1 0.25 -0.25h1.25a0.49 0.49 0 0 0 0.39 -0.19 0.51 0.51 0 0 0 0.1 -0.43l-0.82 -3.24a1.49 1.49 0 0 0 -1.45 -1.14H13.5a0.5 0.5 0 0 0 -0.5 0.5 1 1 0 0 1 -2 0 0.5 0.5 0 0 0 -0.5 -0.5H8.28a1.49 1.49 0 0 0 -1.45 1.14L6 11.88a0.51 0.51 0 0 0 0.1 0.43 0.49 0.49 0 0 0 0.39 0.19h1.26a0.25 0.25 0 0 1 0.25 0.25V16a0.5 0.5 0 0 0 0.5 0.5h7a0.5 0.5 0 0 0 0.5 -0.5Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"m20.8 18.6 -2 -1.5a0.5 0.5 0 0 0 -0.8 0.4v0.5a0.25 0.25 0 0 1 -0.25 0.25H16.5a0.75 0.75 0 0 0 0 1.5h1.25A0.25 0.25 0 0 1 18 20v0.5a0.51 0.51 0 0 0 0.28 0.45 0.54 0.54 0 0 0 0.22 0.05 0.47 0.47 0 0 0 0.3 -0.1l2 -1.5a0.5 0.5 0 0 0 0 -0.8Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M7.5 18.25H6.25A0.25 0.25 0 0 1 6 18v-0.5a0.5 0.5 0 0 0 -0.8 -0.4l-2 1.5a0.5 0.5 0 0 0 0 0.8l2 1.5a0.47 0.47 0 0 0 0.3 0.1 0.54 0.54 0 0 0 0.22 0 0.51 0.51 0 0 0 0.28 -0.5V20a0.25 0.25 0 0 1 0.25 -0.25H7.5a0.75 0.75 0 0 0 0 -1.5Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M24 2a2 2 0 0 0 -2 -2H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2ZM6 2.5a1 1 0 1 1 1 1 1 1 0 0 1 -1 -1Zm3.5 0a1 1 0 1 1 1 1 1 1 0 0 1 -1 -1Zm-6 -1a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1ZM2.5 22a0.5 0.5 0 0 1 -0.5 -0.5V6a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5v15.5a0.5 0.5 0 0 1 -0.5 0.5Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </g> </svg>"}, {"figma": "icon/actions/cancel", "regularName": "Remove", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Lock-Cancel-Slash--Streamline-Ultimate\"> <desc> Lock Cancel Slash Streamline Icon: https://streamlinehq.com </desc> <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M19.417 20.114c0.1991 -0.1991 0.2986 -0.4978 0.2986 -0.7965v-9.2588c0 -0.6969 -0.5973 -1.2943 -1.2942 -1.2943H6.47447c-0.17028 0 -0.26775 -0.00001 -0.41696 0.06226\" stroke-width=\"1\"></path> <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M5.18028 11.9503v7.3672c0 0.6969 0.59735 1.2943 1.29426 1.2943H15.136\" stroke-width=\"1\"></path> <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M17.1272 8.76429V5.47884c0 -2.5885 -2.0907 -4.679157 -4.6792 -4.679157 -2.58851 0 -4.67922 2.090657 -4.67922 4.679157v3.28545\" stroke-width=\"1\"></path> <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" d=\"M23.1006 23.2002 0.899296 4.4834\" stroke-width=\"1\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Lock-Cancel-Slash--Streamline-Ultimate\"> <desc> Lock Cancel Slash Streamline Icon: https://streamlinehq.com </desc> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M16.15 5.93115c0 -2.0477 -1.6523 -3.69995 -3.7 -3.69995 -2.0478 0 -3.70005 1.65225 -3.70005 3.69995v1.92312H16.15zm2 1.92312V5.93115c0 -3.1523 -2.5478 -5.699949 -5.7 -5.699949 -3.15232 0 -5.70005 2.547649 -5.70005 5.699949v1.92312H6.6123L1.89232 3.87511c-0.42225 -0.35598 -1.053134 -0.30225 -1.409114 0.12 -0.355978 0.42226 -0.302252 1.05314 0.120001 1.40912l0.472623 0.39844c0.02362 0.01571 0.0466 0.03292 0.06881 0.05165L22.1867 23.5938c0.4188 0.2878 0.9957 0.2163 1.3301 -0.1803 0.356 -0.4223 0.3023 -1.0531 -0.12 -1.4091l-2.9252 -2.4661c0.0186 -0.109 0.0283 -0.2206 0.0283 -0.3341l0 -9.29988c0 -1.11418 -0.9357 -2.05005 -2.05 -2.05005zM17.0845 21.2543 4.3999 10.5606l0.00005 8.6436c0 1.1142 0.93575 2.0501 2.05 2.0501z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"figma": "icon/actions/check", "regularName": "Check 1", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-1--Streamline-Streamline-3.0\"> <desc> Check 1 Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>check-1</title> <path d=\"M23.25 0.749 8.158 22.308a2.2 2.2 0 0 1 -3.569 0.059L0.75 17.249\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-1--Streamline-Streamline-3.0\"> <desc> Check 1 Streamline Icon: https://streamlinehq.com </desc> <path d=\"M23.37 0.29a1.49 1.49 0 0 0 -2.09 0.34L7.25 20.2l-4.69 -4.69a1.5 1.5 0 0 0 -2.12 2.12l5.93 5.94a1.53 1.53 0 0 0 2.28 -0.19l15.07 -21a1.49 1.49 0 0 0 -0.35 -2.09Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>"}, {"figma": "icon/actions/check.bold", "regularName": "Check", "filledOnOutline": true, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check--Streamline-Streamline-3.0\"> <desc> Check Streamline Icon: https://streamlinehq.com </desc> <path d=\"m23.15 5.4 -2.8 -2.8a0.5 0.5 0 0 0 -0.7 0L7.85 14.4a0.5 0.5 0 0 1 -0.7 0l-2.8 -2.8a0.5 0.5 0 0 0 -0.7 0l-2.8 2.8a0.5 0.5 0 0 0 0 0.7l6.3 6.3a0.5 0.5 0 0 0 0.7 0l15.3 -15.3a0.5 0.5 0 0 0 0 -0.7Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check--Streamline-Streamline-3.0\"> <desc> Check Streamline Icon: https://streamlinehq.com </desc> <path d=\"m23.15 5.4 -2.8 -2.8a0.5 0.5 0 0 0 -0.7 0L7.85 14.4a0.5 0.5 0 0 1 -0.7 0l-2.8 -2.8a0.5 0.5 0 0 0 -0.7 0l-2.8 2.8a0.5 0.5 0 0 0 0 0.7l6.3 6.3a0.5 0.5 0 0 0 0.7 0l15.3 -15.3a0.5 0.5 0 0 0 0 -0.7Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>"}, {"figma": "icon/actions/check.circle", "regularName": "Check Circle", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Circle--Streamline-Streamline-3.0\"> <desc> Check Circle Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>check-circle</title> <path d=\"m6.75 9 3.294 4.611a1.526 1.526 0 0 0 2.414 0.09L23.25 0.749\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M16.783 3.824A10.487 10.487 0 1 0 20.8 8.377\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Circle--Streamline-Streamline-3.0\"> <desc> Check Circle Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M12.84 18.32a3 3 0 0 1 -4.45 0.24L4.87 15a3.1 3.1 0 0 1 -0.23 -4.24A3 3 0 0 1 9 10.68l1.08 1.08a0.25 0.25 0 0 0 0.37 0l4.44 -5.51a0.25 0.25 0 0 0 -0.07 -0.37 9.67 9.67 0 0 0 -6.28 -1.37 9.75 9.75 0 1 0 10.83 11.35 9.89 9.89 0 0 0 -0.32 -4.62 0.26 0.26 0 0 0 -0.44 -0.08Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M23.44 0.39a1.5 1.5 0 0 0 -2.11 0.23L10.39 14.2l-2.46 -2.46a1.51 1.51 0 0 0 -2.12 0 1.49 1.49 0 0 0 0 2.12l3.64 3.64a1.51 1.51 0 0 0 2.22 -0.12l12 -14.88a1.51 1.51 0 0 0 -0.23 -2.11Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </g> </svg>"}, {"figma": "icon/actions/clear", "regularName": "Delete", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Clear-Notification--Streamline-Ultimate\"> <desc> Alert Clear Notification Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>alert-clear-notification</title> <path d=\"M4.376 5.75h10.5s0.5 0 0.5 0.5v2.5s0 0.5 -0.5 0.5h-10.5s-0.5 0 -0.5 -0.5v-2.5s0 -0.5 0.5 -0.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> <path d=\"M5.874 12h10.5s0.5 0 0.5 0.5V15s0 0.5 -0.5 0.5h-10.5s-0.5 0 -0.5 -0.5v-2.5s0 -0.5 0.5 -0.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> <path d=\"m18.374 5.75 3 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> <path d=\"m19.124 10.75 3 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> <path d=\"m20.124 15.5 3 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> <path d=\"M14.376 18.75v2a2.5 2.5 0 0 1 -2.5 2.5h-8.5a2.5 2.5 0 0 1 -2.5 -2.5V3.25a2.5 2.5 0 0 1 2.5 -2.5h8.5a2.5 2.5 0 0 1 2.487 2.244\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> <path d=\"m0.876 18.75 13.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Clear-Notification--Streamline-Ultimate\"> <desc> Alert Clear Notification Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M15 17.5a1 1 0 0 0 -1 1V20H2V3h12v1.5a1 1 0 0 0 2 0V3a3 3 0 0 0 -3 -3H3a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-2.5a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M4.5 7H15s0.5 0 0.5 0.5V10s0 0.5 -0.5 0.5H4.5s-0.5 0 -0.5 -0.5V7.5s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 12.5H16s0.5 0 0.5 0.5v2.5s0 0.5 -0.5 0.5H5.5s-0.5 0 -0.5 -0.5V13s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.5 7.75a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.5 11.5a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.25 14.5h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"figma": "icon/actions/close.alt", "regularName": "Close", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Close--Streamline-Streamline-3.0\"> <desc> Close Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>close</title> <path d=\"m0.75 23.249 22.5 -22.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M23.25 23.249 0.75 0.749\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Close--Streamline-Streamline-3.0\"> <desc> Close Streamline Icon: https://streamlinehq.com </desc> <path d=\"M14.3 12.18a0.24 0.24 0 0 1 0 -0.35l9.26 -9.27a1.49 1.49 0 0 0 0 -2.12 1.51 1.51 0 0 0 -2.12 0L12.18 9.7a0.25 0.25 0 0 1 -0.36 0L2.56 0.44a1.51 1.51 0 0 0 -2.12 0 1.49 1.49 0 0 0 0 2.12l9.26 9.27a0.24 0.24 0 0 1 0 0.35L0.44 21.44a1.49 1.49 0 0 0 0 2.12 1.51 1.51 0 0 0 2.12 0l9.26 -9.26a0.25 0.25 0 0 1 0.36 0l9.26 9.26a1.51 1.51 0 0 0 2.12 0 1.49 1.49 0 0 0 0 -2.12Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>"}, {"figma": "icon/actions/copy", "regularName": "Copy Paste", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Copy-Paste--Streamline-Streamline-3.0\"> <desc> Copy Paste Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>copy-paste</title> <path d=\"M20.25 8.249v-3a1.5 1.5 0 0 0 -1.5 -1.5h-4\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M6.25 3.749h-4a1.5 1.5 0 0 0 -1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h6\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M14.421 4.736a0.751 0.751 0 0 1 -0.712 0.513H7.291a0.751 0.751 0 0 1 -0.712 -0.513l-1 -3a0.749 0.749 0 0 1 0.712 -0.987h8.418a0.749 0.749 0 0 1 0.712 0.987Z\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"M12.75 11.249h9s1.5 0 1.5 1.5v9s0 1.5 -1.5 1.5h-9s-1.5 0 -1.5 -1.5v-9s0 -1.5 1.5 -1.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m14.25 14.249 6 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m14.25 17.249 6 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m14.25 20.249 2.25 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Copy-Paste--Streamline-Streamline-3.0\"> <desc> Copy Paste Streamline Icon: https://streamlinehq.com </desc> <g> <path d=\"M13.4 4.73a0.24 0.24 0 0 0 0.2 0.26 1.09 1.09 0 0 1 0.82 1.11v1.4a1.24 1.24 0 0 0 1.25 1.24 1.23 1.23 0 0 0 1.24 -1.24V4a1.5 1.5 0 0 0 -1.49 -1.5h-1.73a0.29 0.29 0 0 0 -0.18 0.07 0.26 0.26 0 0 0 -0.07 0.18c0 0.45 0 1.47 -0.04 1.98Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M9 21.26A1.23 1.23 0 0 0 7.71 20H3.48a1.07 1.07 0 0 1 -1 -1.14V6.1A1.08 1.08 0 0 1 3.33 5a0.25 0.25 0 0 0 0.2 -0.26l0 -2a0.25 0.25 0 0 0 -0.25 -0.25H1.5A1.5 1.5 0 0 0 0 4v17a1.5 1.5 0 0 0 1.49 1.5h6.22A1.24 1.24 0 0 0 9 21.26Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M11.94 4.47v-2a0.5 0.5 0 0 0 -0.5 -0.49h-0.76a0.26 0.26 0 0 1 -0.25 -0.22 2 2 0 0 0 -3.95 0 0.25 0.25 0 0 1 -0.25 0.24h-0.76a0.49 0.49 0 0 0 -0.47 0.48v2a0.49 0.49 0 0 0 0.49 0.5h6a0.5 0.5 0 0 0 0.45 -0.51Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M19 17.27h-4a0.75 0.75 0 0 0 0 1.5h4a0.75 0.75 0 0 0 0 -1.5Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M14.29 14.54a0.76 0.76 0 0 0 0.75 0.75h2.49a0.75 0.75 0 0 0 0 -1.5H15a0.76 0.76 0 0 0 -0.71 0.75Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> <path d=\"M23.5 13.46a2 2 0 0 0 -0.58 -1.41l-1.41 -1.4a2 2 0 0 0 -1.41 -0.59h-7.61a2 2 0 0 0 -2 2V22a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2Zm-11 -0.4a1 1 0 0 1 1 -1h6.19a1 1 0 0 1 0.71 0.29l0.82 0.82a1 1 0 0 1 0.29 0.7V21a1 1 0 0 1 -1 1h-7a1 1 0 0 1 -1 -1Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </g> </svg>"}, {"figma": "icon/actions/create", "regularName": "Add", "filledOnOutline": false, "outline": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Add--Streamline-Streamline-3.0\"> <desc> Add Streamline Icon: https://streamlinehq.com </desc> <defs></defs> <title>add</title> <path d=\"m0.75 12 22.5 0\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> <path d=\"m12 0.75 0 22.5\" fill=\"none\" stroke=\"#0F1828\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path> </svg>", "bold": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Add--Streamline-Streamline-3.0\"> <desc> Add Streamline Icon: https://streamlinehq.com </desc> <path d=\"M0 12a1.5 1.5 0 0 0 1.5 1.5h8.75a0.25 0.25 0 0 1 0.25 0.25v8.75a1.5 1.5 0 0 0 3 0v-8.75a0.25 0.25 0 0 1 0.25 -0.25h8.75a1.5 1.5 0 0 0 0 -3h-8.75a0.25 0.25 0 0 1 -0.25 -0.25V1.5a1.5 1.5 0 0 0 -3 0v8.75a0.25 0.25 0 0 1 -0.25 0.25H1.5A1.5 1.5 0 0 0 0 12Z\" fill=\"#0F1828\" stroke-width=\"1\"></path> </svg>"}];

const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
const results = [];
for (const item of BATCH) {
  const set = sets.find(s => s.name === item.figma);
  if (!set) { results.push({ figma: item.figma, ok: false, reason: 'missing-set' }); continue; }
  applyOutline(set, item.outline, item.filledOnOutline);
  applyBoldXs(set, item.bold);
  parkSet(set);
  set.description = item.filledOnOutline
    ? ('Streamline Bold 3.0 — ' + item.regularName + ' (intentional fill on outline slots)')
    : ('Streamline Regular 3.0 — ' + item.regularName);
  results.push({ figma: item.figma, ok: true });
}
return { n: results.length, failed: results.filter(r => !r.ok), ok: results.filter(r => r.ok).map(r => r.figma) };
