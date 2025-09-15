const axios = require("axios")

module.exports = async (conn, m) => {
  try {
    // Ignore own messages
    if (m.key.fromMe) return

    // Check group chat only
    if (!m.key.remoteJid.endsWith("@g.us")) return

    // Mark message as read
    await conn.readMessages([m.key])

    // Extract user text
    const userText = m.text || m.message?.conversation || ""
    if (!userText) return

    // Call AI API
    const res = await axios.get(
      `https://www.dark-yasiya-api.site/gpt?query=${encodeURIComponent(userText)}`
    )
    const result = res.data.result || "🤖 මට මේකේ උත්තර නෑ!"

    // Reply back to user
    await conn.sendMessage(m.chat, { text: result }, { quoted: m })

  } catch (e) {
    console.error("AI Group Reply Error:", e)
  }
}
