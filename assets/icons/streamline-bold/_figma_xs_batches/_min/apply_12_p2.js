
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
const BATCH = [{"setName":"icon/status/notification","name":"notification","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alert-Notification--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M12 14a1 1 0 0 0 -1 1v5H2V6.5a0.5 0.5 0 0 1 0.5 -0.5H8a1 1 0 0 0 0 -2H2.5A2.5 2.5 0 0 0 0 6.5v15A2.5 2.5 0 0 0 2.5 24h8a2.5 2.5 0 0 0 2.5 -2.5V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 2A6.83 6.83 0 0 0 18.76 0.18a6.71 6.71 0 0 0 -8.06 5.06 6.63 6.63 0 0 0 -0.08 3.31l-2.37 2.94a0.74 0.74 0 0 0 -0.05 0.86 0.75 0.75 0 0 0 0.79 0.34l3.67 -0.79a6.73 6.73 0 0 0 4.51 1.72A6.81 6.81 0 0 0 24 6.82 6.79 6.79 0 0 0 22 2m-5 0.75a0.75 0.75 0 0 1 0.75 0.75v3a0.75 0.75 0 0 1 -1.5 0v-3a0.76 0.76 0 0 1 0.75 -0.75m0 5.88a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/play","name":"play","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Button-Play--Streamline-Ultimate\">\n  \n  <path fill=\"#000000\" d=\"M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236 3.35977 3.34094 1.8217 5.21509 0.913451 7.4078 0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411s1.605908 4.466 3.284138 6.1442 3.81643 2.8211 6.1442 3.2841c2.32778 0.463 4.74058 0.2254 6.93328 -0.6828 2.1927 -0.9083 4.0669 -2.4464 5.3854 -4.4198C23.2962 16.6935 24 14.3734 24 12c0 -3.1826 -1.2643 -6.23485 -3.5147 -8.48528C18.2348 1.26428 15.1826 0 12 0m4.83 12.89 -7.37999 3.69c-0.15223 0.0767 -0.32155 0.1132 -0.49186 0.1061 -0.17032 -0.0071 -0.33598 -0.0577 -0.48126 -0.1469 -0.14528 -0.0891 -0.26536 -0.214 -0.34882 -0.3626s-0.12755 -0.3161 -0.12806 -0.4866V8.31c-0.0012 -0.17131 0.04163 -0.34006 0.12439 -0.49006 0.08276 -0.14999 0.20266 -0.27622 0.34822 -0.36656 0.14555 -0.09035 0.31188 -0.14179 0.48303 -0.14938 0.17114 -0.0076 0.34137 0.0289 0.49436 0.106L16.83 11.1c0.1664 0.0829 0.3064 0.2106 0.4043 0.3687 0.0978 0.1581 0.1496 0.3404 0.1496 0.5263s-0.0518 0.3682 -0.1496 0.5263c-0.0979 0.1581 -0.2379 0.2858 -0.4043 0.3687\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/skip.back","name":"skip-back","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Previous--Streamline-Ultimate\">\n  \n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5 15.38a1 1 0 0 1 -1.67 0.74l-3.75 -3.38a1 1 0 0 1 0 -1.48l3.75 -3.38a1 1 0 0 1 1.67 0.74ZM10 8v8a1 1 0 0 1 -1 1H8a1 1 0 0 1 -1 -1V8a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/video","name":"video","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Video-Player--Streamline-Ultimate\">\n  \n  <path d=\"M19.5 2h-15A4.51 4.51 0 0 0 0 6.5v11A4.51 4.51 0 0 0 4.5 22h15a4.51 4.51 0 0 0 4.5 -4.5v-11A4.51 4.51 0 0 0 19.5 2m-3.57 11.34 -5.76 2.88A1.5 1.5 0 0 1 8 14.88V9.12a1.49 1.49 0 0 1 2.17 -1.34l5.76 2.88a1.49 1.49 0 0 1 0 2.68\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/headphones","name":"headphones","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Headphones--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M7.44 14a5 5 0 0 0 0.23 10 0.31 0.31 0 0 0 0.33 -0.33v-9.15a0.51 0.51 0 0 0 -0.56 -0.52\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.56 14a0.51 0.51 0 0 0 -0.56 0.5v9.12a0.35 0.35 0 0 0 0.37 0.34 5 5 0 0 0 0.19 -10Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 0A12 12 0 0 0 0 12v6a1 1 0 0 0 2 0v-6a10 10 0 0 1 20 0v6a1 1 0 0 0 2 0v-6A12 12 0 0 0 12 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/clipboard","name":"clipboard","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Insert-Row-From-Clipboard--Streamline-Ultimate\">\n  \n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M14.4 4.18005c-0.1 0.3 -0.4 0.5 -0.7 0.5H7.30002c-0.3 0 -0.60002 -0.2 -0.70002 -0.5l-1 -3c-0.17812 -0.570675 0.24075 -0.999996 0.70002 -0.999996H14.7c0.5158 0 0.8615 0.515539 0.7 0.999996zm1.423 0.47435c-0.3148 0.94443 -1.2116 1.52565 -2.123 1.52565H7.30002c-0.91128 0 -1.80821 -0.58116 -2.12304 -1.52565L4.29218 2H2.25C1.03579 2 0 3.03579 0 4.25v17.5C0 22.9642 1.03579 24 2.25 24h10.6607c-0.1701 -0.3377 -0.2659 -0.7192 -0.2659 -1.1232V10.0027c0 -1.38073 1.1193 -2.50001 2.5 -2.50001H21V4.25C21 3.03579 19.9642 2 18.75 2h-2.0422zm-1.6782 5.3483c0 -0.5523 0.4477 -1.00001 1 -1.00001h7.6501c0.5523 0 1 0.44771 1 1.00001v12.8741c0 0.5523 -0.4477 1 -1 1h-7.6501c-0.5523 0 -1 -0.4477 -1 -1zm7.6501 1v2.2914h-5.6501v-2.2914zm0 4.2914h-5.6501v2.2913h5.6501zm-5.6501 6.5827v-2.2914h5.6501v2.2914z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
