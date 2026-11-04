const b64=figma.root.getSharedPluginData("careapp","xs10g01_0")+figma.root.getSharedPluginData("careapp","xs10g01_1")+figma.root.getSharedPluginData("careapp","xs10g01_2")+figma.root.getSharedPluginData("careapp","xs10g01_3");
figma.root.setSharedPluginData("careapp","xs10g01_0",'');
figma.root.setSharedPluginData("careapp","xs10g01_1",'');
figma.root.setSharedPluginData("careapp","xs10g01_2",'');
figma.root.setSharedPluginData("careapp","xs10g01_3",'');
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=new TextDecoder().decode(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
