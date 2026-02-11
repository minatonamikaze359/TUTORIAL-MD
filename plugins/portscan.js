const net = require('net');

module.exports = {
    name: 'portscan',
    async execute(m, sock, { args }) {
        const host = args[0];
        if (!host) return sock.sendMessage(m.key.remoteJid, { text: 'Provide a target IP/Domain!' });

        const ports = [21, 22, 23, 25, 53, 80, 443, 3306];
        let results = `🔌 *PORT SCAN: ${host}*\n\n`;

        for (let port of ports) {
            const check = () => new Promise((resolve) => {
                const socket = new net.Socket();
                socket.setTimeout(1500);
                socket.on('connect', () => { socket.destroy(); resolve(`✅ ${port}: OPEN`); });
                socket.on('timeout', () => { socket.destroy(); resolve(`❌ ${port}: CLOSED`); });
                socket.on('error', () => { socket.destroy(); resolve(`❌ ${port}: CLOSED`); });
                socket.connect(port, host);
            });
            results += await check() + '\n';
        }

        await sock.sendMessage(m.key.remoteJid, { text: results });
    }
};
