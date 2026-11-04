const code=figma.root.getSharedPluginData('careapp','r07_0')+figma.root.getSharedPluginData('careapp','r07_1')+figma.root.getSharedPluginData('careapp','r07_2')+figma.root.getSharedPluginData('careapp','r07_3')+figma.root.getSharedPluginData('careapp','r07_4')+figma.root.getSharedPluginData('careapp','r07_5');
const lens=[0,1,2,3,4,5].map(i=>figma.root.getSharedPluginData('careapp','r07_'+i).length);
return {assembled:code.length,lens,head:code.slice(0,40),tail:code.slice(-40)};
