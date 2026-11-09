
const bin = Uint8Array.from(atob("H4sIAK6ZfGoC/8tIzcnJ100rys/VTa/KLNAtSS0u0TU0MjYxBQAhm6mMGgAAAA=="), c => c.charCodeAt(0));
const hasDS = typeof DecompressionStream !== 'undefined';
let text = null, err = null;
if (hasDS) {
  try {
    const ds = new DecompressionStream('gzip');
    const stream = new Blob([bin]).stream().pipeThrough(ds);
    text = await new Response(stream).text();
  } catch (e) { err = String(e); }
}
return { hasDS, text, err, atob: typeof atob, Blob: typeof Blob };
