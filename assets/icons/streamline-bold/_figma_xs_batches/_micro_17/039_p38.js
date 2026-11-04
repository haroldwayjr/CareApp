const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "TTE4LjUgMTMuMjVoLTEuOTFhMC40OSAwLjQ5IDAgMCAxIC0wLjQ5IC0wLjM5IDUuNDcgNS40NyAwIDAgMCAtMC4xNSAtMC41OCAwLjQ4IDAuNDggMCAwIDEgMC4yMiAtMC41OGwxLjY2IC0xYTEgMSAwIDAgMCAtMSAtMS43M2wtMS42NiAxYTAuNTIgMC41MiAwIDAgMSAtMC42MiAtMC4xIDQuMTYgNC4xNiAwIDAgMCAtMC40MiAtMC40MiAwLjUgMC41IDAgMCAxIC0wLjEgLTAuNjJsMSAtMS42NmExIDEgMCAwIDAgLTEuNzMgLTFsLTEgMS42NmEwLjQ4IDAuNDggMCAwIDEgLTAuNTggMC4yMmMtMC4xOSAtMC4wNSAtMC4zOCAtMC4xMSAtMC41OCAtMC4xNWEwLjQ5IDAuNDkgMCAwIDEgLTAuMzkgLTAuNDlWNS41YTEgMSAwIDAgMCAtMiAwdjEuOTFhMC40OSAwLjQ5";
t.characters = t.characters + add;
return { part: 38, addLen: add.length, len: t.characters.length, expect: 19500 };
