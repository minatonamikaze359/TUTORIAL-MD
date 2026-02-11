module.exports = {
    name: 'kick',
    async execute(m, sock) {
        if (!m.key.remoteJid.endsWith('@g.us')) return;
        const quoted = m.message.extendedTextMessage?.contextInfo?.participant;
        const mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        const user = quoted || mentioned;

        if (!user) return sock.sendMessage(m.key.remoteJid, { text: 'Tag or reply to someone to kick!' });
        await sock.groupParticipantsUpdate(m.key.remoteJid, [user], "remove");
        await sock.sendMessage(m.key.remoteJid, { text: 'Done! 👢' });
    }
};
