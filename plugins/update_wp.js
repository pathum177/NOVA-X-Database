const { cmd } = require("../lib/command");
const fs = require("fs");
const { exec } = require("child_process");

const ENV_PATH = "./settings.js"; // use settings.js
const PM2_PROCESS = "NOVA-X-MD"; // pm2 process name

cmd({
  pattern: "update_env",
  react: "⚙️",
  desc: "Update settings.js and restart",
  category: "owner",
  use: ".update_env KEY VALUE",
  filename: __filename
}, async (conn, mek, m, { args, reply, isOwner }) => {
  if (!isOwner) return reply("⛔ Owner only!");

  let key = args[0];
  let value = args.slice(1).join(" ");

  if (!key || !value) return reply("📝 Usage: .update_env KEY VALUE");

  try {
    // read current settings.js
    let file = fs.readFileSync(ENV_PATH, "utf8");

    // regex replace (AUTO_READ_STATUS: "false" → AUTO_READ_STATUS: "true")
    let regex = new RegExp(`(${key}:\\s*")[^"]*(")`);
    let newFile = file.replace(regex, `$1${value}$2`);

    fs.writeFileSync(ENV_PATH, newFile);

    reply(`✅ *${key}* updated → *${value}*\n\n🔄 Restarting bot...`);

    // restart with pm2
    setTimeout(() => {
      exec(`pm2 restart ${PM2_PROCESS}`, (err) => {
        if (err) {
          console.error(err);
          reply("❌ Restart failed. Check logs.");
        }
      });
    }, 1500);

  } catch (e) {
    console.error(e);
    reply("❌ Error updating settings.js");
  }
});
