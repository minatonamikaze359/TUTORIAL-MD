const axios = require('axios');

module.exports = {
    name: 'dl',
    async execute(m, sock, { args }) {
        const url = args[0];
        if (!url) return sock.sendMessage(m.key.remoteJid, { text: 'Please provide a link (YT/IG/TikTok)!' });

        await sock.sendMessage(m.key.remoteJid, { text: '⏳ Fetching your media...' });

        try {
            // Using a reliable public API for the tutorial
            const res = await axios.get(`https://api.lolhuman.xyz/api/download/allit?apikey=free&url=${url}`);
            const data = res.data.result;

            await sock.sendMessage(m.key.remoteJid, { 
                video: { url: data.link }, 
                caption: `✅ Downloaded Successfully!` 
            }, { quoted: m });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Link not supported or API down.' });
        }
    }
};
