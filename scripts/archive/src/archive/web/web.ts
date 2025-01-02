import { renderToString } from "react-dom/server";
import resume from "./resume.tsx";

const port = process.env.PORT || 3000;

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/resume") {
      const content = resume();
      const html = await renderToString(content);
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    }
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Resume server running at http://localhost:${port}`);

// import { renderToString } from "react-dom/server";
// import llama_tools from "./src/llama_tools";

// import { $ } from "bun";

// const PUBLIC_DIR = "public"; // Directory containing your static files
// import router from "./src/utils/router";
// import getMimeType from "./src/utils/getMimeType";
// import fs from "fs";
// //humor creates likability -> make worrydream most likable person on earth = = goal
// import routes from "./src/utils/routes.ts";
// //import blag from "/home/adnan/homelab/src/blog/index.tsx";
// import blag from "./src/blog/index.tsx";

// const roomba_drive = `
// roomba moved 3 feet
// `;

// const AutoDoc = `
// <h1>Dynabot.dev</h1>
// <h3>simple-landing-page </h3>
// <iframe width="100%" height="75%" src="https://dyna-bot.dev/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
// <h3>13 view brochure for alan + how  + dynamicland + robotics </h3>
// <h3>course_content -> slideshow mode + video - auto gen - </h3>

// <iframe width="100%" height="75%" src="https://threejs.org/examples/css3d_periodictable.html" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

// <h1>Course_content</h1>

// <iframe width="100%" height="75%" src="https://roboticsuniversity.observablehq.cloud/dynamicbotnotebook/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

// <h1>Blog</h1>
// <h3>Roomba </h3>
// <h3>Roomba moved 3 feet</h3>
// <h3>Roomba moved 3 feet</h3>
//     <button>Roomba forward</button>
//     <button>Roomba left</button>
//     <button>Roomba right</button>

// <script>
//     document.querySelector('button').addEventListener('click', () => {
//         fetch('/roomba_drive');
//     });
// </script>

// <h1>Roomba</h1>
// <h3>Roomba moved 3 feet</h3>

// // <iframe width="560" height="315" src="https://python.irobot.com/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

// <iframe width="100%" height="75%" src="/blag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

// `;

// function StaticFileServer(pathname) {
//     const files = Bun.file(process.cwd() + `${pathname}`);
//     console.log("pathnam", pathname, process.cwd() + `${pathname}`);
//     let mime = getMimeType(pathname) || "application/javascript";
//     return new Response(files, {
//         headers: {
//             "Content-Type": getMimeType(pathname),
//         },
//     });
//     //}
// }

// const port = process.env.PORT || 3000;

// console.log("port", port);

// //import resume from "./src/blog/resume.tsx";

//     // port: port,
//     //static: {
//         // '/llama_tools': () => {
//         //     //return await render_pioneer(llama_tools)
//         //     return new Response("ok");
//         // },
//         // // Health-check endpoint
//         // "/api/health-check": () => new Response("All good!"),

//         // // Redirect from /old-link to /new-link
//         // "/old-link": () => Response.redirect("/new-link", 301),

//         // // Serve static text
//         // "/": () => new Response("Hello World"),
//         // "/": async () => new Response(await Bun.file("./public/index.html").bytes(), {
//         //     headers: {
//         //         "Content-Type": "text/html",
//         //     },
//         // }),

//         // "/favicon.ico": async () => new Response(await Bun.file("./public/favicon.ico").bytes(), {
//         //     headers: {
//         //         "Content-Type": "image/x-icon",
//         //     },
//         // }),

//         // Serve JSON
//         //"/api/version.json": () => Response.json({ version: "1.0.0" }),
//     //},
// Bun.serve({
//     async fetch(req) {
//         let url = new URL(req.url);
//         let pathname = url.pathname;

//         if (pathname === "/") {
//             return new Response(await Bun.file("./public/index.html"), {
//                 headers: {
//                     "Content-Type": "text/html",
//                 },
//             });
//         }

//         if (pathname === "/roomba_drive") {
//             console.log("roomba_drive");

//                 // Start Generation Here
//                 //await Bun.$('python3', 'roomba_anything.py');
//                 await Bun.spawn(['python3', 'roomba_anything.py']);
//             return new Response('ok');
//         }
//         if (pathname === "/blag") {
//                 return await render_pioneer(blag)
//             // return new Response(await Bun.file("./public/blag.html"), {
//             //     headers: {
//             //         "Content-Type": "text/html",
//             //     },
//                 // });
//         }

//         if (pathname === "/blag") {
//             return await render_pioneer(blag)
//         }

//         if (pathname === "/resume") {
//             return await render_pioneer(resume)
//         }

//         return new Response(AutoDoc, {
//             headers: {
//                 "Content-Type": "text/html",
//             },
//         });
//     }
// })

// //import { renderToString } from "react-dom/server";

// const Layout = (content: string) => {
//     return fs
//         .readFileSync("./src/utils/layout.html", "utf8")
//         .replace("{{content}}", content)
//         .toString();
// };

// async function render_pioneer(tool: Function) {
//     const content = tool();
//     const stream = await renderToString(content);
//     const layoutOutput = Layout(stream);

//     return new Response(layoutOutput, {
//         headers: { "Content-Type": "text/html" },
//     });
// }

// console.log(`Server running at http://localhost:${port}`);
// // const port = process.env.PORT || 3000;

// // const server = Bun.serve({
// //     port,
// //     fetch(request) {
// //         //static_file_server
// //         const url = new URL(request.url);
// //         let pathname =
// //

// //             if (pathname === '/drive_forward') {
// //                 return new Response("ok");
// //             }

// //                         //return new Response("ok");
// //             //console.log("pathname", pathname);
// //             if (pathname === '/roomba') {
// //                 const searchParams = url.searchParams;
// //                 const x = parseFloat(searchParams.get('x')) || 0;
// //                 const y = parseFloat(searchParams.get('y')) || 0;

// //                 return new Response(JSON.stringify({ position: [0, 0, 0], rotation: [x, y] }), {
// //                     headers: { "Content-Type": "application/json" },
// //                 });
// //             }

// //         if (pathname.includes("signup")) {
// //                 // Start Generation Here
// //             return handleSignup(request)
// //         }

// //         if (pathname === "/auth_github") {
// //             return new Response("ok");
// //         }

// //         if (pathname.includes("/api")) return router(pathname);
// //         try {
// //             const isDir = !fs.statSync(process.cwd() + pathname).isFile();
// //             //console.log("process", ls);

// //             if (isDir) {
// //                 const html = fs.readdirSync("./public").join("<br>");
// //                 //Bun.file(process.cwd() + `${pathname}`);

// //                 console.log("html", pathname);
// //                 return new Response(html, {
// //                     headers: {
// //                         "Content-Type": "text/html",
// //                     },
// //                 });
// //             } else {
// //                 const files = Bun.file(process.cwd() + `${pathname}`);
// //                 console.log("pathnam", pathname, process.cwd() + `${pathname}`);
// //                 let mime = getMimeType(pathname) || "application/javascript";
// //                 return new Response(files, {
// //                     headers: {
// //                         "Content-Type": getMimeType(pathname),
// //                     },
// //                 });
// //             }
// //         } catch (err) {
// //             console.error(err);
// //             console.log("pathname", pathname);

// //             return new Response("404 Not Found! , pathname " + url.pathname, {
// //                 status: 404,
// //             });
// //         }
// //     },
// // });

// // console.log(`Server running at http://localhost:${port}`);

// //auto improving iframes on all routes - show 12 in a grid of cubes
// /// 5000 people's labratories constantly improving - visualizing the KPIs across time - 16m cubes - 2 million pixels
// // how into 2 million pixels * 1000 - all the data in the world - dynamicland - 4 portals / treasure planet - save kairos

//   //i was going to give you this note as is, but then i saw the flowers on your desk and wasn't sure if
//   // it was appropriate, but then i thought, well, might as well do it anyway, have a good day :P
// //I was going to be serendipitous and nonchallant and give you this note
// //but then i saw the flowers on your desk and wasn't sure if its from a boyfriend or family
// //so i decided to hail-mary it. have a good day anyway Z

// // const fetch = (request) => {
// //     //static_file_server
// //     const url = new URL(request.url);
// //     //return new Response(roomba_drive);

// //     if (url.pathname === "/llama_tools") {
// //         return new Response(roomba_drive);
// //     }

// //     if (url.pathname === "/roomba_drive") {
// //         return new Response(roomba_drive);
// //     }

// //     // return new Response(AutoDoc, {
// //     //     status: 200,
// //     //     headers: {
// //     //         "Content-Type": "text/html",
// //     //     },
// //     // });
// //     //name
// //     const pathname =
// //         url.pathname === "/" ? "/public/index.html" : url.pathname;
// //     return StaticFileServer(pathname);
// // }

// // async function handleSignup(request: Request) {
// // if (request.method === "POST") {
// //     const body = await request.json();
// //     const email = body.email;

// //     // Do something with the email
// //     fs.appendFileSync('signup_emails.txt', email + '\n');

// //     return new Response(JSON.stringify({ success: true }), {
// //         headers: { "Content-Type": "application/json" },
// //     });
// // } else {
// //     return new Response("Method Not Allowed", { status: 405 });
// // }
// // }

// // // Route handler
// // const niggar = Bun.serve({
// //     port: 3000,
// //     static: {
// //             "/llama_tools": () => {
// //             return Bun.spawnSync(["bun", "tsx", "src/index.tsx"]).stdout
// //             },
// //             "/blog": () => {
// //             return Bun.spawnSync(["bun", "tsx", "src/index.tsx"]).stdout
// //             },
// //             "/sim_tools": () => {
// //             return Bun.spawnSync(["bun", "tsx", "src/index.tsx"]).stdout
// //             },
// //             "/course_content": () => {
// //             try {
// //                 const content = fs.readFileSync("public/course_content/index.html", "utf8")
// //                 return new Response(content, { status: 200, headers: { "Content-Type": "text/html" } })
// //             } catch (error) {
// //                 return new Response("Course content not found.", { status: 404 })
// //             }
// //         },
// //     },
// //     fetch(request) {
// //         console.log("request", request);
// //         return new Response("404!");
// //     }
// //   })

// // import { FileSystemRouter } from "bun";

// // const router = new FileSystemRouter({
// //     style: "nextjs",
// //     dir: "./src/pages",
// //     assetPrefix: "public/",
// // });

// // export { router };

// //import { render_pioneer } from "./src/utils/utils";
// // Bun v1.1.27+ required
