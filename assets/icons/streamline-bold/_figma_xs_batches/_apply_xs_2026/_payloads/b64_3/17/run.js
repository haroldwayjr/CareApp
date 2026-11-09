
const n=5; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','c17_'+i); if(!p) return {error:'missing',i,batch:'17'}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try {
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','c17_'+i,'');
  return {batch:'17', via:'exact-eval', result};
} catch(e) { return {batch:'17', error:String(e), stack:String(e&&e.stack).slice(0,400)}; }
