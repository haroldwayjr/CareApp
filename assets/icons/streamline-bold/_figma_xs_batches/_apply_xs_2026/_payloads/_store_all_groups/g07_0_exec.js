const b64=figma.root.getSharedPluginData("careapp","g07_0_0")+figma.root.getSharedPluginData("careapp","g07_0_1")+figma.root.getSharedPluginData("careapp","g07_0_2")+figma.root.getSharedPluginData("careapp","g07_0_3");
figma.root.setSharedPluginData("careapp","g07_0_0","");
figma.root.setSharedPluginData("careapp","g07_0_1","");
figma.root.setSharedPluginData("careapp","g07_0_2","");
figma.root.setSharedPluginData("careapp","g07_0_3","");
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=new TextDecoder().decode(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
