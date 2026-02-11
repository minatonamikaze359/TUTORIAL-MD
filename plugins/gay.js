module.exports = {
    name: 'gay',
    async execute(m, sock) {
        const user = m.message.extendedTextMessage?.contextInfo?.participant || m.key.participant || m.key.remoteJid;
        const percentage = Math.floor(Math.random() * 101);
        await sock.sendMessage(m.key.remoteJid, { 
            text: `🏳️‍🌈 *GAY TEST*\n\nUser: @${user.split('@')[0]}\nResult: ${percentage}% Gay`,
            mentions: [user]
        });
    }
};
