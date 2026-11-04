
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
  setName: "icon/health/inhaler",
  name: "inhaler",
  category: "health",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Inha"+
    "ler--Streamline-Ultimate\">\n  <desc>\n    Inhaler Streamline Icon: https://streaml"+
    "inehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m7.52403 3.746"+
    "59 -0.4166 -1.99806C6.91497 0.825451 6.02576 0.220831 5.09658 0.381232L2.50046 0"+
    ".829389C1.51905 0.998806 0.876679 1.95195 1.088 2.9252l0.40441 1.8626zM19.9236 1"+
    "6.2298v5.9982l2.3122 0.0015c0.199 0.0001 0.3899 -0.0789 0.5306 -0.2195 0.1408 -0"+
    ".1407 0.2199 -0.3315 0.2199 -0.5305v-4.5012c0 -0.199 -0.0791 -0.3899 -0.2199 -0."+
    "5305 -0.1407 -0.1407 -0.3316 -0.2197 -0.5306 -0.2195zM8.5433 5.09285c0.53096 -0."+
    "09166 1.03908 0.25384 1.14906 0.78131l1.90324 9.12794 5.8268 -0.0068c0.5528 -0.0"+
    "006 1.0012 0.4473 1.0012 1v6.4665c0 0.5528 -0.4484 1.0007 -1.0012 1l-2.2097 -0.0"+
    "025v-2.5088c0 -0.5523 -0.4478 -1 -1 -1 -0.5523 0 -1 0.4477 -1 1v2.5126h-2.3282v-"+
    "2.5126c0 -0.5523 -0.4477 -1 -0.99996 -1 -0.55229 0 -1 0.4477 -1 1v2.5126H7.25408"+
    "c-1.68516 0 -3.14237 -1.1747 -3.49993 -2.8215L0.894591 7.47149c-0.120752 -0.5561"+
    "5 0.246319 -1.1008 0.807119 -1.19761z\" clip-rule=\"evenodd\" stroke-width=\"1\"></pa"+
    "th>\n</svg>")
},
{
  setName: "icon/health/orthopedics",
  name: "orthopedics",
  category: "health",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Medical-Specialt"+
    "y-Broken-Bone--Streamline-Ultimate\">\n  <desc>\n    Medical Specialty Broken Bone "+
    "Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.45 15"+
    ".59a0.52 0.52 0 0 0 0.14 -0.49 0.51 0.51 0 0 0 -0.34 -0.37l-1.13 -0.37A0.5 0.5 0"+
    " 0 1 9.8 14l-0.29 -1a0.52 0.52 0 0 0 -0.37 -0.36 0.53 0.53 0 0 0 -0.49 0.14L6.44"+
    " 15a0.3 0.3 0 0 1 -0.2 0.08 0.27 0.27 0 0 1 -0.18 -0.1l-0.25 -0.29a3.14 3.14 0 0"+
    " 0 -4.4 -0.06 3 3 0 0 0 2.18 5.21 0.48 0.48 0 0 1 0.5 0.5 3.09 3.09 0 0 0 5.26 2"+
    ".23 3 3 0 0 0 0 -4.32 0.63 0.63 0 0 0 -0.12 -0.1 0.25 0.25 0 0 1 0 -0.38Z\" fill="+
    "\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.09 7.71a3.1 3.1 0 0 0 -3.51 "+
    "-4.52 0.46 0.46 0 0 1 -0.38 0 0.5 0.5 0 0 1 -0.2 -0.36A3.07 3.07 0 0 0 13.32 2a3"+
    ".2 3.2 0 0 0 1.25 4.3 2.9 2.9 0 0 0 0.35 0.17 0.24 0.24 0 0 1 0.13 0.15 0.23 0.2"+
    "3 0 0 1 0 0.2l-1.71 2.91a0.52 0.52 0 0 0 0 0.51 0.52 0.52 0 0 0 0.43 0.27l1 0.05"+
    "a0.52 0.52 0 0 1 0.39 0.22l0.67 1a0.49 0.49 0 0 0 0.44 0.23 0.51 0.51 0 0 0 0.43"+
    " -0.26l1.7 -2.91a0.25 0.25 0 0 1 0.16 -0.12 0.28 0.28 0 0 1 0.2 0 0.71 0.71 0 0 "+
    "0 0.14 0.1 3.05 3.05 0 0 0 4.19 -1.11\" fill=\"#000000\" stroke-width=\"1\"></path>\n "+
    "   <path d=\"M4 10h2a1 1 0 0 0 0 -2H4a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width="+
    "\"1\"></path>\n    <path d=\"M6.3 6.69a1 1 0 0 0 1.4 -1.44l-1 -1a1 1 0 0 0 -1.43 1.4"+
    "3Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 6a1 1 0 0 0 1 -1V3a"+
    "1 1 0 0 0 -2 0v2a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <pat"+
    "h d=\"M20 14h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"><"+
    "/path>\n    <path d=\"M17.72 17.27a1 1 0 1 0 -1.44 1.4l1 1.06A1 1 0 0 0 18 20a1 1 "+
    "0 0 0 0.71 -1.7Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14 18a1 "+
    "1 0 0 0 -1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\""+
    "></path>\n  </g>\n</svg>")
}
,

{
  setName: "icon/health/surgery",
  name: "surgery",
  category: "health",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Surgery-Liposuct"+
    "ion--Streamline-Ultimate\">\n  <desc>\n    Surgery Liposuction Streamline Icon: htt"+
    "ps://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M18 9.49a7.41 7.41 0 0 1 -5.3"+
    "6 -2.26c-0.2 -0.21 -0.38 -0.43 -0.56 -0.65H12c-0.18 0.22 -0.36 0.44 -0.56 0.65a7"+
    ".44 7.44 0 0 1 -9.17 1.2c-0.6 8 -3.51 11.08 -0.19 14.67h0.68c0.2 -0.21 0.4 -0.41"+
    " 0.58 -0.63a0.51 0.51 0 0 1 0.71 0 0.49 0.49 0 0 1 0.06 0.67h15.82a0.5 0.5 0 0 1"+
    " 0.07 -0.67 0.5 0.5 0 0 1 0.7 0c0.19 0.22 0.38 0.42 0.59 0.63h0.94c3.34 -3.61 0."+
    "38 -6.72 -0.2 -14.82A7.45 7.45 0 0 1 18 9.49M6.93 18a11.75 11.75 0 0 1 -0.88 2.2"+
    "3 0.49 0.49 0 0 1 -0.44 0.27 0.64 0.64 0 0 1 -0.23 0 0.52 0.52 0 0 1 -0.22 -0.68"+
    " 11.11 11.11 0 0 0 0.81 -2 0.49 0.49 0 0 1 0.61 -0.34 0.5 0.5 0 0 1 0.35 0.52m-0"+
    ".06 -3a0.51 0.51 0 0 1 -0.5 -0.49 12.93 12.93 0 0 0 -0.26 -2.19 0.51 0.51 0 0 1 "+
    "0.39 -0.59 0.5 0.5 0 0 1 0.59 0.39 13 13 0 0 1 0.28 2.36 0.5 0.5 0 0 1 -0.5 0.46"+
    "Zm9.76 -0.52a15 15 0 0 1 0.28 -2.36 0.51 0.51 0 0 1 0.59 -0.39 0.5 0.5 0 0 1 0.3"+
    "9 0.59 12.93 12.93 0 0 0 -0.26 2.19 0.5 0.5 0 0 1 -0.5 0.49 0.51 0.51 0 0 1 -0.5"+
    " -0.58Zm2 6a0.59 0.59 0 0 1 -0.22 0 0.5 0.5 0 0 1 -0.45 -0.27 11.7 11.7 0 0 1 -0"+
    ".89 -2.21 0.49 0.49 0 0 1 0.34 -0.61 0.5 0.5 0 0 1 0.62 0.34 10.4 10.4 0 0 0 0.8"+
    " 2 0.5 0.5 0 0 1 -0.22 0.69Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path "+
    "d=\"M6 8a6 6 0 0 0 6 -6.13A6 6 0 1 0 23.93 2a6.18 6.18 0 0 0 -0.2 -1.56H0.27A6.18"+
    " 6.18 0 0 0 0.07 2 6 6 0 0 0 6 8m12 -4.81a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1m-12 0a1 "+
    "1 0 1 1 -1 1 1 1 0 0 1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</sv"+
    "g>")
},
{
  setName: "icon/misc/airplane",
  name: "airplane",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Airplane-Mode--S"+
    "treamline-Ultimate\">\n  <desc>\n    Airplane Mode Streamline Icon: https://streaml"+
    "inehq.com\n  </desc>\n  <g>\n    <path d=\"M14.58 19.51a0.25 0.25 0 0 1 -0.08 -0.18V"+
    "13l-4.93 5a0.29 0.29 0 0 0 -0.07 0.18v1.19a0.25 0.25 0 0 1 -0.08 0.18L8 20.92a1."+
    "5 1.5 0 0 0 1 2.58 7.24 7.24 0 0 0 2.85 -1.39 0.24 0.24 0 0 1 0.3 0A7.24 7.24 0 "+
    "0 0 15 23.5a1.5 1.5 0 0 0 1 -2.58Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    "+
    "<path d=\"M18.07 9.8a0.26 0.26 0 0 0 -0.35 0l-3.2 3.2c1.42 1 4.86 3.48 5.48 3.9a2"+
    ".49 2.49 0 0 0 1.5 0.59A2 2 0 0 0 22.82 14Z\" fill=\"#000000\" stroke-width=\"1\"></p"+
    "ath>\n    <path d=\"M23.71 0.29a1 1 0 0 0 -1.42 0l-6.84 6.84 -0.95 -1V3a2.4 2.4 0 "+
    "0 0 -0.2 -1 2.49 2.49 0 0 0 -4.6 0 2.4 2.4 0 0 0 -0.2 1v3.66l-3 2.65L1.18 14A2 2"+
    " 0 0 0 3 17.45a0.19 0.19 0 0 0 0.12 -0.07L9 12.68a0.34 0.34 0 0 1 0.5 0.32 0.37 "+
    "0.37 0 0 1 -0.1 0.24L0.29 22.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l22 -22a1 1 0 0"+
    " 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
}
,

{
  setName: "icon/misc/translate",
  name: "translate",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Translate--Strea"+
    "mline-Ultimate\">\n  <desc>\n    Translate Streamline Icon: https://streamlinehq.co"+
    "m\n  </desc>\n  <g>\n    <path d=\"M22.92 11H15.5a0.5 0.5 0 0 0 -0.5 0.5v0.41A3.08 3"+
    ".08 0 0 1 11.92 15h-0.42a0.5 0.5 0 0 0 -0.5 0.5v7.41A1.09 1.09 0 0 0 12.08 24h10"+
    ".84A1.09 1.09 0 0 0 24 22.91V12.08A1.08 1.08 0 0 0 22.92 11m-2.16 11.2a0.74 0.74"+
    " 0 0 1 -1 -0.44l-0.51 -1.35a0.25 0.25 0 0 0 -0.23 -0.16h-3.08a0.25 0.25 0 0 0 -0"+
    ".23 0.16l-0.51 1.35a0.75 0.75 0 1 1 -1.4 -0.53l2.53 -6.75a1.25 1.25 0 0 1 2.34 0"+
    "l2.53 6.75a0.75 0.75 0 0 1 -0.44 0.97\" fill=\"#000000\" stroke-width=\"1\"></path>\n "+
    "   <path d=\"M16.46 18.41a0.24 0.24 0 0 0 0 0.23 0.23 0.23 0 0 0 0.2 0.11h1.62a0."+
    "23 0.23 0 0 0 0.2 -0.11 0.24 0.24 0 0 0 0 -0.23l-0.81 -2.15a0.25 0.25 0 0 0 -0.4"+
    "6 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.78 5.61a0.25 0.25 "+
    "0 0 0 0 -0.24 0.25 0.25 0 0 0 -0.22 -0.12H5.45a0.25 0.25 0 0 0 -0.22 0.12 0.25 0"+
    ".25 0 0 0 0 0.24 8.07 8.07 0 0 0 1.08 1.66 0.25 0.25 0 0 0 0.38 0 8.07 8.07 0 0 "+
    "0 1.09 -1.66\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.92 13A1.0"+
    "8 1.08 0 0 0 13 11.91V1.08A1.08 1.08 0 0 0 11.92 0H1.08A1.08 1.08 0 0 0 0 1.08v1"+
    "0.83A1.09 1.09 0 0 0 1.08 13Zm-1.2 -2.31a0.74 0.74 0 0 1 -0.72 0.56 8.52 8.52 0 "+
    "0 1 -3.35 -1.58 0.24 0.24 0 0 0 -0.3 0A8.49 8.49 0 0 1 3 11.25a0.75 0.75 0 0 1 -"+
    "0.2 -1.48 7.56 7.56 0 0 0 2.37 -1.1 0.21 0.21 0 0 0 0.1 -0.17 0.29 0.29 0 0 0 0 "+
    "-0.2 9.48 9.48 0 0 1 -1.74 -2.89 0.25 0.25 0 0 0 -0.23 -0.16h-0.77a0.75 0.75 0 0"+
    " 1 0 -1.5h3a0.25 0.25 0 0 0 0.25 -0.25v-1a0.75 0.75 0 0 1 1.5 0v1a0.25 0.25 0 0 "+
    "0 0.25 0.25h3a0.75 0.75 0 0 1 0 1.5H9.7a0.25 0.25 0 0 0 -0.23 0.16A9.48 9.48 0 0"+
    " 1 7.78 8.3a0.29 0.29 0 0 0 0 0.2 0.21 0.21 0 0 0 0.1 0.17 7.56 7.56 0 0 0 2.37 "+
    "1.1 0.75 0.75 0 0 1 0.47 0.92\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path"+
    " d=\"M17.65 5.35a0.49 0.49 0 0 0 0.54 0.11 0.5 0.5 0 0 0 0.31 -0.46v-0.31a0.25 0."+
    "25 0 0 1 0.37 -0.22A4 4 0 0 1 21 8a1 1 0 0 0 2 0 6 6 0 0 0 -4.32 -5.75 0.26 0.26"+
    " 0 0 1 -0.18 -0.25V1a0.5 0.5 0 0 0 -0.85 -0.36l-2 2a0.5 0.5 0 0 0 0 0.71Z\" fill="+
    "\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 14a1 1 0 0 0 -1 1 6 6 0 0 0 4"+
    ".32 5.75 0.25 0.25 0 0 1 0.18 0.25v1a0.5 0.5 0 0 0 0.31 0.46 0.49 0.49 0 0 0 0.5"+
    "4 -0.11l2 -2a0.5 0.5 0 0 0 0 -0.71l-2 -2a0.5 0.5 0 0 0 -0.85 0.36v0.31a0.24 0.24"+
    " 0 0 1 -0.12 0.21 0.25 0.25 0 0 1 -0.25 0A4 4 0 0 1 3 15a1 1 0 0 0 -1 -1\" fill=\""+
    "#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
},
{
  setName: "icon/misc/desktop",
  name: "desktop",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Desktop-Computer"+
    "--Streamline-Ultimate\">\n  <desc>\n    Desktop Computer Streamline Icon: https://s"+
    "treamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.5 2a2 2 0 0 0 -2 -2h-19a2 2 0 0"+
    " 0 -2 2v12a2 2 0 0 0 2 2h19a2 2 0 0 0 2 -2Zm-2 11.5a0.5 0.5 0 0 1 -0.5 0.5H3a0.5"+
    " 0.5 0 0 1 -0.5 -0.5v-11A0.5 0.5 0 0 1 3 2h18a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000"+
    "000\" stroke-width=\"1\"></path>\n    <path d=\"m22.33 22.75 -1.25 -4.49a1 1 0 0 0 -1"+
    " -0.76H3.89a1 1 0 0 0 -1 0.75l-1.22 4.51a1 1 0 0 0 0.18 0.86 1 1 0 0 0 0.79 0.38"+
    "h18.72a1 1 0 0 0 0.79 -0.38 1 1 0 0 0 0.18 -0.86Zm-5.83 -1a0.5 0.5 0 0 1 -0.5 0."+
    "5H8a0.5 0.5 0 0 1 0 -1h8a0.5 0.5 0 0 1 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\">"+
    "</path>\n  </g>\n</svg>")
}
,

{
  setName: "icon/misc/watch",
  name: "watch",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Watch-Time--Stre"+
    "amline-Ultimate\">\n  <desc>\n    Watch Time Streamline Icon: https://streamlinehq."+
    "com\n  </desc>\n  <g>\n    <path d=\"M20 12a8 8 0 0 0 -4 -6.92V1.5A1.5 1.5 0 0 0 14."+
    "5 0h-5A1.5 1.5 0 0 0 8 1.5v3.58a8 8 0 0 0 0 13.85v3.57A1.5 1.5 0 0 0 9.5 24h5a1."+
    "5 1.5 0 0 0 1.5 -1.5v-3.57A8 8 0 0 0 20 12m-8 6a6 6 0 1 1 6 -6 6 6 0 0 1 -6 6\" f"+
    "ill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.75 11.69V9a0.75 0.75 0 0"+
    " 0 -1.5 0v3a0.75 0.75 0 0 0 0.22 0.53L14 15a0.76 0.76 0 0 0 1 0 0.75 0.75 0 0 0 "+
    "0 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
},
{
  setName: "icon/misc/code",
  name: "code",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Code--Str"+
    "eamline-Ultimate\">\n  <desc>\n    Folder Code Streamline Icon: https://streamlineh"+
    "q.com\n  </desc>\n  <path d=\"M22.5 4.5H11.74a0.5 0.5 0 0 1 -0.45 -0.28l-0.95 -1.89"+
    "A1.5 1.5 0 0 0 9 1.5H1.5A1.5 1.5 0 0 0 0 3v18a1.5 1.5 0 0 0 1.5 1.5h21A1.5 1.5 0"+
    " 0 0 24 21V6a1.5 1.5 0 0 0 -1.5 -1.5m-12.22 13a0.75 0.75 0 0 1 -1.06 0l-4 -4a0.7"+
    "5 0.75 0 0 1 0 -1.06l4 -4a0.75 0.75 0 0 1 1.06 1.06L7 12.82a0.25 0.25 0 0 0 0 0."+
    "36l3.29 3.29a0.75 0.75 0 0 1 -0.01 1.06Zm8 -4 -4 4a0.75 0.75 0 0 1 -1.06 -1.06l3"+
    ".29 -3.29a0.25 0.25 0 0 0 0 -0.36l-3.29 -3.26a0.75 0.75 0 0 1 1.06 -1.06l4 4a0.7"+
    "5 0.75 0 0 1 0 1.06Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>")
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
