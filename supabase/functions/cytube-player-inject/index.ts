import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const css = await Deno.readTextFile("./build-player/assets/index-BAn12H4p.css");
const js = await Deno.readTextFile("./build-player/assets/index-DAk9sLCk.js");

serve(async () => {
  const html = `
    <style>${css}</style>
    <div id="root"></div>
    <script type="module">${js}</script>
  `;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
});