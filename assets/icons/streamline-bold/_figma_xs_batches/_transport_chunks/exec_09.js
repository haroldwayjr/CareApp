const code=figma.root.getSharedPluginData('careapp','r09_0')+figma.root.getSharedPluginData('careapp','r09_1')+figma.root.getSharedPluginData('careapp','r09_2')+figma.root.getSharedPluginData('careapp','r09_3')+figma.root.getSharedPluginData('careapp','r09_4');
figma.root.setSharedPluginData('careapp','r09_0','');
figma.root.setSharedPluginData('careapp','r09_1','');
figma.root.setSharedPluginData('careapp','r09_2','');
figma.root.setSharedPluginData('careapp','r09_3','');
figma.root.setSharedPluginData('careapp','r09_4','');
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
