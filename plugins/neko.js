const axios = require('axios');

module.exports = {
    name: 'neko',
    async execute(m, sock) {
        try {
            const res = await axios.get('https://api.waifu.pics/sfw/neko');
            await sock.sendMessage(m.key.remoteJid, { 
                image: { url: res.data.url }, 
                caption: "Nyaa~~ 🐱" 
            }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: 'Nekos are hiding right now...' });
        }
    }
};
