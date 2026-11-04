const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "PSBmYWxzZTsKICBpZiAoJ2NvbnN0cmFpbnRzJyBpbiBub2RlKSBub2RlLmNvbnN0cmFpbnRzID0geyBob3Jpem9udGFsOiAnU0NBTEUnLCB2ZXJ0aWNhbDogJ1NDQUxFJyB9OwogIHhzLmFwcGVuZENoaWxkKG5vZGUpOwogIHRyeSB7IHhzLnJlc2l6ZVdpdGhvdXRDb25zdHJhaW50cygxNiwgMTYpOyB9IGNhdGNoIChfKSB7IHRyeSB7IHhzLnJlc2l6ZSgxNiwgMTYpOyB9IGNhdGNoKF9fKXt9IH0KICBiaW5kRmlsbHMobm9kZSk7CiAgeHMuY2xpcHNDb250ZW50ID0gZmFsc2U7CiAgeHMudmlzaWJsZSA9IGZhbHNlOwogIGlmIChtZCkgbWQudmlzaWJsZSA9IHRydWU7CiAgdHJ5IHsgc2V0LnJlc2l6ZVdpdGhvdXRDb25zdHJhaW50cygyNCwgMjQpOyB9IGNhdGNo";
t.characters = t.characters + add;
return { part: 4, addLen: add.length, len: t.characters.length, expect: 2500 };
