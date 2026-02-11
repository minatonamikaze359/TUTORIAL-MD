module.exports = {
    name: 'ss',
    async execute(m, sock, { args }) {
        const url = args[0];
        if (!url) return sock.sendMessage(m.key.remoteJid, { text: 'Provide a URL! (e.g. .ss google.com)' });

        const ssUrl = `https://image.thum.io/get/width/1200/fullpage/https://${url.replace('https://', '')}`;
        
        await sock.sendMessage(m.key.remoteJid, { 
            image: { url: ssUrl }, 
            caption: `📸 Screenshot of ${url}` 
        }, { quoted: m });
    }
};
