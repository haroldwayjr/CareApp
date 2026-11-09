
const n=3; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','c14_'+i); if(!p) return {error:'missing',i,batch:'14'}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try {
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','c14_'+i,'');
  return {batch:'14', via:'exact-eval', result};
} catch(e) { return {batch:'14', error:String(e), stack:String(e&&e.stack).slice(0,400)}; }
