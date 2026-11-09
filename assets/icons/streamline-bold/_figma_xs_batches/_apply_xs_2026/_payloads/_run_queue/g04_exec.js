const NS='soma.xsbold';
const n=5;
const parts=[];
for (let i=0;i<n;i++) {
  const p=figma.root.getSharedPluginData(NS,'g04_'+i);
  if (!p) return {error:'missing',i,n};
  parts.push(p);
}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const result=await new AsyncFunction(src)();
for (let i=0;i<n;i++) figma.root.setSharedPluginData(NS,'g04_'+i,'');
return result;
