const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const express = require('express');
const path = require('path');
const pino = require('pino');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the HTML file
app.use(express.static('static'));

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: "silent" })
    });

    // --- API Endpoint for Pairing Code ---
    app.get('/getcode', async (req, res) => {
        let num = req.query.number;
        if (!num) return res.json({ error: "Number required" });
        
        try {
            if (!sock.authState.creds.registered) {
                await delay(1500);
                let code = await sock.requestPairingCode(num);
                res.json({ code });
            } else {
                res.json({ code: "Already Connected!" });
            }
        } catch (e) {
            res.json({ error: "Check console" });
        }
    });

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', (up) => {
        const { connection } = up;
        if (connection === 'open') console.log("✅ Bot Connected Successfully!");
        if (connection === 'close') startBot();
    });

    // Add your message/plugin logic here...
}

app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
startBot();
