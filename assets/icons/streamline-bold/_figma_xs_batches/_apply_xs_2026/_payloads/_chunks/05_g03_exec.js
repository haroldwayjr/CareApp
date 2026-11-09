const b64=figma.root.getSharedPluginData("careapp","xs05g03_0")+figma.root.getSharedPluginData("careapp","xs05g03_1")+figma.root.getSharedPluginData("careapp","xs05g03_2");
figma.root.setSharedPluginData("careapp","xs05g03_0",'');
figma.root.setSharedPluginData("careapp","xs05g03_1",'');
figma.root.setSharedPluginData("careapp","xs05g03_2",'');
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=new TextDecoder().decode(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
