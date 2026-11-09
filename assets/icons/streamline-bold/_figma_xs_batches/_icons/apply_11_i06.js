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
      const paint = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
      n.fills = [paint]; n.strokes = [];
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
  node.resize(16, 16); node.x = 0; node.y = 0; node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch (__) {} }
  bindFills(node); xs.clipsContent = false; xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true; return { ok: true };
}
const BATCH = [{"setName":"icon/media/mic.off","name":"mic-off","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Microphone-Off--Streamline-Ultimate\"><g><path d=\"M12 20a7.5 7.5 0 0 1 -7.5 -7.5V10a1 1 0 0 0 -2 0v2.5a9.51 9.51 0 0 0 8.28 9.42 0.26 0.26 0 0 1 0.22 0.25V23a1 1 0 0 0 2 0v-0.83a0.26 0.26 0 0 1 0.22 -0.25 9.58 9.58 0 0 0 3.86 -1.39 0.27 0.27 0 0 0 0.11 -0.19 0.25 0.25 0 0 0 -0.07 -0.2L16 19.05a0.24 0.24 0 0 0 -0.3 0A7.47 7.47 0 0 1 12 20\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M6.43 9.45a0.26 0.26 0 0 0 -0.28 -0.06 0.25 0.25 0 0 0 -0.15 0.23v2.88a6 6 0 0 0 8.47 5.5 0.22 0.22 0 0 0 0.14 -0.18 0.25 0.25 0 0 0 -0.07 -0.23Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"m23.71 22.3 -4 -4a0.26 0.26 0 0 1 0 -0.32 9.48 9.48 0 0 0 1.79 -5.48V10a1 1 0 0 0 -2 0v2.5a7.4 7.4 0 0 1 -1.16 4 0.23 0.23 0 0 1 -0.18 0.11 0.24 0.24 0 0 1 -0.21 -0.07l-0.72 -0.72a0.26 0.26 0 0 1 0 -0.31 6 6 0 0 0 0.81 -3V6a6 6 0 0 0 -11.8 -1.69 0.24 0.24 0 0 1 -0.17 0.17 0.26 0.26 0 0 1 -0.24 -0.06L1.71 0.3A1 1 0 0 0 0.29 0.3a1 1 0 0 0 0 1.41l22 22a1 1 0 0 0 1.41 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/files/attachment","name":"attachment","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Attachment-1--Streamline-Ultimate\"><path d=\"M12 0a7 7 0 0 0 -7 7v11.87a5.13 5.13 0 1 0 10.25 0V9.71a3.29 3.29 0 1 0 -6.58 0v7.79a1 1 0 0 0 2 0V9.71a1.29 1.29 0 1 1 2.58 0v9.16a3.13 3.13 0 1 1 -6.25 0V7a5 5 0 0 1 10 0v7.5a1 1 0 0 0 2 0V7a7 7 0 0 0 -7 -7\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"},{"setName":"icon/files/file.zip","name":"file-zip","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Zip-File--Streamline-Ultimate\"><path d=\"M21.56 4.15 17.85 0.44A1.5 1.5 0 0 0 16.79 0H3.5A1.5 1.5 0 0 0 2 1.5v21A1.5 1.5 0 0 0 3.5 24h17a1.5 1.5 0 0 0 1.5 -1.5V5.21a1.5 1.5 0 0 0 -0.44 -1.06M9.5 22a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1M11 6.6a2 2 0 0 1 -1.48 0.67A2 2 0 0 1 8 6.6a2 2 0 0 1 -0.47 -1.55L8 1.92a0.49 0.49 0 0 1 0.5 -0.42h2a0.51 0.51 0 0 1 0.5 0.42L11.48 5A2 2 0 0 1 11 6.6\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
