const n=3; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','xh14h1_'+i); if(!p) return {error:'missing',i,key:'xh14h1'}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try{
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','xh14h1_'+i,'');
  return {batch:'14',half:'h1',via:'half-store-exec',result};
}catch(e){return {batch:'14',half:'h1',error:String(e),stack:String(e&&e.stack).slice(0,400)};}