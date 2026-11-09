const b64=figma.root.getSharedPluginData("careapp","r10q1_0")+figma.root.getSharedPluginData("careapp","r10q1_1")+figma.root.getSharedPluginData("careapp","r10q1_2");
figma.root.setSharedPluginData("careapp","r10q1_0","");
figma.root.setSharedPluginData("careapp","r10q1_1","");
figma.root.setSharedPluginData("careapp","r10q1_2","");
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=new TextDecoder().decode(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
