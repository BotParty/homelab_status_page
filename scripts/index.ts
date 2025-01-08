
import { serve } from "bun";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl =
  process.env.SUPABASE_URL || "https://ewkxvbgbzikwwudriebh.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y";
const supabase = createClient(supabaseUrl, supabaseKey);

const getAllKV = async () => {
  const { data, error } = await supabase.from("KV").select("*");
  if (error) {
    console.error("Supabase error:", error);
    return error;
  }
  return Object.entries(data)
    .map(([key, value]) => `<p>${key}: ${JSON.stringify(value)}</p>`)
    .join("");
};

const bun_server_ui = `
<html>
  <body>
    <h1>Hello World 2025 jan 7</h1>


    <h2>Supabase Data</h2>
    <pre id="supabase-data">
      ${await getAllKV()}
    </pre>



    <button id="playwright">Execuute playwright script</button>


  </body>
</html>
`;
  


serve({
  port: 8000,
  async fetch(req) {
    const url = new URL(req.url);


    return new Response(bun_server_ui, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log("Server running at http://localhost:8000");
