const pages = figma.root.children;
const dash = pages.find(p => p.name.indexOf("Dashboard") >= 0);
await figma.setCurrentPageAsync(dash);
const BAD = new Set(["111:3621", "1593:44483"]);
const hits = [];
for (const n of dash.findAllWithCriteria({ types: ["INSTANCE"] })) {
  const mc = n.mainComponent;
  if (!mc || mc.parent.name !== "Button") continue;
  const layout = n.componentProperties.Layout.value;
  let badSwap = false;
  for (const [k, v] of Object.entries(n.componentProperties)) {
    if (v.type === "INSTANCE_SWAP" && k.indexOf("Leading icon") === 0 && BAD.has(v.value)) badSwap = true;
  }
  let nested = null;
  for (const i of n.findAll(x => x.type === "INSTANCE")) {
    const sn = i.mainComponent.parent.name;
    if (sn.toLowerCase().indexOf("filter") < 0) continue;
    nested = { id: i.mainComponent.id, sz: i.componentProperties.Size.value, st: i.findAllWithCriteria({ types: ["VECTOR"] })[0].strokeWeight };
    break;
  }
  const badNested = nested && (BAD.has(nested.id) || nested.sz === "xs");
  if ((layout === "iconOnly" || nested || badSwap) && (badSwap || badNested)) {
    hits.push({ id: n.id, layout, badSwap, nested });
  }
}
return { page: dash.name, hits };
