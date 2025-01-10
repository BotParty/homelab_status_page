import fs from "fs";

fs.readdirSync("src").forEach((folder) => {
  if (fs.statSync(`src/${folder}`).isDirectory()) {
    const dir = `src/${folder}`;
    fs.readdirSync(`${dir}`).forEach((file) => {
      const fileName = `${dir}/${file}.md`;
      console.log(fileName);
      // fs.appendFileSync(
      //   `${dir}/${file}.md`,
      //   `https://github.com/BotParty/homelab_status_page/blob/main/[${folder}/${file}](${folder}/${file})\n`,
      // );
    });
  }
});
