const n=4; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','b15_'+i); if(!p) return {error:'missing',i,batch:15}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try {
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','b15_'+i,'');
  return {batch:15, via:'chunk-eval', result};
} catch(e) { return {batch:15, error:String(e), stack:String(e&&e.stack).slice(0,500)}; }
