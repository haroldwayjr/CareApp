const code=figma.root.getSharedPluginData('careapp','r11_0')+figma.root.getSharedPluginData('careapp','r11_1')+figma.root.getSharedPluginData('careapp','r11_2')+figma.root.getSharedPluginData('careapp','r11_3')+figma.root.getSharedPluginData('careapp','r11_4')+figma.root.getSharedPluginData('careapp','r11_5')+figma.root.getSharedPluginData('careapp','r11_6');
const lens=[0,1,2,3,4,5,6].map(i=>figma.root.getSharedPluginData('careapp','r11_'+i).length);
return {assembled:code.length,lens,head:code.slice(0,40),tail:code.slice(-40)};
