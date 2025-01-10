import fs from "fs";

fs.readdirSync("src").forEach((folder) => {
  if (fs.statSync(`src/${folder}`).isDirectory()) {
    const dir = `src/${folder}`;
    fs.readdirSync(`${dir}`).forEach((file) => {
      fs.appendFileSync(
        `${dir}/${file}.md`,
        `https://github.com/BotParty/homelab_status_page/blob/main/[${folder}/${file}](${folder}/${file})\n`,
      );
    });
  }
});
