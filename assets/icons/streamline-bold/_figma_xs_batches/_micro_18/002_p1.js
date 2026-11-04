const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "ZWZhdWx0JykgaWNvbkRlZmF1bHQgPSB2OwogIH0KfQpmdW5jdGlvbiBiaW5kRmlsbHMocm9vdCkgewogIGNvbnN0IHN0YWNrID0gW3Jvb3RdOwogIHdoaWxlIChzdGFjay5sZW5ndGgpIHsKICAgIGNvbnN0IG4gPSBzdGFjay5wb3AoKTsKICAgIGlmICgnY29uc3RyYWludHMnIGluIG4pIG4uY29uc3RyYWludHMgPSB7IGhvcml6b250YWw6ICdTQ0FMRScsIHZlcnRpY2FsOiAnU0NBTEUnIH07CiAgICBpZiAobi50eXBlID09PSAnVkVDVE9SJyB8fCBuLnR5cGUgPT09ICdCT09MRUFOX09QRVJBVElPTicgfHwgbi50eXBlID09PSAnRUxMSVBTRScgfHwgbi50eXBlID09PSAnU1RBUicgfHwgbi50eXBlID09PSAnUE9MWUdPTicpIHsKICAgICAgY29uc3QgcGFpbnQg";
t.characters = t.characters + add;
return { part: 1, addLen: add.length, len: t.characters.length, expect: 1000 };
