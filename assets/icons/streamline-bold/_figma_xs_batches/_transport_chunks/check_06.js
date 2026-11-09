const code=figma.root.getSharedPluginData('careapp','r06_0')+figma.root.getSharedPluginData('careapp','r06_1')+figma.root.getSharedPluginData('careapp','r06_2')+figma.root.getSharedPluginData('careapp','r06_3')+figma.root.getSharedPluginData('careapp','r06_4')+figma.root.getSharedPluginData('careapp','r06_5');
const lens=[0,1,2,3,4,5].map(i=>figma.root.getSharedPluginData('careapp','r06_'+i).length);
return {assembled:code.length,lens,head:code.slice(0,40),tail:code.slice(-40)};
