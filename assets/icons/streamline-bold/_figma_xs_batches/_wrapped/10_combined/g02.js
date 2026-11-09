
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
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [

{
  setName: "icon/misc/hammer",
  name: "hammer",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hammer--Streamli"+
    "ne-Ultimate\">\n  <desc>\n    Hammer Streamline Icon: https://streamlinehq.com\n  </"+
    "desc>\n  <g>\n    <path d=\"m23.05 8.57 -6.24 -6.24a0.51 0.51 0 0 0 -0.62 -0.07 4.5"+
    " 4.5 0 0 1 -5.49 -0.9 0.51 0.51 0 0 0 -0.71 0L8.78 2.58a1.46 1.46 0 0 0 -0.44 1."+
    "06 1.47 1.47 0 0 0 0.44 1.06l9.07 9.07a1.5 1.5 0 0 0 2.12 0l3.08 -3.08a1.49 1.49"+
    " 0 0 0 0 -2.12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11 9.28a0."+
    "48 0.48 0 0 0 -0.7 0l-9.06 9.07a2.49 2.49 0 0 0 -0.73 1.77 2.77 2.77 0 0 0 2.67 "+
    "2.67A2.47 2.47 0 0 0 5 22.05L14 13a0.51 0.51 0 0 0 0.15 -0.35 0.53 0.53 0 0 0 -0"+
    ".15 -0.36Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
},
{
  setName: "icon/misc/face.id",
  name: "face-id",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Face-Id--Streaml"+
    "ine-Ultimate\">\n  <desc>\n    Face Id Streamline Icon: https://streamlinehq.com\n  "+
    "</desc>\n  <g>\n    <path d=\"M6.5 22H2.25a0.25 0.25 0 0 1 -0.25 -0.25V17.5a1 1 0 0"+
    " 0 -2 0V22a2 2 0 0 0 2 2h4.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></p"+
    "ath>\n    <path d=\"M1 7.5a1 1 0 0 0 1 -1V2.25A0.25 0.25 0 0 1 2.25 2H6.5a1 1 0 0 "+
    "0 0 -2H2a2 2 0 0 0 -2 2v4.5a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></pat"+
    "h>\n    <path d=\"M23 16.5a1 1 0 0 0 -1 1v4.25a0.25 0.25 0 0 1 -0.25 0.25H17.5a1 1"+
    " 0 0 0 0 2H22a2 2 0 0 0 2 -2v-4.5a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\""+
    "1\"></path>\n    <path d=\"M22 0h-4.5a1 1 0 0 0 0 2h4.25a0.25 0.25 0 0 1 0.25 0.25V"+
    "6.5a1 1 0 0 0 2 0V2a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n   "+
    " <path d=\"M15.77 14.45a1 1 0 1 1 1.68 1.1 6.51 6.51 0 0 1 -10.9 0 1 1 0 1 1 1.68"+
    " -1.1 4.49 4.49 0 0 0 7.54 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path "+
    "d=\"M8.5 11.5a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1 -1 1\" fill=\"#000000\" s"+
    "troke-width=\"1\"></path>\n    <path d=\"M15.5 11.5a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 2 0"+
    "v3a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
}
,

{
  setName: "icon/misc/flash",
  name: "flash",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash--Streamlin"+
    "e-Ultimate\">\n  <desc>\n    Flash Streamline Icon: https://streamlinehq.com\n  </de"+
    "sc>\n  <path d=\"M17.5 8h-4.1L17.92 0.76a0.47 0.47 0 0 0 0 -0.5 0.51 0.51 0 0 0 -0"+
    ".42 -0.26h-8a0.49 0.49 0 0 0 -0.5 0.38l-3 12a0.48 0.48 0 0 0 0.09 0.43 0.49 0.49"+
    " 0 0 0 0.41 0.19h3.35L7 23.37a0.49 0.49 0 0 0 0.27 0.58 0.52 0.52 0 0 0 0.63 -0."+
    "17l10 -15a0.5 0.5 0 0 0 -0.4 -0.78\" fill=\"#000000\" stroke-width=\"1\"></path>\n</sv"+
    "g>")
},
{
  setName: "icon/misc/stopwatch",
  name: "stopwatch",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Stopwatch--Strea"+
    "mline-Ultimate\">\n  <desc>\n    Stopwatch Streamline Icon: https://streamlinehq.co"+
    "m\n  </desc>\n  <g>\n    <path d=\"m19.16 8.26 1.55 -1.55a1 1 0 1 0 -1.42 -1.42l-1.6"+
    " 1.6A9.49 9.49 0 0 0 13 5.05V2h2a1 1 0 0 0 0 -2H9a1 1 0 0 0 0 2h2v3.05a9.51 9.51"+
    " 0 1 0 8.16 3.21M12 22a7.5 7.5 0 1 1 7.5 -7.5A7.5 7.5 0 0 1 12 22\" fill=\"#000000"+
    "\" stroke-width=\"1\"></path>\n    <path d=\"M9.21 10.29a1 1 0 1 0 -1.42 1.42l3.5 3.5"+
    "a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  "+
    "</g>\n</svg>")
}
,

{
  setName: "icon/actions/clear",
  name: "clear",
  category: "actions",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Clear-Noti"+
    "fication--Streamline-Ultimate\">\n  <desc>\n    Alert Clear Notification Streamline"+
    " Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15 17.5a1 1 0 0 0 "+
    "-1 1V20H2V3h12v1.5a1 1 0 0 0 2 0V3a3 3 0 0 0 -3 -3H3a3 3 0 0 0 -3 3v18a3 3 0 0 0"+
    " 3 3h10a3 3 0 0 0 3 -3v-2.5a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></p"+
    "ath>\n    <path d=\"M4.5 7H15s0.5 0 0.5 0.5V10s0 0.5 -0.5 0.5H4.5s-0.5 0 -0.5 -0.5"+
    "V7.5s0 -0.5 0.5 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 "+
    "12.5H16s0.5 0 0.5 0.5v2.5s0 0.5 -0.5 0.5H5.5s-0.5 0 -0.5 -0.5V13s0 -0.5 0.5 -0.5"+
    "\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21.5 7.75a0.76 0.76 0 0 "+
    "0 -0.75 -0.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#0000"+
    "00\" stroke-width=\"1\"></path>\n    <path d=\"M22.5 11.5a0.76 0.76 0 0 0 -0.75 -0.75"+
    "h-3a0.75 0.75 0 0 0 0 1.5h3a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-wi"+
    "dth=\"1\"></path>\n    <path d=\"M23.25 14.5h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 "+
    "0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
},
{
  setName: "icon/actions/search.alt",
  name: "search-alt",
  category: "actions",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Search-1--Stream"+
    "line-Ultimate\">\n  <desc>\n    Search 1 Streamline Icon: https://streamlinehq.com\n"+
    "  </desc>\n  <path d=\"M23.41 20.59 18.77 16a10.25 10.25 0 1 0 -8.52 4.56 10.14 10"+
    ".14 0 0 0 5.69 -1.74l4.65 4.65a2 2 0 0 0 2.82 0 2 2 0 0 0 0 -2.88ZM10.25 3A7.25 "+
    "7.25 0 1 1 3 10.26 7.26 7.26 0 0 1 10.25 3Z\" fill=\"#000000\" stroke-width=\"1\"></p"+
    "ath>\n</svg>")
}
,

{
  setName: "icon/actions/explore",
  name: "explore",
  category: "actions",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Space-Explore--S"+
    "treamline-Ultimate\">\n  <desc>\n    Space Explore Streamline Icon: https://streaml"+
    "inehq.com\n  </desc>\n  <g>\n    <path d=\"M9.6 3.56h0.25a0.51 0.51 0 0 1 0.5 0.5v0."+
    "25a0.75 0.75 0 1 0 1.5 0v-0.25a0.5 0.5 0 0 1 0.5 -0.5h0.25a0.75 0.75 0 0 0 0 -1."+
    "5h-0.25a0.5 0.5 0 0 1 -0.5 -0.5v-0.25a0.75 0.75 0 0 0 -1.5 0v0.25a0.5 0.5 0 0 1 "+
    "-0.5 0.5H9.6a0.75 0.75 0 0 0 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    "+
    "<path d=\"M23.25 11.13H23a0.5 0.5 0 0 1 -0.5 -0.5v-0.25a0.75 0.75 0 0 0 -1.5 0v0."+
    "25a0.5 0.5 0 0 1 -0.5 0.5h-0.25a0.75 0.75 0 0 0 0 1.5h0.25a0.5 0.5 0 0 1 0.5 0.5"+
    "v0.25a0.75 0.75 0 1 0 1.5 0v-0.25a0.5 0.5 0 0 1 0.5 -0.5h0.25a0.75 0.75 0 0 0 0 "+
    "-1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.25 3A2.25 2.25 0 "+
    "0 1 21 0.75a0.75 0.75 0 0 0 -1.5 0A2.25 2.25 0 0 1 17.25 3a0.75 0.75 0 0 0 0 1.5"+
    " 2.25 2.25 0 0 1 2.25 2.25 0.75 0.75 0 0 0 1.5 0 2.25 2.25 0 0 1 2.25 -2.25 0.75"+
    " 0.75 0 0 0 0 -1.5m-2.48 0.94a2.57 2.57 0 0 0 -0.33 0.33 0.25 0.25 0 0 1 -0.38 0"+
    " 2.57 2.57 0 0 0 -0.33 -0.33 0.25 0.25 0 0 1 0 -0.38 2.57 2.57 0 0 0 0.33 -0.33 "+
    "0.25 0.25 0 0 1 0.38 0 2.57 2.57 0 0 0 0.33 0.33 0.25 0.25 0 0 1 0 0.38\" fill=\"#"+
    "000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.65 16.81h13.21a0.45 0.45 0 0 0 "+
    "0.45 -0.51 0.86 0.86 0 0 0 -1 -0.74 1 1 0 0 1 -0.24 0 5.38 5.38 0 0 1 -5.35 -4.7"+
    "5 0.88 0.88 0 0 0 -0.9 -0.76 7.16 7.16 0 0 0 -6.74 6.1 0.59 0.59 0 0 0 0.13 0.46"+
    " 0.57 0.57 0 0 0 0.44 0.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\""+
    "M13.8 18H0.58a0.58 0.58 0 0 0 -0.58 0.58v4.6a0.87 0.87 0 0 0 0.86 0.82H5a0.87 0."+
    "87 0 0 0 0.86 -0.86v-1.29a1.31 1.31 0 0 1 2.61 0v1.29a0.87 0.87 0 0 0 0.86 0.86h"+
    "4.15a0.87 0.87 0 0 0 0.87 -0.86v-4.6a0.58 0.58 0 0 0 -0.55 -0.54\" fill=\"#000000\""+
    " stroke-width=\"1\"></path>\n    <path d=\"M13.14 6.59a0.87 0.87 0 0 0 -1.22 0 2.57 "+
    "2.57 0 0 0 -0.76 1.83 2.62 2.62 0 0 0 0.22 1 0.58 0.58 0 0 1 -0.12 0.64l-1.47 1."+
    "51a0.57 0.57 0 0 0 -0.08 0.71 3.94 3.94 0 0 0 2.14 1.66 0.59 0.59 0 0 0 0.59 -0."+
    "14l1.26 -1.26a0.57 0.57 0 0 1 0.64 -0.12 2.63 2.63 0 0 0 2.87 -0.54 0.88 0.88 0 "+
    "0 0 0 -1.22Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
},
{
  setName: "icon/actions/snooze",
  name: "snooze",
  category: "actions",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Snoo"+
    "ze-Return-Repeat--Streamline-Ultimate\">\n  <desc>\n    Snooze Return Repeat Stream"+
    "line Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\""+
    "evenodd\" d=\"M12.048 2.938c-2.902 0 -5.783 1.743 -7.602 4.102l1.347 0.815a1 1 0 0"+
    " 1 -0.288 1.829l-3.275 0.77a0.995 0.995 0 0 1 -0.98 -0.292 1.006 1.006 0 0 1 -0."+
    "234 -0.435L0.149 6.451a1 1 0 0 1 1.484 -1.112l1.095 0.662C4.877 3.111 8.367 0.93"+
    "8 12.048 0.938c4.796 0 8.826 3.088 10.415 7.22a1 1 0 0 1 -1.866 0.718c-1.313 -3."+
    "414 -4.637 -5.938 -8.549 -5.938Zm10.313 10.64a0.993 0.993 0 0 0 -0.616 -0.026l-3"+
    ".277 0.868a1 1 0 0 0 -0.261 1.822l1.357 0.82c-1.782 2.328 -4.65 4 -7.612 4 -3.91"+
    "2 0 -7.236 -2.524 -8.549 -5.938a1 1 0 1 0 -1.866 0.718c1.589 4.132 5.619 7.22 10"+
    ".415 7.22 3.712 0 7.205 -2.079 9.33 -4.96l1.085 0.656a1 1 0 0 0 1.486 -1.105l-0."+
    "866 -3.37a0.997 0.997 0 0 0 -0.626 -0.705ZM11.489 8.715a1 1 0 0 0 -2 0v5.8a1 1 0"+
    " 0 0 1 1h4a1 1 0 0 0 0 -2h-3v-4.8Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>"+
    "\n</svg>")
}

]
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
