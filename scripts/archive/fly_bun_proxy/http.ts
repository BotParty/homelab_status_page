// http.ts
const vmRegion = process.env.FLY_REGION || "local";
console.log(`Doing it from ${vmRegion}`);

Bun.serve({
  port: 3000,
  fetch(request) {
    const region = request.headers.get("fly-region") || "??";
    const url = new URL(request.url);
    console.log(request.headers.get("fly-client-ip"), request.url);

    return new Response(`
      Welcome to Bun!\n\n
      This is ${url.pathname}\n
      Served from ${region}
    `);
  },
});
