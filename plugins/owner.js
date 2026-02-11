module.exports = {
    name: 'owner',
    async execute(m, sock) {
        const ownerNumber = "8801719741293";
        const ownerName = "Minato Namikaze";
        
        // This sends a VCard (Contact Card) so people can save your number easily
        const vcard = 'BEGIN:VCARD\n' 
                    + 'VERSION:3.0\n' 
                    + `FN:${ownerName}\n` 
                    + `ORG:TUTORIAL-MD;\n`
                    + `TEL;type=CELL;type=VOICE;waid=${ownerNumber}:${ownerNumber}\n`
                    + 'END:VCARD';

        await sock.sendMessage(m.key.remoteJid, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: m });

        await sock.sendMessage(m.key.remoteJid, { 
            text: `👋 Hey! That's my owner, *${ownerName}*. \nDon't spam or you'll get blocked! ⚡` 
        }, { quoted: m });
    }
};
