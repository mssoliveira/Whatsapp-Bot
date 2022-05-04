const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
	authStrategy: new LocalAuth({
		dataPath: './src/auth/session/',
	}),
});

client.on('qr', (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
	console.log('Client is ready!');
});

client.initialize();

client.on('message', async (message) => {	

	if (
		message.body === '#fodasemauricin' ||
		message.body === '#foda-semauricin'
	) {
		message.reply(`Vá tomar no Cu!`);
	}

	if (message.body === '!me') {
		message.reply(`Você é ${Math.floor(Math.random() * 101)}% gay.`);
	}

	if (message.body === 'Boca') {
		message.reply(`Você é uma Puta`);
	}	
});

client.on('message_create', async (msg) => {

	if (msg.body === '!ping') {
		msg.reply('🎾 pong');
	}

	if (msg.body === '!todes') {
		const chat = await msg.getChat();

		let text = '';
		let mentions = [];
		
		for (let participant of chat.participants) {
			const contact = await client.getContactById(
				participant.id._serialized
			);

			mentions.push(contact);
			text += `@${participant.id.user} `;
		}
		await chat.sendMessage(text, { mentions });
	}

	if (msg.body === '!bomdia') {
		const chat = await msg.getChat();

		let text = 'Bom Dia a Todos do Grupo!  ';
		let mentions = [];
		
		for (let participant of chat.participants) {
			const contact = await client.getContactById(
				participant.id._serialized
			);

			mentions.push(contact);
			text += `@${participant.id.user} `;
		}
		await chat.sendMessage(text, { mentions });
	}
	if (msg.body === '!comedordegalo') {
		const chat = await msg.getChat();
		let text = '';
		let mentions = [];
		
		for (let participant of chat.participants) {
			const contact = await client.getContactById(
				participant.id._serialized
			);

			mentions.push(contact);
			text += `@${participant.id.user} `;
		}
		
		await chat.sendMessage(text, { mentions });

		
	}


	if (msg.fromMe) {
		if (msg.body === 'Oi') {
			const contact = await msg.getContact();
			const chat = await msg.getChat();
			chat.sendMessage(`Hi @${contact.number}!`, {
				mentions: [contact],
			});
		}
	}
});
