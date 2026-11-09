const n=5; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','xh19h1_'+i); if(!p) return {error:'missing',i,key:'xh19h1'}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try{
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','xh19h1_'+i,'');
  return {batch:'19',half:'h1',via:'half-store-exec',result};
}catch(e){return {batch:'19',half:'h1',error:String(e),stack:String(e&&e.stack).slice(0,400)};}