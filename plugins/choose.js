module.exports = {
    name: 'choose',
    async execute(m, sock, { args }) {
        const input = args.join(" ");
        if (!input.includes('|')) return sock.sendMessage(m.key.remoteJid, { text: 'Format: .choose option1 | option2' });
        const options = input.split('|');
        const choice = options[Math.floor(Math.random() * options.length)].trim();
        await sock.sendMessage(m.key.remoteJid, { text: `🤔 I choose: *${choice}*` });
    }
};
