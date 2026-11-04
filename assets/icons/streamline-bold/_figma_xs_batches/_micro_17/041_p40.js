const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "OCAwLjQ4IDAgMCAxIC0wLjIyIDAuNThsLTEuNjYgMWExIDEgMCAwIDAgLTAuMzYgMS4zNiAxIDEgMCAwIDAgMC44NiAwLjUgMSAxIDAgMCAwIDAuNSAtMC4xM2wxLjY2IC0xYTAuNTIgMC41MiAwIDAgMSAwLjYyIDAuMSA0LjE2IDQuMTYgMCAwIDAgMC40MiAwLjQyIDAuNSAwLjUgMCAwIDEgMC4xIDAuNjJsLTEgMS42NmExIDEgMCAwIDAgMS43MyAxbDEgLTEuNjZhMC40OCAwLjQ4IDAgMCAxIDAuNTggLTAuMjJjMC4xOSAwLjA1IDAuMzggMC4xMSAwLjU4IDAuMTVhMC40OSAwLjQ5IDAgMCAxIDAuMzkgMC40OVYyM2ExIDEgMCAwIDAgMiAwdi0xLjkxYTAuNDkgMC40OSAwIDAgMSAwLjM5IC0wLjQ5YzAuMiAwIDAuMzkgLTAuMSAwLjU4IC0wLjE1YTAuNDkgMC40";
t.characters = t.characters + add;
return { part: 40, addLen: add.length, len: t.characters.length, expect: 20500 };
