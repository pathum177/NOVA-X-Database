const axios = require("axios")

module.exports = async (conn, m) => {
  try {
    // Message mentions check
    if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid) {
      const mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid
      const botNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net"

      if (mentioned.includes(botNumber)) {
        // Mark message as read
        await conn.readMessages([m.key])

        const userText = m.message.extendedTextMessage?.text || m.text || ""
        if (!userText) return

        // AI API call
        const res = await axios.get(
          `https://www.dark-yasiya-api.site/gpt?query=${encodeURIComponent(userText)}`
        )
        const result = res.data.result || "🤖 මට මේකේ උත්තර නෑ!"

        // Reply back
        await conn.sendMessage(m.chat, { text: result }, { quoted: m })
      }
    }
  } catch (e) {
    console.log("AI Mention Error:", e)
  }
}
