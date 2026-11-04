const n=6; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','b19_'+i); if(!p) return {error:'missing',i,batch:19}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try {
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','b19_'+i,'');
  return {batch:19, via:'chunk-eval', result};
} catch(e) { return {batch:19, error:String(e), stack:String(e&&e.stack).slice(0,500)}; }
