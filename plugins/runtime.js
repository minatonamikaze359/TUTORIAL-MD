module.exports = {
    name: 'runtime',
    async execute(m, sock) {
        const seconds = process.uptime();
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m_ = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        const run = `${d}d ${h}h ${m_}m ${s}s`;
        await sock.sendMessage(m.key.remoteJid, { text: `*Runtime:* ${run}` });
    }
};
