const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "PVtdLCBmYWlsPVtdOwpmb3IgKGNvbnN0IGl0ZW0gb2YgQkFUQ0gpIHsKICBjb25zdCBzZXQgPSBwYWdlLmZpbmRPbmUobiA9PiBuLnR5cGUgPT09ICdDT01QT05FTlRfU0VUJyAmJiBuLm5hbWUgPT09IGl0ZW0uc2V0TmFtZSk7CiAgaWYgKCFzZXQpIHsgbWlzc2luZysrOyBpZiAobWlzcy5sZW5ndGg8OCkgbWlzcy5wdXNoKGl0ZW0uc2V0TmFtZSk7IGNvbnRpbnVlOyB9CiAgdHJ5IHsKICAgIGNvbnN0IHIgPSBhcHBseUJvbGRYcyhzZXQsIGl0ZW0uc3ZnKTsKICAgIGlmIChyLm9rKSBvaysrOyBlbHNlIHsgZmFpbGVkKys7IGZhaWwucHVzaCh7bmFtZTppdGVtLnNldE5hbWUscn0pOyB9CiAgfSBjYXRjaChlKSB7IGZhaWxlZCsrOyBpZiAoZmFpbC5sZW5ndGg8";
t.characters = t.characters + add;
return { step: 9, part: 1, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
