// server.js
import { serve } from "bun";
import { createClient } from "@supabase/supabase-js";



import execSimplePlaywright from './simple-playwright-agent'

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

const html = `
<html>
  <body>
    <h1>Hello World 2025</h1>


    <h2>Supabase Data</h2>
    <pre id="supabase-data">
      ${await getAllKV()}
    </pre>



    <button>Execuute playwright script</button>
    <script>
    document.querySelector('button').addEventListener('click', () => {
      fetch('/playwright').then(res => res.text())
      .then((text) => console.log(text))
    
    })
    </script>
  </body>
</html>
`;

async function display_supabase_data() {
  return new Response(JSON.stringify({ data: await getAllKV() }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

serve({
  port: 8000,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/playwright") { 
      const data = await execSimplePlaywright()
      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json"
        }
      });
    }


    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log("Server running at http://localhost:8000");
