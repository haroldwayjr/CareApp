const code = figma.root.getSharedPluginData('careapp','r05_0')+figma.root.getSharedPluginData('careapp','r05_1')+figma.root.getSharedPluginData('careapp','r05_2')+figma.root.getSharedPluginData('careapp','r05_3')+figma.root.getSharedPluginData('careapp','r05_4');
figma.root.setSharedPluginData('careapp','r05_0','');
figma.root.setSharedPluginData('careapp','r05_1','');
figma.root.setSharedPluginData('careapp','r05_2','');
figma.root.setSharedPluginData('careapp','r05_3','');
figma.root.setSharedPluginData('careapp','r05_4','');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
