const n=4; const parts=[];
for(let i=0;i<n;i++){const p=figma.root.getSharedPluginData('soma.xsbold','xh13h0_'+i); if(!p) return {error:'missing',i,key:'xh13h0'}; parts.push(p);}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
try{
  const result=await new AsyncFunction(src)();
  for(let i=0;i<n;i++) figma.root.setSharedPluginData('soma.xsbold','xh13h0_'+i,'');
  return {batch:'13',half:'h0',via:'half-store-exec',result};
}catch(e){return {batch:'13',half:'h0',error:String(e),stack:String(e&&e.stack).slice(0,400)};}