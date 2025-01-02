import { WebhookReceiver } from "livekit-server-sdk";

//const host = "localhost";
const port = 3333;

const secret = `118jYtOPXJUYVeH7ZMSlQSoMKzPNve6sATZ149DfmfYC`;
const key = `APItSbwXvSjh4cf`;

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY || key,
  process.env.LIVEKIT_API_SECRET || secret,
);

import Bun from "bun";

Bun.serve({
  //hostname: host,
  port: port,
  async fetch(req) {
    const url = new URL(req.url);
    console.log("hii");

    if (url.pathname === "/") return new Response("Home page!");

    if (url.pathname === "/webhook") {
      console.log(url);
      const event = await receiver.receive(req.body, req.get("Authorization"));
      console.log(event);
      return new Response("Home page!");
    }

    //return req.text().then((data) => {
    // const authHeader = req.headers.get("authorization");
    // const event = receiver.receive(data, authHeader);

    // console.log("received webhook event", event);

    // return new Response(null, { status: 200 });
    //});
  },
});

//console.log(`Webhook example running on http://${host}:${port}`);
