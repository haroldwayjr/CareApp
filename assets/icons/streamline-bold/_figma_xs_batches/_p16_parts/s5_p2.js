const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "OCAtMC44ODM4IC0wLjM2NjJzLTAuMzY2MiAtMC41NTIzIC0wLjM2NjIgLTAuODgzOHYtMmgtMmMtMC4zMzE1IDAgLTAuNjQ5NCAtMC4xMzE4IC0wLjg4MzggLTAuMzY2MlMxMiAxOS44MzE1IDEyIDE5LjV2LTNjMCAtMC4zMzE1IDAuMTMxOCAtMC42NDk0IDAuMzY2MiAtMC44ODM4czAuNTUyMyAtMC4zNjYyIDAuODgzOCAtMC4zNjYyaDJ2LTJjMCAtMC4zMzE1IDAuMTMxOCAtMC42NDk0IDAuMzY2MiAtMC44ODM4UzE2LjE2ODUgMTIgMTYuNSAxMnptLTE1IC04LjVoLTJjLTAuMjc2MTQgMCAtMC41IDAuMjIzODYgLTAuNSAwLjV2MTUuNWMwIDAuMjc2MSAwLjIyMzg2IDAuNSAwLjUgMC41aDguMDQ2OWMwLjA5OTkgMC41NDU0IDAuMzYxNiAxLjA1MiAwLjc1ODgg";
t.characters = t.characters + add;
return { step: 5, part: 2, addLen: add.length, len: t.characters.length };
