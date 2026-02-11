module.exports = {
    name: 'quote',
    async execute(m, sock) {
        const quotes = [
            "Your limitation—it's only your imagination.",
            "Push yourself, because no one else is going to do it for you.",
            "Success doesn’t just find you. You have to go out and get it.",
            "Code is like humor. When you have to explain it, it’s bad."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `💡 *QUOTE:* \n\n"${randomQuote}"` });
    }
};
