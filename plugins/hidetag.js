module.exports = {
    name: 'hidetag',
    async execute(m, sock, { args }) {
        const metadata = await sock.groupMetadata(m.key.remoteJid);
        const participants = metadata.participants;
        sock.sendMessage(m.key.remoteJid, { 
            text: args.join(" ") || "Attention!", 
            mentions: participants.map(a => a.id) 
        });
    }
};
