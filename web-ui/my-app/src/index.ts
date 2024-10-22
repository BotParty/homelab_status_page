import { Context, Hono } from 'hono'
import { html } from 'hono/html'
import { AccessToken } from "livekit-server-sdk";

const app = new Hono()

// const hono_livekit_connect = async (c: Context) => { 
//   return c.json(await livekit_connect(c.req.raw))
// }

import grid from './llama-tools.jsx'
import { flushSync } from 'react-dom'
import fs from 'fs'
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { basicAuth } from 'hono/basic-auth';
import { etag } from 'hono/etag';
import { serveStatic } from 'hono/serve-static';
import { jwt } from 'hono/jwt';
import { cors } from 'hono/cors';


app.use(logger())

// specify path
app.use('*', cors())

app.all('/', async (c) => {
  return c.html(Layout(grid()))
})

app.all('/odyssey', async (c) => {
  return c.html(Layout(grid()))
})

app.all('/*', async (c) => {
  return c.html(Layout(grid()))
})

app.all('/livekit_screenshare', async (c) => {
  console.log('livekit_screenshare')
  const html = fs.readFileSync('./src/livekit_screenshare.html', 'utf8')
  return c.html(html)
})


app.all('/views/*', async (c) => {
  console.log(c.req.path)

  const html = fs.readFileSync('src/'+c.req.path, 'utf8')
  return c.html(html)
})

// app.get('/api/replay_analyzer', (c) => c.json({'Pretty Blog API': 1}));
console.log('app', 'hono', Date.now())

app.fire()
export default app

const Layout = (content: any) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://unpkg.com/htmx.org@1.9.3"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <title>Hono + htmx</title>
    </head>
    <body>
      <div class="p-4">
        <h1 class="text-4xl font-bold mb-4"><a href="/">Todo</a></h1>
        ${content}
      </div>
    </body>
  </html>
`


//app.get('/blag', (c) => c.json({'Pretty Blog API': 1}));
//app.get('/blag-archive', (c) => c.json({'Pretty Blog API': 1}));


//app.get('/api/magic_llama', (c) => c.json({'Pretty Blog API': 1}));
//app.get('/api/measure_magic_llama', (c) => c.json({'Pretty Blog API': 1}))

const apiKey = process.env.LIVEKIT_API_KEY
const apiSecret = process.env.LIVEKIT_API_SECRET
const wsUrl = process.env.LIVEKIT_WS_URL
app.post('/livekit_connect', async (c) => {
  console.log('livekit_connect');

  // Identity creation with timestamp to avoid conflicts
  const jsonData = { identity: 'voice to prompt?' + Date.now() };
  const identity = jsonData.identity;

  if (!identity) {
    return c.text("Identity parameter is missing", 400);
  }

  // Connecting to LiveKit
  const json = await connect_to_livekit(jsonData);
  console.log('Generated token and wsUrl:', json);

  return c.json(json);
});

// Function to generate token and connect to LiveKit
async function connect_to_livekit(options: { identity: string }) {
  console.log("options", options);

  // Default identity if not provided
  if (!options.identity) {
    options.identity = 'anonymous' + Math.random().toString(36).substring(2, 15);
  }

  // Creating a new AccessToken
  const token = new AccessToken(apiKey, apiSecret, {
    identity: options.identity,
  });

  // Add grant to the token (e.g., room access)
  token.addGrant({
    room: "example-room",  // Replace with your actual room name
    roomJoin: true,
    canPublish: true,
  });

  // Generate the JWT token
  const jwt = await token.toJwt();

  // Return token and WebSocket URL
  return { token: jwt, wsUrl };
}

// Starting the server
app.fire();