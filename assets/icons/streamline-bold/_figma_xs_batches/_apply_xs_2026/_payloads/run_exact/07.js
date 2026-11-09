const n=1; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','c07_'+i); if(!p) return {error:'missing',i,batch:'07'}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try {
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','c07_'+i,'');
  return {batch:'07', via:'exact-eval', result};
} catch(e) { return {batch:'07', error:String(e), stack:String(e&&e.stack).slice(0,400)}; }
