const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion, 
    makeCacheableSignalKeyStore 
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const fs = require("fs");
const path = require("path");
const config = require("./config");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false, // Set to false for Pairing Code
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
        }
    });

    // --- PAIRING CODE LOGIC ---
    if (!sock.authState.creds.registered) {
        const phoneNumber = config.ownerNumber; 
        setTimeout(async () => {
            let code = await sock.requestPairingCode(phoneNumber);
            console.log(`\n\n🔗 PAIRING CODE: ${code}\n\n`);
        }, 3000);
    }

    sock.ev.on("creds.update", saveCreds);

    // --- PLUGIN LOADER ---
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const m = messages[0];
        if (!m.message || m.key.fromMe) return;

        const messageType = Object.keys(m.message)[0];
        const body = (messageType === 'conversation') ? m.message.conversation : 
                     (messageType === 'extendedTextMessage') ? m.message.extendedTextMessage.text : '';
        
        if (!body.startsWith(config.prefix)) return;

        const args = body.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const pluginPath = path.join(__dirname, 'plugins', `${commandName}.js`);
        if (fs.existsSync(pluginPath)) {
            const plugin = require(pluginPath);
            try {
                await plugin.execute(m, sock, { args, config });
            } catch (err) {
                console.error(err);
                sock.sendMessage(m.key.remoteJid, { text: "❌ Error executing command." });
            }
        }
    });

    console.log(`${config.botName} is online!`);
}

startBot();
