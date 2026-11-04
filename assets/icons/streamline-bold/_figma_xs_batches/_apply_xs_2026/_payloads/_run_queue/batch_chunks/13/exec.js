const NS='soma.xsbold';
const n=8;
const parts=[];
for (let i=0;i<n;i++) {
  const p=figma.root.getSharedPluginData(NS,'x13_'+i);
  if (!p) return {error:'missing',i,n,batch:13};
  parts.push(p);
}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
let result;
try { result=await new AsyncFunction(src)(); }
catch(e) { return {batch:13, error:String(e), message:e&&e.message}; }
for (let i=0;i<n;i++) figma.root.setSharedPluginData(NS,'x13_'+i,'');
return {batch:13, ...result};
