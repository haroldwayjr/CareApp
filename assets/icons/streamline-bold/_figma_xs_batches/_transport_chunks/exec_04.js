const code = figma.root.getSharedPluginData('careapp','r04_0')+figma.root.getSharedPluginData('careapp','r04_1')+figma.root.getSharedPluginData('careapp','r04_2')+figma.root.getSharedPluginData('careapp','r04_3')+figma.root.getSharedPluginData('careapp','r04_4');
figma.root.setSharedPluginData('careapp','r04_0','');
figma.root.setSharedPluginData('careapp','r04_1','');
figma.root.setSharedPluginData('careapp','r04_2','');
figma.root.setSharedPluginData('careapp','r04_3','');
figma.root.setSharedPluginData('careapp','r04_4','');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
