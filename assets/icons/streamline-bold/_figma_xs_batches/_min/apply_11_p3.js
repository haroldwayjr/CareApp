
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
const BATCH = [{"setName":"icon/files/parcel","name":"parcel","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M20.0051 4.8479c1.1411 0.03979 2.2694 0.5344 3.0342 1.49121 0.7714 0.96557 1.1134 2.3237 0.835 3.97269 -0.436 2.5803 -1.5923 5.5292 -4.1973 7.4375 -1.3526 0.9907 -3.0521 1.6676 -5.1641 1.8896 2.0958 -1.2025 3.4674 -2.6367 4.3672 -4.0664 1.3518 -2.148 1.5924 -4.2143 1.7256 -5.2285 0.054 -0.4106 -0.2349 -0.78773 -0.6455 -0.8418 -0.4103 -0.05363 -0.7866 0.23525 -0.8408 0.6455 -0.1313 0.9996 -0.3455 2.7763 -1.5088 4.625 -1.082 1.7193 -3.0283 3.563 -6.6543 4.832 -1.10308 -0.1212 -2.29011 -0.3406 -3.56543 -0.6718 -0.93405 -0.214 -1.82528 -0.5729 -2.64453 -1.0381 3.33666 0.1369 5.57356 -0.4383 7.11226 -1.3985 1.3517 -0.8436 2.0939 -1.9415 2.5664 -2.9414 0.2332 -0.4598 0.4238 -0.9351 0.5655 -1.415 0.1422 -0.4815 0.5786 -0.8352 1.0801 -0.8106l0.8378 0.042c0.1798 0.0087 0.351 -0.0803 0.4473 -0.2324 0.0959 -0.1521 0.1034 -0.3443 0.0186 -0.5029l-1.3848 -2.58302c-0.1421 -0.2657 -0.1621 -0.58509 -0.0195 -0.85059 0.2247 -0.41846 0.5011 -0.78599 0.8193 -1.09961 0.8946 -0.88137 2.0748 -1.29429 3.2158 -1.25488M1.25806 4.78833c0.54837 -0.0635 1.04452 0.32969 1.1084 0.87793 0.04297 0.37068 0.15103 0.8376 0.32324 1.36816 0.85065 -0.08764 1.74995 0.24948 2.55664 0.93262 0.47143 0.3994 0.94526 0.97629 1.41308 1.50586 0.49084 0.5556 1.04099 1.1409 1.74024 1.6855 1.04871 0.8167 2.47594 1.5695 4.58784 1.9219 -0.3917 0.7771 -0.9595 1.5418 -1.9238 2.1436 -0.4049 0.2526 -0.8908 0.4796 -1.47557 0.6689 -1.2344 -0.4765 -2.20891 -1.071 -2.99707 -1.7597 -1.25378 -1.096 -2.08891 -2.4699 -2.73828 -4.0977 -0.1534 -0.38459 -0.589 -0.5721 -0.97363 -0.41894 -0.38463 0.15342 -0.57218 0.58894 -0.41894 0.97364 0.70642 1.7709 1.65692 3.3734 3.14355 4.6728 0.45653 0.399 0.96066 0.7626 1.51562 1.0948 -1.22097 0.1011 -2.69956 0.0755 -4.49609 -0.1397 -0.03085 -0.0037 -0.06149 -0.005 -0.0918 -0.0049 -0.1617 -0.1605 -0.31833 -0.3246 -0.46679 -0.4931C0.733645 14.2085 -0.114022 12.3201 0.020752 10.4846c0.0719476 -0.97696 0.374088 -1.84587 0.890625 -2.47166C0.629571 7.21979 0.45054 6.49562 0.381104 5.89673c-0.063186 -0.54783 0.329438 -1.044 0.876956 -1.1084\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/shelf","name":"shelf","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shelf-Tv--Streamline-Ultimate\">\n  \n  <path d=\"M24 13.5a1.5 1.5 0 0 0 -1.5 -1.5h-9a0.5 0.5 0 0 1 -0.5 -0.5V11a0.5 0.5 0 0 1 0.5 -0.5H18a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2H6a2 2 0 0 0 -2 2v6.5a2 2 0 0 0 2 2h4.5a0.5 0.5 0 0 1 0.5 0.5v0.5a0.5 0.5 0 0 1 -0.5 0.5h-9A1.5 1.5 0 0 0 0 13.5v10a0.5 0.5 0 0 0 0.5 0.5H4a0.48 0.48 0 0 0 0.48 -0.37L5 21.58A1.29 1.29 0 0 1 6 21h12a1.31 1.31 0 0 1 1 0.58l0.57 2.06A0.5 0.5 0 0 0 20 24h3.5a0.5 0.5 0 0 0 0.5 -0.5Zm-13.5 4a0.5 0.5 0 0 1 -0.5 0.5H3a0.5 0.5 0 0 1 -0.5 -0.5v-2A0.5 0.5 0 0 1 3 15h7a0.5 0.5 0 0 1 0.5 0.5Zm-4 -9A0.5 0.5 0 0 1 6 8V2.5a0.5 0.5 0 0 1 0.5 -0.5h11a0.5 0.5 0 0 1 0.5 0.5V8a0.5 0.5 0 0 1 -0.5 0.5Zm15 9a0.5 0.5 0 0 1 -0.5 0.5h-7a0.5 0.5 0 0 1 -0.5 -0.5v-2a0.5 0.5 0 0 1 0.5 -0.5h7a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/folder.star","name":"folder-star","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Star--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M12.26 13h1a0.51 0.51 0 0 0 0.46 -0.3c0.25 -0.59 0.8 -1.84 0.81 -1.87a3.3 3.3 0 0 1 5.89 0l0.15 0.35a0.21 0.21 0 0 0 0.41 0V4.5A1.5 1.5 0 0 0 19.5 3H9.62a0.51 0.51 0 0 1 -0.45 -0.28L8.22 0.83A1.49 1.49 0 0 0 6.88 0H1.5A1.5 1.5 0 0 0 0 1.5v15A1.5 1.5 0 0 0 1.5 18h7.63a0.25 0.25 0 0 0 0.22 -0.37A3.18 3.18 0 0 1 9.24 15a3.23 3.23 0 0 1 3.02 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.61 17.14a1.28 1.28 0 0 0 0.3 -1.38 1.23 1.23 0 0 0 -1.17 -0.76h-2.5a0.25 0.25 0 0 1 -0.23 -0.15l-1.35 -3.12a1.29 1.29 0 0 0 -2.3 0L15 14.85a0.25 0.25 0 0 1 -0.23 0.15h-2.5a1.23 1.23 0 0 0 -1.17 0.76 1.28 1.28 0 0 0 0.3 1.38l2.21 2a0.26 0.26 0 0 1 0.07 0.29l-1.23 2.81a1.29 1.29 0 0 0 1.82 1.62l3.12 -1.75a0.21 0.21 0 0 1 0.24 0l3.12 1.75a1.29 1.29 0 0 0 1.82 -1.62l-1.24 -2.84a0.26 0.26 0 0 1 0.07 -0.29Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/gift","name":"gift","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Gift-Box--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M13 12a0.5 0.5 0 0 0 0.5 0.5H22a1.76 1.76 0 0 0 1.75 -1.75v-2A1.75 1.75 0 0 0 22 7h-8.5a0.5 0.5 0 0 0 -0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.75 12.5H11a0.5 0.5 0 0 0 0.5 -0.5V7.5A0.5 0.5 0 0 0 11 7H2A1.75 1.75 0 0 0 0.25 8.75v2A1.76 1.76 0 0 0 2 12.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 14.5a0.5 0.5 0 0 0 -0.5 -0.5H2.75a0.5 0.5 0 0 0 -0.5 0.5v7.75A1.76 1.76 0 0 0 4 24h7a0.5 0.5 0 0 0 0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.5 14a0.5 0.5 0 0 0 -0.5 0.5v9a0.5 0.5 0 0 0 0.5 0.5H20a1.76 1.76 0 0 0 1.75 -1.75V14.5a0.5 0.5 0 0 0 -0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13 6.71A1 1 0 0 0 14 7c1.18 -0.29 4 -1 4.89 -1.92A3 3 0 0 0 14.7 0.86c-0.75 0.76 -1.48 3.08 -1.92 4.9a1 1 0 0 0 0.22 0.95m3.08 -4.43a1 1 0 1 1 1.35 1.35 8.79 8.79 0 0 1 -2.28 0.93 8.79 8.79 0 0 1 0.97 -2.28Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.72 5.76c-0.44 -1.82 -1.17 -4.14 -1.92 -4.9a3 3 0 1 0 -4.18 4.19c0.86 0.87 3.71 1.63 4.89 1.92a1 1 0 0 0 1 -0.26 1 1 0 0 0 0.21 -0.95M7 3.63a1 1 0 0 1 1.38 -1.35 8.79 8.79 0 0 1 0.93 2.28A8.79 8.79 0 0 1 7 3.63\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/barcode","name":"barcode","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Barcode--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M5 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 3H3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3 -3V6a3 3 0 0 0 -3 -3m1 15a1 1 0 0 1 -1 1H3a1 1 0 0 1 -1 -1V6a1 1 0 0 1 1 -1h18a1 1 0 0 1 1 1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/mri","name":"mri","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Radiology-Scan-Mri--Streamline-Ultimate\">\n  \n  <path d=\"M24 4.51A2.51 2.51 0 0 0 21.5 2l-3.8 0a0.25 0.25 0 0 1 -0.17 0A8.34 8.34 0 0 0 12 0a8.4 8.4 0 0 0 -5.52 1.94 0.25 0.25 0 0 1 -0.17 0.06H2.5A2.5 2.5 0 0 0 0 4.5v19a0.5 0.5 0 0 0 0.5 0.5h23a0.5 0.5 0 0 0 0.5 -0.5Zm-9.54 -0.12a0.52 0.52 0 0 1 0.31 0.29 0.47 0.47 0 0 1 0 0.43L14 6.45a0.5 0.5 0 0 1 -0.57 0.24 5.48 5.48 0 0 0 -2.86 0 0.49 0.49 0 0 1 -0.57 -0.24l-0.74 -1.34a0.47 0.47 0 0 1 0 -0.43 0.52 0.52 0 0 1 0.31 -0.29 8 8 0 0 1 4.92 0Zm2.84 15.34a1 1 0 0 1 0.2 0.6V21a1 1 0 0 1 -1 1h-9a1 1 0 0 1 -1 -1v-0.67a1 1 0 0 1 0.2 -0.6l2.5 -4.33a1 1 0 0 1 0.8 -0.4h4a1 1 0 0 1 0.8 0.4ZM7.17 5.63a0.51 0.51 0 0 1 0.41 -0.09 0.49 0.49 0 0 1 0.33 0.25l0.74 1.32a0.51 0.51 0 0 1 -0.12 0.63A5.48 5.48 0 0 0 6.5 12a5.37 5.37 0 0 0 0.89 3 0.51 0.51 0 0 1 0 0.53l-0.81 1.41a0.54 0.54 0 0 1 -0.4 0.25 0.52 0.52 0 0 1 -0.42 -0.19A8 8 0 0 1 7.17 5.63M18.24 17a0.52 0.52 0 0 1 -0.43 0.19 0.54 0.54 0 0 1 -0.4 -0.25l-0.81 -1.41a0.51 0.51 0 0 1 0 -0.53 5.37 5.37 0 0 0 0.89 -3 5.48 5.48 0 0 0 -2 -4.26 0.49 0.49 0 0 1 -0.12 -0.63l0.74 -1.32a0.49 0.49 0 0 1 0.33 -0.25 0.51 0.51 0 0 1 0.41 0.09A8 8 0 0 1 18.24 17\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
