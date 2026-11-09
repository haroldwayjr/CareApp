const NS='soma.xsbold';
const n=11;
const parts=[];
for (let i=0;i<n;i++) {
  const p=figma.root.getSharedPluginData(NS,'x17_'+i);
  if (!p) return {error:'missing',i,n,batch:17};
  parts.push(p);
}
const src=atob(parts.join(''));
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
let result;
try { result=await new AsyncFunction(src)(); }
catch(e) { return {batch:17, error:String(e), message:e&&e.message}; }
for (let i=0;i<n;i++) figma.root.setSharedPluginData(NS,'x17_'+i,'');
return {batch:17, ...result};
