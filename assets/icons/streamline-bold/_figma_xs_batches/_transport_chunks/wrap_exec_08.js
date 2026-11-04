const code = figma.root.getSharedPluginData('careapp','r08_0')+figma.root.getSharedPluginData('careapp','r08_1')+figma.root.getSharedPluginData('careapp','r08_2')+figma.root.getSharedPluginData('careapp','r08_3')+figma.root.getSharedPluginData('careapp','r08_4');
figma.root.setSharedPluginData('careapp','r08_0','');
figma.root.setSharedPluginData('careapp','r08_1','');
figma.root.setSharedPluginData('careapp','r08_2','');
figma.root.setSharedPluginData('careapp','r08_3','');
figma.root.setSharedPluginData('careapp','r08_4','');
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
