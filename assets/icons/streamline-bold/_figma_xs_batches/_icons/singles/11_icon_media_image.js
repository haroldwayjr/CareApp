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
const BATCH = [{"setName":"icon/media/image","name":"image","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Image-File-Landscape--Streamline-Ultimate\"><path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zm-0.9727 6.1719c-0.1176 0 -0.2341 0.0221 -0.3427 0.0654l-0.1055 0.0508c-0.1373 0.0761 -0.2537 0.1863 -0.3369 0.3193l-1.8233 2.916 -0.4912 -0.7871h-0.0009c-0.0832 -0.1329 -0.19879 -0.2433 -0.33598 -0.3193 -0.13727 -0.076 -0.2923 -0.1162 -0.44922 -0.1162 -0.11772 0 -0.23409 0.023 -0.34277 0.0664l-0.10547 0.0498c-0.10293 0.057 -0.19449 0.1331 -0.26856 0.2236l-0.06835 0.0957 -2.56641 4.1065c-0.09626 0.154 -0.10155 0.3489 -0.01367 0.5078 0.08811 0.159 0.25573 0.2578 0.4375 0.2578H17.5361c0.1818 0 0.3494 -0.0988 0.4375 -0.2578 0.0879 -0.1588 0.0825 -0.3529 -0.0136 -0.5068l-3.8975 -6.2364c-0.0624 -0.0997 -0.1431 -0.1867 -0.2373 -0.2558l-0.0986 -0.0635 -0.1065 -0.0508c-0.1086 -0.0432 -0.2252 -0.0654 -0.3428 -0.0654M8.96875 7.6416c-1.07861 0.00016 -1.95296 0.87452 -1.95313 1.95313 0.00014 1.07867 0.8745 1.95397 1.95313 1.95407 1.07875 0 1.95395 -0.8753 1.95415 -1.95407 -0.0002 -1.07871 -0.8754 -1.95313 -1.95415 -1.95313M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
