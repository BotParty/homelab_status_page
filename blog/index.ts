import fs from "fs";

// fs.readdirSync("src").forEach((folder) => {
//   if (fs.statSync(`src/${folder}`).isDirectory()) {
//     const dir = `src/${folder}`;

//     fs.readdirSync(`${dir}`).forEach((file) => {
//       const fileName = `${dir}/${file}`;
//       console.log(fileName);
//       // fs.appendFileSync(
//       //   fileName,
//       //   `<a href="https://github.com/BotParty/homelab_status_page/blob/main/[${folder}/${file}](${folder}/${file})">click here to edit</a>\n`,
//       // );
//     });
//   }
// });

import config from "./observablehq.config";

config.pages.forEach((page) => {
  page.pages.forEach((page) => {
    const thisPage = page.path;
    const href = `<a href="https://github.com/BotParty/homelab_status_page/blob/main${thisPage}">click here to edit this document</a>`;
    console.log(href);
    fs.unlinkSync("src/" + thisPage);
    fs.appendFileSync("src/" + thisPage + ".md", href);
  });
});
