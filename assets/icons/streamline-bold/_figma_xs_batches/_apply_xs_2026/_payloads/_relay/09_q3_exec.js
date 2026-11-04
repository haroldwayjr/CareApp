const b64=figma.root.getSharedPluginData("careapp","r09q3_0")+figma.root.getSharedPluginData("careapp","r09q3_1")+figma.root.getSharedPluginData("careapp","r09q3_2")+figma.root.getSharedPluginData("careapp","r09q3_3");
figma.root.setSharedPluginData("careapp","r09q3_0","");
figma.root.setSharedPluginData("careapp","r09q3_1","");
figma.root.setSharedPluginData("careapp","r09q3_2","");
figma.root.setSharedPluginData("careapp","r09q3_3","");
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=new TextDecoder().decode(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
