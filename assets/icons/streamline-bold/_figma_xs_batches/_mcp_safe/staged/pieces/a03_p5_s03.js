const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a03_p5';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "IiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9XTsKbGV0IG9rID0gMCwgbWlzc2luZyA9IDAsIGZhaWxlZCA9IDA7CmNvbnN0IG1pc3MgPSBbXSwgZmFpbCA9IFtdOwpmb3IgKGNvbnN0IGl0ZW0gb2YgQkFUQ0gpIHsKICBjb25zdCBzZXQgPSBwYWdlLmZpbmRPbmUobiA9PiBuLnR5cGUgPT09ICdDT01QT05FTlRfU0VUJyAmJiBuLm5hbWUgPT09IGl0ZW0uc2V0TmFtZSk7CiAgaWYgKCFzZXQpIHsgbWlzc2luZysrOyBpZiAobWlzcy5sZW5ndGggPCA1KSBtaXNzLnB1c2goaXRlbS5zZXROYW1lKTsgY29udGludWU7IH0KICB0cnkgewogICAgY29uc3QgciA9IGFwcGx5Qm9sZFhzKHNldCwgaXRlbS5zdmcpOwogICAgaWYgKHIub2spIG9rKys7IGVsc2UgeyBmYWlsZWQrKzsgZmFpbC5wdXNoKHsgbmFtZTogaXRlbS5zZXROYW1lLCByIH0pOyB9CiAgfSBjYXRjaCAoZSkgewogICAgZmFpbGVkKys7CiAgICBpZiAoZmFpbC5sZW5ndGggPCA1KSBmYWlsLnB1c2goeyBuYW1lOiBpdGVtLnNldE5hbWUsIGVycjogU3RyaW5nKGUpIH0pOwogIH0KfQpyZXR1cm4geyBvaywgbWlzc2luZywgZmFpbGVkLCBtaXNzLCBmYWlsIH07Cg==";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 3, totalLen: (prev + chunk).length, id: store.id };
