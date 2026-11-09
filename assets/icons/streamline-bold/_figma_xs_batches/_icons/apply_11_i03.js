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
const BATCH = [{"setName":"icon/status/loading","name":"loading","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Loading--Streamline-Ultimate\"><g><path d=\"M12 6.5A1.5 1.5 0 0 0 13.5 5V2a1.5 1.5 0 0 0 -3 0v3A1.5 1.5 0 0 0 12 6.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M8.27 6.11 6.15 4A1.53 1.53 0 0 0 4 4a1.48 1.48 0 0 0 -0.44 1.06A1.52 1.52 0 0 0 4 6.11l2.15 2.12a1.5 1.5 0 0 0 1.06 0.44 1.5 1.5 0 0 0 1.06 -2.56\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M0.5 12A1.5 1.5 0 0 0 2 13.5h3a1.5 1.5 0 0 0 0 -3H2A1.5 1.5 0 0 0 0.5 12\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M7 15.52a1.48 1.48 0 0 0 -1.1 0.48l-2.13 2.08a1.51 1.51 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L8 18.08a1.5 1.5 0 0 0 -1 -2.56\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M10.5 22a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M16.05 16a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.52 1.52 0 0 0 1.06 0.44 1.54 1.54 0 0 0 1.07 -0.44 1.51 1.51 0 0 0 0.43 -1.06 1.48 1.48 0 0 0 -0.44 -1.07L18.17 16a1.5 1.5 0 0 0 -2.12 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M23.5 12a1.5 1.5 0 0 0 -1.5 -1.5h-3a1.5 1.5 0 0 0 -1.5 1.5 1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M19 3.41a1.52 1.52 0 0 0 -1 0.44L15.86 6a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L20.11 6A1.5 1.5 0 0 0 19 3.41\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/media/skip.forward","name":"skip-forward","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Next--Streamline-Ultimate\"><path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0M7 8.62a1 1 0 0 1 1.67 -0.74l3.75 3.38a1 1 0 0 1 0 1.48l-3.75 3.38A1 1 0 0 1 7 15.38ZM17 16a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1V8a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1Z\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"},{"setName":"icon/media/image","name":"image","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Image-File-Landscape--Streamline-Ultimate\"><path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zm-0.9727 6.1719c-0.1176 0 -0.2341 0.0221 -0.3427 0.0654l-0.1055 0.0508c-0.1373 0.0761 -0.2537 0.1863 -0.3369 0.3193l-1.8233 2.916 -0.4912 -0.7871h-0.0009c-0.0832 -0.1329 -0.19879 -0.2433 -0.33598 -0.3193 -0.13727 -0.076 -0.2923 -0.1162 -0.44922 -0.1162 -0.11772 0 -0.23409 0.023 -0.34277 0.0664l-0.10547 0.0498c-0.10293 0.057 -0.19449 0.1331 -0.26856 0.2236l-0.06835 0.0957 -2.56641 4.1065c-0.09626 0.154 -0.10155 0.3489 -0.01367 0.5078 0.08811 0.159 0.25573 0.2578 0.4375 0.2578H17.5361c0.1818 0 0.3494 -0.0988 0.4375 -0.2578 0.0879 -0.1588 0.0825 -0.3529 -0.0136 -0.5068l-3.8975 -6.2364c-0.0624 -0.0997 -0.1431 -0.1867 -0.2373 -0.2558l-0.0986 -0.0635 -0.1065 -0.0508c-0.1086 -0.0432 -0.2252 -0.0654 -0.3428 -0.0654M8.96875 7.6416c-1.07861 0.00016 -1.95296 0.87452 -1.95313 1.95313 0.00014 1.07867 0.8745 1.95397 1.95313 1.95407 1.07875 0 1.95395 -0.8753 1.95415 -1.95407 -0.0002 -1.07871 -0.8754 -1.95313 -1.95415 -1.95313M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
