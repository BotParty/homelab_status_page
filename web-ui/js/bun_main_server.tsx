
// proxy-server.

const port = 3333;
/// bun - dockerized + system or whateer 
//      --- this proxies to vite for app 
      ////   --- this proxies to another bun or deno server for iteration  /sanit
        /// that way --- the primary bun process is mostly static and cant break 
            ///that means llama can edit all other files wtihout crashing your app --- TDD ==== done yourintern can write the whoel thing for you 
             ////then youge tto read papers not write app code ---- vp of eng not a junir odev. 

Bun.serve({
  port, // The port your proxy server will listen on
  async fetch(req) {
    const url = new URL(req.url);
    url.port = "8001"; // Forward to Vite server's port
    url.hostname = "localhost"; // Assuming Vite is running locally

    try {
      // Forward the request to the Vite server
      const response = await fetch(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.body,
        duplex: 'half', // Necessary for streaming request bodies
      });

      return response; // Return the Vite server's response to the client
    } catch (error) {
      console.error('Error proxying request:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
});
console.log("server running on port", port);