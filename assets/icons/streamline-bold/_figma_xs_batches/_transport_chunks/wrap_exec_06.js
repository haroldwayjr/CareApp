const code = figma.root.getSharedPluginData('careapp','r06_0')+figma.root.getSharedPluginData('careapp','r06_1')+figma.root.getSharedPluginData('careapp','r06_2')+figma.root.getSharedPluginData('careapp','r06_3')+figma.root.getSharedPluginData('careapp','r06_4')+figma.root.getSharedPluginData('careapp','r06_5');
figma.root.setSharedPluginData('careapp','r06_0','');
figma.root.setSharedPluginData('careapp','r06_1','');
figma.root.setSharedPluginData('careapp','r06_2','');
figma.root.setSharedPluginData('careapp','r06_3','');
figma.root.setSharedPluginData('careapp','r06_4','');
figma.root.setSharedPluginData('careapp','r06_5','');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
