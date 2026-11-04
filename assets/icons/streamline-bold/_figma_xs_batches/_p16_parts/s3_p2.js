const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "LjVoLTE5YTAuNSAwLjUgMCAwIDEgLTAuNSAtMC41di0xOWEwLjUgMC41IDAgMCAxIDAuNSAtMC41aDE5YTAuNDcgMC40NyAwIDAgMSAwLjM1IDAuMTUgMC40NyAwLjQ3IDAgMCAxIDAuMTUgMC4zNVpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk01LjUgNGgxM3MxLjI1IDAgMS4yNSAxLjI1djIuNVMxOS43NSA5IDE4LjUgOWgtMTNTNC4yNSA5IDQuMjUgNy43NXYtMi41UzQuMjUgNCA1LjUgNFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTUgMTFoNS41czAuNzUgMCAwLjc1IDAuNzV2MC41czAgMC43NSAtMC43NSAwLjc1SDVzLTAu";
t.characters = t.characters + add;
return { step: 3, part: 2, addLen: add.length, len: t.characters.length };
