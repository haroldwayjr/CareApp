const code=figma.root.getSharedPluginData('careapp','r10_0')+figma.root.getSharedPluginData('careapp','r10_1')+figma.root.getSharedPluginData('careapp','r10_2')+figma.root.getSharedPluginData('careapp','r10_3')+figma.root.getSharedPluginData('careapp','r10_4');
const lens=[0,1,2,3,4].map(i=>figma.root.getSharedPluginData('careapp','r10_'+i).length);
return {assembled:code.length,lens,head:code.slice(0,40),tail:code.slice(-40)};
