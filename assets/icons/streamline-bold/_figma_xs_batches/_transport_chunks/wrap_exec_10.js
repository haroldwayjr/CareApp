const code = figma.root.getSharedPluginData('careapp','r10_0')+figma.root.getSharedPluginData('careapp','r10_1')+figma.root.getSharedPluginData('careapp','r10_2')+figma.root.getSharedPluginData('careapp','r10_3')+figma.root.getSharedPluginData('careapp','r10_4');
figma.root.setSharedPluginData('careapp','r10_0','');
figma.root.setSharedPluginData('careapp','r10_1','');
figma.root.setSharedPluginData('careapp','r10_2','');
figma.root.setSharedPluginData('careapp','r10_3','');
figma.root.setSharedPluginData('careapp','r10_4','');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
