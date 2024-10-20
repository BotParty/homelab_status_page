import { serve } from "https://deno.land/std@0.206.0/http/server.ts";

const proxyUrl = "https://docs.anthropic.com/";  // URL of the Anthropic documentation

async function proxyHandler(request: Request): Promise<Response> {
  // Extract the requested path from the original request
  const url = new URL(request.url);
  const path = url.pathname;

  // Fetch content from the external resource (Anthropic docs)
  const targetUrl = `${proxyUrl}${path}`;
  const proxyRequest = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
  });

  // Forward the response from the external site
  const responseHeaders = new Headers(proxyRequest.headers);


  responseHeaders.delete("X-Frame-Options");

  // Add CORS headers to allow embedding in an iframe
  responseHeaders.set("Access-Control-Allow-Origin", "*");
  responseHeaders.set("Content-Type", "text/html");

  const body = await proxyRequest.text();

  return new Response(body, {
    status: proxyRequest.status,
    headers: responseHeaders,
  });
}

// Start the Deno server on port 8080
serve(proxyHandler, { port: 8080 });

console.log("Proxy server running on http://localhost:8080/");
