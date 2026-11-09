const IDX = __IDX__;
const page = figma.root.children[IDX];
await figma.setCurrentPageAsync(page);
const SM = "1593:44477";
const BAD = new Set(["111:3621", "1593:44483"]);
const fixed = [];
const remaining = [];
for (const n of page.findAllWithCriteria({ types: ["INSTANCE"] })) {
  const mc = n.mainComponent;
  if (!mc || !mc.parent || mc.parent.name !== "Button") continue;
  const s = mc.parent.name.toLowerCase();
  if (s.indexOf("badge") >= 0 || s.indexOf("chip") >= 0 || s.indexOf("success") >= 0) continue;
  const layout = n.componentProperties.Layout.value;
  let swapKey = null;
  let swapVal = null;
  for (const [k, v] of Object.entries(n.componentProperties)) {
    if (v.type === "INSTANCE_SWAP" && k.indexOf("Leading icon") === 0 && BAD.has(v.value)) {
      swapKey = k; swapVal = v.value; break;
    }
  }
  let nested = null;
  for (const i of n.findAll(x => x.type === "INSTANCE")) {
    const p = i.mainComponent && i.mainComponent.parent;
    if (!p || p.name.toLowerCase().indexOf("filter") < 0) continue;
    const vecs = i.findAllWithCriteria({ types: ["VECTOR"] });
    nested = { id: i.mainComponent.id, sz: i.componentProperties.Size.value, st: vecs[0] ? vecs[0].strokeWeight : null };
    break;
  }
  const badNested = nested && (BAD.has(nested.id) || nested.sz === "xs");
  if (!swapKey && !badNested) continue;
  if (layout !== "iconOnly" && !nested && !swapKey) continue;
  const before = { mainComponentId: nested ? nested.id : swapVal, size: nested ? nested.sz : null, strokeWeight: nested ? nested.st : null };
  try {
    if (swapKey) n.setProperties({ [swapKey]: SM });
    let afterNested = null;
    for (const i of n.findAll(x => x.type === "INSTANCE")) {
      const p = i.mainComponent && i.mainComponent.parent;
      if (!p || p.name.toLowerCase().indexOf("filter") < 0) continue;
      const vecs = i.findAllWithCriteria({ types: ["VECTOR"] });
      afterNested = { id: i.mainComponent.id, sz: i.componentProperties.Size.value, st: vecs[0] ? vecs[0].strokeWeight : null };
      break;
    }
    let stillBad = false;
    for (const [k, v] of Object.entries(n.componentProperties)) {
      if (v.type === "INSTANCE_SWAP" && k.indexOf("Leading icon") === 0 && BAD.has(v.value)) stillBad = true;
    }
    const okNested = !badNested || (afterNested && afterNested.id === SM && (afterNested.st === 1.5 || afterNested.st === null));
    if (!stillBad && okNested) {
      fixed.push({ nodeId: n.id, layout, before, after: { mainComponentId: afterNested ? afterNested.id : SM, size: afterNested ? afterNested.sz : "sm", strokeWeight: afterNested ? afterNested.st : 1.5 } });
    } else {
      remaining.push({ nodeId: n.id, layout, before, after: afterNested, stillBad });
    }
  } catch (e) {
    remaining.push({ nodeId: n.id, reason: e.message, before });
  }
}
return { page: page.name, pageIdx: IDX, fixed, remaining };
