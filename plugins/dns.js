const dns = require('dns').promises;

module.exports = {
    name: 'dns',
    async execute(m, sock, { args }) {
        const host = args[0];
        if (!host) return sock.sendMessage(m.key.remoteJid, { text: 'Enter a host!' });

        try {
            const aRecords = await dns.resolve4(host);
            const mxRecords = await dns.resolveMx(host);
            
            let res = `📡 *DNS RECORDS: ${host}*\n\n`;
            res += `📍 *IP (A):* ${aRecords.join(', ')}\n`;
            res += `📧 *Mail Servers (MX):* \n` + mxRecords.map(r => `- ${r.exchange} (Pref: ${r.priority})`).join('\n');

            await sock.sendMessage(m.key.remoteJid, { text: res });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: 'Could not resolve DNS.' });
        }
    }
};
