function _decodeUtf8(bin){let s='';const n=0x8000;for(let i=0;i<bin.length;i+=n){s+=String.fromCharCode.apply(null,bin.subarray(i,Math.min(i+n,bin.length)));}return s;}
const n=4; let b64='';
for(let i=0;i<n;i++){b64+=figma.root.getSharedPluginData('careapp','cb09h0_'+i)||'';}
if(b64.length<100) return {error:'missing',len:b64.length,key:'cb09h0'};
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=_decodeUtf8(bin);
for(let i=0;i<n;i++) figma.root.setSharedPluginData('careapp','cb09h0_'+i,'');
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();
