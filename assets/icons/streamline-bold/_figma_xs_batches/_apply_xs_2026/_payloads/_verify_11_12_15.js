
const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const NAMES = {"11":["icon/actions/check.bold","icon/actions/minus","icon/files/agreement","icon/files/attachment","icon/files/blog","icon/files/bookmark","icon/files/box.alt","icon/files/cabinet","icon/files/clipboard","icon/files/cloud","icon/files/cloud.download","icon/files/cloud.upload","icon/files/contract","icon/files/envelope","icon/files/faq","icon/files/file.code","icon/files/file","icon/files/file.image","icon/files/file.pdf","icon/files/file.zip"],"12":["icon/files/file.text","icon/files/database","icon/files/document","icon/files/drawer","icon/files/folder","icon/files/folder.add","icon/files/folder.shared","icon/files/folder.star","icon/files/guide","icon/files/hard.drive","icon/files/letter","icon/files/magazine","icon/files/manual","icon/files/newspaper","icon/files/notes","icon/files/package.alt","icon/files/parcel","icon/files/policy","icon/files/portfolio","icon/files/postcard"],"15":["icon/navigation/search","icon/navigation/settings","icon/navigation/sidebar","icon/navigation/split","icon/navigation/home","icon/status/badge","icon/status/bell","icon/status/blocked","icon/status/bell.off","icon/status/critical","icon/status/eye","icon/status/error","icon/status/eye.off","icon/status/flag","icon/status/help","icon/status/info","icon/status/loading","icon/status/lock","icon/status/lock.2","icon/status/notification"]};
const results = {};
for (const [batch, names] of Object.entries(NAMES)) {
  let ok=0, missing=0, failed=0; const miss=[], fail=[];
  for (const setName of names) {
    const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
    if (!set) { missing++; if (miss.length<8) miss.push(setName); continue; }
    const xs = set.children.find(c => c.name === 'Size=xs');
    if (!xs) { failed++; if (fail.length<8) fail.push({name:setName, reason:'no-xs'}); continue; }
    const hasBold = xs.children.some(c => /bold/i.test(c.name) || c.type === 'FRAME' || c.type === 'VECTOR' || c.type === 'GROUP' || c.type === 'BOOLEAN_OPERATION');
    if (xs.children.length > 0 && hasBold) ok++;
    else { failed++; if (fail.length<8) fail.push({name:setName, reason:'empty-or-no-bold', kids: xs.children.map(c=>c.name)}); }
  }
  results[batch] = { batch, ok, missing, failed, miss, fail };
}
return results;
