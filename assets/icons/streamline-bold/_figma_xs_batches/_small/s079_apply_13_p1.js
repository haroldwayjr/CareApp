
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

const BATCH = [{"setName":"icon/misc/schedule","name":"schedule","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Scheduled-Phone-Call-Calendar-2--Streamline-Ultimate\">\n  <desc>\n    Scheduled Phone Call Calendar 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M19.5 12c0.3315 0 0.6494 0.1318 0.8838 0.3662s0.3662 0.5523 0.3662 0.8838v2h2c0.3315 0 0.6494 0.1318 0.8838 0.3662S24 16.1685 24 16.5v3c0 0.3315 -0.1318 0.6494 -0.3662 0.8838s-0.5523 0.3662 -0.8838 0.3662h-2v2c0 0.3315 -0.1318 0.6494 -0.3662 0.8838S19.8315 24 19.5 24h-3c-0.3315 0 -0.6494 -0.1318 -0.8838 -0.3662s-0.3662 -0.5523 -0.3662 -0.8838v-2h-2c-0.3315 0 -0.6494 -0.1318 -0.8838 -0.3662S12 19.8315 12 19.5v-3c0 -0.3315 0.1318 -0.6494 0.3662 -0.8838s0.5523 -0.3662 0.8838 -0.3662h2v-2c0 -0.3315 0.1318 -0.6494 0.3662 -0.8838S16.1685 12 16.5 12zm-15 -8.5h-2c-0.27614 0 -0.5 0.22386 -0.5 0.5v15.5c0 0.2761 0.22386 0.5 0.5 0.5h8.0469c0.0999 0.5454 0.3616 1.052 0.7588 1.4492 0.2322 0.2323 0.503 0.4159 0.7959 0.5508H2.5C1.11929 22 0 20.8807 0 19.5V4c1.289e-7 -1.38071 1.11929 -2.5 2.5 -2.5h2zm7.1865 1.80762c0.2893 0.03779 0.5527 0.18359 0.7403 0.40625l0.4248 0.42383c0.5031 0.43843 0.8565 1.02398 1.0097 1.67382 0.1546 0.65573 0.0972 1.34346 -0.1631 1.96485 -0.0045 0.01088 -0.0095 0.0221 -0.0156 0.03222 -1.4083 2.34851 -3.3742 4.31431 -5.72264 5.72261 -0.0099 0.006 -0.02063 0.0112 -0.03125 0.0157 -0.62129 0.2627 -1.31023 0.3208 -1.9668 0.166 -0.65031 -0.1534 -1.2347 -0.5088 -1.67187 -1.0137l-0.00098 0.001 -0.41992 -0.4219c-0.2248 -0.1877 -0.37217 -0.4522 -0.41016 -0.7431 -0.03892 -0.2985 0.03928 -0.6005 0.21778 -0.8428l0.02441 -0.0283 1.36817 -1.3682 0.02832 -0.0244 0.09375 -0.0625c0.22415 -0.1339 0.48795 -0.1893 0.74902 -0.1553 0.2985 0.0389 0.57034 0.192 0.75879 0.4268 0.10756 0.1339 0.26327 0.2208 0.43359 0.2431 0.16706 0.0218 0.33567 -0.0215 0.47266 -0.1191l2.15332 -2.15333c0.09593 -0.13639 0.13782 -0.30402 0.11621 -0.46972 -0.02234 -0.17043 -0.11008 -0.32601 -0.24414 -0.4336 -0.23449 -0.18843 -0.38687 -0.46048 -0.42578 -0.75879 -0.03887 -0.29835 0.03839 -0.6005 0.2168 -0.84277l0.02539 -0.02832L10.8145 5.5498c0.0088 -0.00881 0.0192 -0.01701 0.0293 -0.02441 0.2422 -0.17844 0.5444 -0.25663 0.8427 -0.21777M16.5 0c0.5523 0 1 0.447715 1 1v0.5h3C21.8807 1.5 23 2.61929 23 4v9.7666c-0.0828 -0.0076 -0.1662 -0.0117 -0.25 -0.0117h-0.5v-0.5c0 -0.7298 -0.2902 -1.4289 -0.8057 -1.9444 -0.1361 -0.1361 -0.2854 -0.2558 -0.4443 -0.3593V4c0 -0.27614 -0.2239 -0.5 -0.5 -0.5h-3V4c0 0.55228 -0.4477 1 -1 1s-1 -0.44772 -1 -1V1c0 -0.552285 0.4477 -1 1 -1M7 0c0.55228 0 1 0.447715 1 1v0.5h6v2H8V4c0 0.55228 -0.44772 1 -1 1s-1 -0.44772 -1 -1V1c0 -0.552285 0.44772 -1 1 -1\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/rain","name":"rain","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rain-Umbrella--Streamline-Ultimate\">\n  <desc>\n    Rain Umbrella Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.32 16.9a0.25 0.25 0 0 0 -0.22 0 0.26 0.26 0 0 0 -0.1 0.2v4.11a2.75 2.75 0 0 0 5.5 0 1 1 0 0 0 -2 0 0.75 0.75 0 0 1 -1.5 0v-4.07a0.26 0.26 0 0 0 -0.1 -0.2 0.25 0.25 0 0 0 -0.22 0 2.36 2.36 0 0 1 -1.36 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 0a1 1 0 0 0 -1 1v0.32a0.25 0.25 0 0 1 -0.22 0.25A12.16 12.16 0 0 0 0 14v0.5a1 1 0 0 0 2 0c0 -0.53 0.7 -1 1.5 -1s1.5 0.5 1.5 1a1 1 0 0 0 2 0c0 -0.41 0.78 -1 2 -1s2 0.59 2 1a1 1 0 0 0 2 0c0 -0.41 0.78 -1 2 -1s2 0.59 2 1a1 1 0 0 0 2 0c0 -0.53 0.7 -1 1.5 -1s1.5 0.47 1.5 1a1 1 0 0 0 2 0V14A12.16 12.16 0 0 0 13.22 1.57a0.25 0.25 0 0 1 -0.22 -0.25V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/umbrella","name":"umbrella","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M12 0c6.6274 0 12 5.37258 12 12 0 6.6274 -5.3726 12 -12 12 -6.62742 0 -12 -5.3726 -12 -12C0 5.37258 5.37258 0 12 0m0 3c-0.4142 0 -0.75 0.33579 -0.75 0.75v0.53516c-4.20481 0.37898 -7.5 3.91135 -7.5 8.21484v0.5c0 0.4142 0.33579 0.75 0.75 0.75s0.75 -0.3358 0.75 -0.75c0 -0.2667 0.33891 -0.75 1.125 -0.75 0.68804 0 1.03294 0.3704 1.1084 0.6416L7.5 13l0.00391 0.0771c0.03862 0.378 0.35793 0.6729 0.74609 0.6729 0.38813 0 0.70748 -0.2949 0.74609 -0.6729L9 13c0 -0.2667 0.33881 -0.75 1.125 -0.75 0.7861 0 1.125 0.4833 1.125 0.75v5.25c0 0.4142 -0.3358 0.75 -0.75 0.75s-0.75 -0.3358 -0.75 -0.75v-0.5c0 -0.4142 -0.33579 -0.75 -0.75 -0.75s-0.75 0.3358 -0.75 0.75v0.5c0 1.2426 1.00736 2.25 2.25 2.25 1.2426 0 2.25 -1.0074 2.25 -2.25V13c0 -0.2667 0.3389 -0.75 1.125 -0.75 0.7862 0 1.125 0.4833 1.125 0.75 0 0.4142 0.3358 0.75 0.75 0.75s0.75 -0.3358 0.75 -0.75c0 -0.2667 0.3389 -0.75 1.125 -0.75s1.125 0.4833 1.125 0.75c0 0.4142 0.3358 0.75 0.75 0.75 0.3882 0 0.7075 -0.2949 0.7461 -0.6729L20.25 13v-0.5c0 -4.30348 -3.2952 -7.83586 -7.5 -8.21484V3.75c0 -0.41421 -0.3358 -0.75 -0.75 -0.75\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/bus","name":"bus","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bus--Streamline-Ultimate\">\n  <desc>\n    Bus Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.25 6.5a0.24 0.24 0 0 1 -0.25 -0.25V2.5A2.5 2.5 0 0 0 17.5 0h-11A2.5 2.5 0 0 0 4 2.5v3.75a0.25 0.25 0 0 1 -0.25 0.25H1.5A1.5 1.5 0 0 0 0 8v5a1.5 1.5 0 0 0 1.5 1.5 1 1 0 0 0 1 -1v-5h1.25a0.25 0.25 0 0 1 0.25 0.25v10.73A1.5 1.5 0 0 0 5.29 21a0.26 0.26 0 0 1 0.21 0.25V23a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-1.77a0.25 0.25 0 0 1 0.25 -0.23h4.5a0.25 0.25 0 0 1 0.25 0.25V23a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-1.79a0.26 0.26 0 0 1 0.21 -0.25A1.5 1.5 0 0 0 20 19.48V8.75a0.25 0.25 0 0 1 0.25 -0.25h1.25v5a1 1 0 0 0 1 1A1.5 1.5 0 0 0 24 13V8a1.5 1.5 0 0 0 -1.5 -1.5Zm-2.75 1a0.5 0.5 0 0 1 0.5 0.5v6a0.5 0.5 0 0 1 -0.5 0.5h-11A0.5 0.5 0 0 1 6 14V8a0.5 0.5 0 0 1 0.5 -0.5ZM9.5 4V3a0.5 0.5 0 0 1 0.5 -0.5h4a0.5 0.5 0 0 1 0.5 0.5v1a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.5 -0.5m0.75 14a0.76 0.76 0 0 1 -0.75 0.75h-3a0.75 0.75 0 0 1 0 -1.5h3a0.76 0.76 0 0 1 0.75 0.75m4.25 0.75a0.75 0.75 0 0 1 0 -1.5h3a0.75 0.75 0 0 1 0 1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
