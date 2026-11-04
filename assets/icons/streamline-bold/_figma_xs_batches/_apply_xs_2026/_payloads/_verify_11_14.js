
const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const BATCHES = {
  "11": ["icon/actions/check.bold", "icon/actions/minus", "icon/files/agreement", "icon/files/attachment", "icon/files/blog", "icon/files/bookmark", "icon/files/box.alt", "icon/files/cabinet", "icon/files/clipboard", "icon/files/cloud", "icon/files/cloud.download", "icon/files/cloud.upload", "icon/files/contract", "icon/files/envelope", "icon/files/faq", "icon/files/file.code", "icon/files/file", "icon/files/file.image", "icon/files/file.pdf", "icon/files/file.zip"],
  "12": ["icon/files/file.text", "icon/files/database", "icon/files/document", "icon/files/drawer", "icon/files/folder", "icon/files/folder.add", "icon/files/folder.shared", "icon/files/folder.star", "icon/files/guide", "icon/files/hard.drive", "icon/files/letter", "icon/files/magazine", "icon/files/manual", "icon/files/newspaper", "icon/files/notes", "icon/files/package.alt", "icon/files/parcel", "icon/files/policy", "icon/files/portfolio", "icon/files/postcard"],
  "13": ["icon/files/press", "icon/files/resume", "icon/files/server", "icon/files/shelf", "icon/files/tag", "icon/files/usb", "icon/files/wiki", "icon/navigation/arrow.down", "icon/navigation/arrow.left", "icon/navigation/arrow.right", "icon/navigation/arrow.up", "icon/navigation/back", "icon/navigation/breadcrumb", "icon/navigation/chevron.down", "icon/navigation/chevron.left", "icon/navigation/chevron.right", "icon/navigation/chevron.up", "icon/navigation/close", "icon/navigation/compass", "icon/navigation/exit.fullscreen"],
  "14": ["icon/navigation/external.link", "icon/navigation/filter", "icon/navigation/drag", "icon/navigation/forward", "icon/navigation/fullscreen", "icon/navigation/home.alt", "icon/navigation/layers", "icon/navigation/map", "icon/navigation/menu", "icon/navigation/merge", "icon/navigation/more.horizontal", "icon/navigation/more.vertical", "icon/navigation/navigation.pointer", "icon/navigation/panel.bottom", "icon/navigation/panel.left", "icon/navigation/panel.right", "icon/navigation/panel.top", "icon/navigation/resize", "icon/navigation/route", "icon/navigation/scroll"]
};
function check(names) {
  let ok=0, missing=0, failed=0; const miss=[], fail=[];
  for (const setName of names) {
    const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
    if (!set) { missing++; if (miss.length<8) miss.push(setName); continue; }
    const xs = set.children.find(c => c.name === 'Size=xs');
    if (!xs || xs.children.length === 0) { failed++; if (fail.length<8) fail.push(setName+':empty'); continue; }
    const hasBold = [...xs.children].some(c => /bold|·/.test(c.name));
    if (hasBold) ok++; else { failed++; if (fail.length<8) fail.push(setName+':nobold'); }
  }
  return { ok, missing, failed, miss, fail };
}
const out = {};
for (const [k,v] of Object.entries(BATCHES)) out[k] = check(v);
return out;
