function _decodeUtf8(bin){let s='';const n=0x8000;for(let i=0;i<bin.length;i+=n){s+=String.fromCharCode.apply(null,bin.subarray(i,Math.min(i+n,bin.length)));}return s;}
const b64=figma.root.getSharedPluginData("careapp","c08_0_0")+figma.root.getSharedPluginData("careapp","c08_0_1")+figma.root.getSharedPluginData("careapp","c08_0_2")+figma.root.getSharedPluginData("careapp","c08_0_3")+figma.root.getSharedPluginData("careapp","c08_0_4")+figma.root.getSharedPluginData("careapp","c08_1_0")+figma.root.getSharedPluginData("careapp","c08_1_1")+figma.root.getSharedPluginData("careapp","c08_1_2")+figma.root.getSharedPluginData("careapp","c08_1_3")+figma.root.getSharedPluginData("careapp","c08_1_4");
if(!b64||b64.length<100) return {error:'missing_payload',len:(b64||'').length};
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=_decodeUtf8(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const result=await new AsyncFunction(code)();

return result;
