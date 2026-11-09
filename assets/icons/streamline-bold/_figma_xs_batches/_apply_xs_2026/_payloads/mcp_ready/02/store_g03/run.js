const n=2; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','g03_'+i); if(!p) return {error:'missing',i,g:'g03'}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try {
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','g03_'+i,'');
  return {batch:'02', group:'g03', via:'exact-eval', result};
} catch(e) { return {batch:'02', group:'g03', error:String(e)}; }
