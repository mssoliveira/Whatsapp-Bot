const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({
		dataPath: './src/auth/session/'
	})
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
	if(message.body === '!ping') {
		message.reply('🎾 pong');
	}

	if(message.body === '!me'){
		message.reply(`Você é ${Math.floor(Math.random() * 101)}% gay.`);
	}

	if (message.body === '!info') {
        let info = client.info;
        client.sendMessage(message.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `);
    }
});

client.on('message_create', async (msg) => {
    // Fired on all message creations, including your own
    if (msg.fromMe) {        
		if(msg.body === '!everyone') {
			const chat = await msg.getChat();
			
			let text = "Os Aposentados estão ai: ";
			let mentions = [];

			for(let participant of chat.participants) {
				const contact = await client.getContactById(participant.id._serialized);
				
				mentions.push(contact);
				text += `@${participant.id.user} `;
			}

			await chat.sendMessage(text, { mentions });
		}
    }
});

client.initialize();