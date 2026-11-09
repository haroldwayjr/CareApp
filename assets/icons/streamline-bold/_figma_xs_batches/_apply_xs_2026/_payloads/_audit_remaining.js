const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const NAMES = {
  "07": ["icon/misc/tablet","icon/misc/temperature","icon/misc/ticket","icon/misc/translate","icon/misc/tree","icon/misc/trophy","icon/misc/umbrella","icon/misc/virus","icon/misc/walking","icon/misc/wallet","icon/misc/watch","icon/misc/wheelchair","icon/misc/wifi","icon/misc/wind","icon/misc/wrench","icon/misc/yin.yang","icon/files/archive","icon/files/attachment","icon/files/book","icon/files/bookmark"],
};
// load set names from disk-equivalent: use a verification that checks xs has bold fill vectors
function isBoldXs(set) {
  const xs = set.children.find(c => c.name === 'Size=xs');
  if (!xs) return 'no-xs';
  const vectors = xs.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON');
  if (!vectors.length) return 'empty';
  let fillN=0, strokeN=0;
  for (const v of vectors) {
    if (v.fills && v.fills !== figma.mixed && v.fills.length) fillN++;
    if (v.strokes && v.strokes.length) strokeN++;
  }
  if (fillN>0 && strokeN===0) return 'ok';
  if (strokeN>0 && fillN===0) return 'stroke';
  return 'mixed';
}
const batches = {};
for (const [bn, names] of Object.entries(NAMES)) {
  let ok=0, bad=[];
  for (const name of names) {
    const set = page.findOne(n => n.type==='COMPONENT_SET' && n.name===name);
    if (!set) { bad.push({name, status:'missing'}); continue; }
    const s = isBoldXs(set);
    if (s==='ok') ok++; else bad.push({name, status:s});
  }
  batches[bn] = {ok, need: names.length-ok, bad: bad.slice(0,5)};
}
return batches;
