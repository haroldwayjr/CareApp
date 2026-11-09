
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
const BATCH = [{"setName":"icon/health/pregnancy","name":"pregnancy","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Pregnancy-Vgr--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M16 5.56a1.08 1.08 0 0 0 -1.51 0l-0.56 0.56a0.3 0.3 0 0 0 0 0.41L15 7.63a0.28 0.28 0 0 0 0.41 0l0.59 -0.55a1.07 1.07 0 0 0 0 -1.52\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21.19 0.05 5.26 3.49a2.3 2.3 0 0 0 -1.77 1.77L0.05 21.19A2.33 2.33 0 0 0 2.81 24l15.93 -3.44a2.3 2.3 0 0 0 1.77 -1.77L24 2.81A2.33 2.33 0 0 0 21.19 0.05M8 13.49a10.59 10.59 0 0 1 3 6 0.87 0.87 0 0 1 -1 1 10.64 10.64 0 0 1 -6 -3l-1.31 -1.4a0.87 0.87 0 0 1 1.23 -1.23l1.37 1.37a9 9 0 0 0 3.38 2.11c0.12 0 0.29 -0.13 0.25 -0.25a8.87 8.87 0 0 0 -2.11 -3.37l-1.37 -1.38a0.87 0.87 0 1 1 1.23 -1.23Zm5 -4.12a0.87 0.87 0 0 1 -1.23 1.23l-0.45 -0.46a1.07 1.07 0 0 0 -1.52 0 1.06 1.06 0 0 0 0 1.51l2.74 2.75a1.07 1.07 0 0 0 1.52 0 1.09 1.09 0 0 0 0.24 -1.16c0 -0.06 -0.09 -0.19 -0.17 -0.11l-0.21 0.21a0.87 0.87 0 0 1 -1.23 -1.23l0.91 -0.91a0.87 0.87 0 0 1 1.23 0l0.46 0.45a2.81 2.81 0 0 1 -4 4l-2.65 -2.77a2.81 2.81 0 1 1 4 -4Zm8.49 -0.3a0.85 0.85 0 0 1 -0.25 0.61 0.88 0.88 0 0 1 -0.62 0.26h-2.86c-0.19 0 -0.28 0.17 -0.18 0.28l1 1a0.87 0.87 0 1 1 -1.23 1.23l-5.51 -5.51a0.87 0.87 0 0 1 0 -1.23l1.27 -1.27a2.92 2.92 0 0 1 3.83 -0.33 2.8 2.8 0 0 1 0.66 3.66 0.29 0.29 0 0 0 0.25 0.43h2.84a0.87 0.87 0 0 1 0.87 0.87Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/battery.charging","name":"battery-charging","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Battery-Charging-2--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M21.67 17.48a0.76 0.76 0 0 0 -0.75 0.75v3.11a0.41 0.41 0 0 1 -0.43 0.39h-4.72a0.75 0.75 0 0 0 0 1.5h4.72a1.92 1.92 0 0 0 1.93 -1.89v-3.11a0.76 0.76 0 0 0 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.85 14a0.75 0.75 0 0 0 -1 -0.21l-0.39 0.26a1.69 1.69 0 0 0 -1.69 -1.69h-0.08v-0.67a0.76 0.76 0 0 0 -0.75 -0.75h-3.58a0.75 0.75 0 0 0 -0.75 0.75v0.67a1.92 1.92 0 0 0 -1.78 1.89v5.54l-1.08 0.72a0.76 0.76 0 0 0 -0.21 1 0.77 0.77 0 0 0 0.63 0.34 0.69 0.69 0 0 0 0.41 -0.13L23.64 15a0.76 0.76 0 0 0 0.21 -1m-8.52 0.23a0.42 0.42 0 0 1 0.44 -0.39h0.59a0.76 0.76 0 0 0 0.75 -0.75v-0.67h2V13a0.75 0.75 0 0 0 0.75 0.75h0.83a0.19 0.19 0 0 1 0.19 0.19v1l-5.59 3.72Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.61 5.48v2l-1.08 -1.12a0.75 0.75 0 1 0 -1.06 1.06l2.36 2.37a0.75 0.75 0 0 0 1.06 0l2.37 -2.37a0.75 0.75 0 0 0 -1.06 -1.06l-1.09 1.09v-2a2.64 2.64 0 0 0 -2.64 -2.64h-4.72a0.75 0.75 0 0 0 0 1.5h4.72a1.14 1.14 0 0 1 1.14 1.17\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.81 20.32H6.08a1.15 1.15 0 0 1 -1.14 -1.14v-2L6 18.29a0.74 0.74 0 0 0 0.53 0.22 0.71 0.71 0 0 0 0.53 -0.22 0.74 0.74 0 0 0 0 -1.06l-2.34 -2.36a0.77 0.77 0 0 0 -1.06 0L1.3 17.23a0.75 0.75 0 0 0 1.06 1.06l1.08 -1.08v2a2.65 2.65 0 0 0 2.64 2.64h4.73a0.75 0.75 0 1 0 0 -1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.84 13.5a1.89 1.89 0 0 0 2 -1.75V4.47A1.86 1.86 0 0 0 7 2.73V1.52a0.74 0.74 0 0 0 -0.75 -0.75H2.6a0.75 0.75 0 0 0 -0.75 0.75v1.21A1.85 1.85 0 0 0 0 4.47v7.28a1.89 1.89 0 0 0 2 1.75ZM2 4.22h0.6a0.75 0.75 0 0 0 0.75 -0.75v-1.2H5.5v1.2a0.76 0.76 0 0 0 0.75 0.75h0.59c0.3 0 0.49 0.16 0.49 0.25v1.91h-5.8V4.47c0 -0.09 0.19 -0.25 0.47 -0.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/light.mode","name":"light-mode","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Light-Mode-Bw--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M24 2a2 2 0 0 0 -2 -2H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2Zm-2 19.5a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-19a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.47 17a0.74 0.74 0 0 0 0.72 0.19 0.73 0.73 0 0 0 0.53 -0.52l0.54 -2a0.25 0.25 0 0 1 0.48 0l0.54 2a0.73 0.73 0 0 0 0.53 0.52 0.63 0.63 0 0 0 0.19 0 0.75 0.75 0 0 0 0.53 -0.22c1.11 -1.11 1.72 -3.22 1.72 -5.95V8.49a0.75 0.75 0 0 0 -1.5 0v2.58a12.08 12.08 0 0 1 -0.25 2.62 0.24 0.24 0 0 1 -0.23 0.2 0.25 0.25 0 0 1 -0.25 -0.18l-0.8 -2.92a0.75 0.75 0 0 0 -1.44 0L14 13.71a0.25 0.25 0 0 1 -0.25 0.18 0.24 0.24 0 0 1 -0.23 -0.2 12.08 12.08 0 0 1 -0.25 -2.62V8.49a0.75 0.75 0 0 0 -1.5 0v2.58c-0.02 2.73 0.59 4.84 1.7 5.93\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 17.24H7a2.75 2.75 0 0 0 2.05 -4.58 0.25 0.25 0 0 1 0 -0.34A2.75 2.75 0 0 0 7 7.74H5.5a0.75 0.75 0 0 0 -0.75 0.75v8a0.76 0.76 0 0 0 0.75 0.75m2.75 -2.75A1.25 1.25 0 0 1 7 15.74h-0.5a0.25 0.25 0 0 1 -0.25 -0.25v-2a0.25 0.25 0 0 1 0.25 -0.25H7a1.25 1.25 0 0 1 1.25 1.25m-2 -5a0.25 0.25 0 0 1 0.25 -0.25H7a1.25 1.25 0 1 1 0 2.5h-0.5a0.25 0.25 0 0 1 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/keyboard","name":"keyboard","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Keyboard--Streamline-Ultimate\">\n  \n  <path d=\"M21.5 13H4.75a0.25 0.25 0 0 1 -0.25 -0.25v-0.25a2 2 0 0 1 2 -2h13a4.5 4.5 0 0 0 0 -9H13a0.5 0.5 0 0 1 -0.5 -0.5 1 1 0 0 0 -2 0A2.5 2.5 0 0 0 13 3.5h6.5a2.5 2.5 0 0 1 0 5h-13a4 4 0 0 0 -4 4v0.26a0.25 0.25 0 0 1 -0.23 0.25A2.51 2.51 0 0 0 0 15.5v6A2.5 2.5 0 0 0 2.5 24h19a2.5 2.5 0 0 0 2.5 -2.5v-6a2.5 2.5 0 0 0 -2.5 -2.5m-0.25 7.5h-0.5a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1m0 -3h-0.5a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1m-14.75 2h11a0.5 0.5 0 0 1 0 1h-11a0.5 0.5 0 0 1 0 -1m-0.75 -2a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1Zm2.5 -0.5a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3 0a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3 0a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3.51 0.5a0.5 0.5 0 0 1 0 -1h0.49a0.5 0.5 0 0 1 0 1Zm-14.51 -1a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 0 -1Zm-0.5 3h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 0 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/tablet","name":"tablet","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tablet--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M19 0H5a2.5 2.5 0 0 0 -2.5 2.5v19A2.5 2.5 0 0 0 5 24h14a2.5 2.5 0 0 0 2.5 -2.5v-19A2.5 2.5 0 0 0 19 0M5 4.5a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1H6a1 1 0 0 1 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.5 14.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 14.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/scanner","name":"scanner","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Scanner--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M0.33 20a0.25 0.25 0 0 0 -0.19 0.09 0.28 0.28 0 0 0 -0.05 0.2C0.46 22.59 2.45 24 5.5 24h13c3.05 0 5 -1.41 5.41 -3.71a0.28 0.28 0 0 0 -0.05 -0.2 0.25 0.25 0 0 0 -0.19 -0.09Zm19.17 1a0.75 0.75 0 1 1 -0.75 0.75 0.76 0.76 0 0 1 0.75 -0.75m-3 0a0.75 0.75 0 1 1 -0.75 0.75 0.76 0.76 0 0 1 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4 9.75a0.25 0.25 0 0 0 -0.23 0.16L0.3 18.66a0.27 0.27 0 0 0 0 0.23 0.26 0.26 0 0 0 0.23 0.11h22.94a0.26 0.26 0 0 0 0.21 -0.11 0.27 0.27 0 0 0 0 -0.23L20.2 9.91a0.25 0.25 0 0 0 -0.2 -0.16Zm15.88 7.53a0.48 0.48 0 0 1 -0.41 0.22H4.5a0.48 0.48 0 0 1 -0.41 -0.22 0.45 0.45 0 0 1 0 -0.46l2 -5a0.48 0.48 0 0 1 0.46 -0.32h11a0.48 0.48 0 0 1 0.46 0.32l2 5a0.45 0.45 0 0 1 -0.1 0.46Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.09 8.25a0.24 0.24 0 0 0 0.24 -0.2L22 0.61a0.49 0.49 0 0 0 -0.1 -0.42 0.51 0.51 0 0 0 -0.4 -0.19h-19a0.51 0.51 0 0 0 -0.39 0.19 0.49 0.49 0 0 0 -0.11 0.42l1.67 7.44a0.24 0.24 0 0 0 0.24 0.2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
