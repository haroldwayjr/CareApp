const fs = require("fs");
const path = require("path");
const base = path.join(__dirname, "..");
const out = __dirname;
const polyfill = `function _decodeUtf8(bin){let s='';const n=0x8000;for(let i=0;i<bin.length;i+=n){s+=String.fromCharCode.apply(null,bin.subarray(i,Math.min(i+n,bin.length)));}return s;}
`;
for (const nn of ["06", "07", "08", "09", "10"]) {
  const orig = fs.readFileSync(path.join(base, `${nn}_exec.js`), "utf8");
  const keys2 = [
    ...orig.matchAll(/setSharedPluginData\("careapp","([^"]+)",""\)/g),
  ].map((m) => m[1]);
  const b64Line = orig.match(/^const b64=.+;/m)[0];
  const clears = keys2
    .map((k) => `figma.root.setSharedPluginData("careapp","${k}","");`)
    .join("\n");
  const fixed = `${polyfill}${b64Line}
if(!b64||b64.length<100) return {error:'missing_payload',len:(b64||'').length};
const bin=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
const code=_decodeUtf8(bin);
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const result=await new AsyncFunction(code)();
${clears}
return result;
`;
  fs.writeFileSync(path.join(out, `${nn}_exec.js`), fixed);
  console.log(nn, "keys", keys2.length, "len", fixed.length);
}
