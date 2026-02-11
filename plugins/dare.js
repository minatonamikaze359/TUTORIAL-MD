module.exports = {
    name: 'dare',
    async execute(m, sock) {
        const dares = [
            "Eat a spoonful of hot sauce.",
            "Send a voice note singing your favorite song.",
            "Change your WhatsApp bio to 'I am a potato' for 1 hour.",
            "Text your crush and tell them you like them.",
            "Do 20 pushups and send a video (or voice note of you struggling)."
        ];
        const randomDare = dares[Math.floor(Math.random() * dares.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `🔥 *DARE:* ${randomDare}` });
    }
};
