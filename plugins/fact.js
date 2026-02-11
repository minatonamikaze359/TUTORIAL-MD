module.exports = {
    name: 'fact',
    async execute(m, sock) {
        const facts = [
            "Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs.",
            "A single strand of spaghetti is called a 'spaghetto'.",
            "Octopuses have three hearts.",
            "Bananas are berries, but strawberries aren't."
        ];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `🧐 *DID YOU KNOW?*\n\n${randomFact}` });
    }
};
