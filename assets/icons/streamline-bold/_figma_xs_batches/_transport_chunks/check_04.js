const code = figma.root.getSharedPluginData('careapp','r04_0')+figma.root.getSharedPluginData('careapp','r04_1')+figma.root.getSharedPluginData('careapp','r04_2')+figma.root.getSharedPluginData('careapp','r04_3')+figma.root.getSharedPluginData('careapp','r04_4');
const lens = [0,1,2,3,4].map(i => figma.root.getSharedPluginData('careapp','r04_'+i).length);
return { assembled: code.length, lens, head: code.slice(0,40), tail: code.slice(-40) };
