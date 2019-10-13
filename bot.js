// includes
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE'] });

// config
const client_id = 'CLIENT_ID';
const poller_config = {
	// where the message will go
	target_channel: 'TARGET_CHANNEL_ID',
	// the watched channels (where it will check for the reaction count)
	watch_channels: ['WATCH_CHANNEL_ID', 'WATCH_CHANNEL_ID'],
	// the tracked emoji 
	track_emoji: '✅',
	// count to move
	track_emoji_count: 10,
	// emoji keys (reactions added to the new message)
	add_emojis: ['✅', '❌'
]}

client.on("messageReactionAdd", function(messageReaction, user){
	messageReaction.message.fetch().then((message) => {
		// if not in a watched channel, return;
		if (!poller_config['watch_channels'].includes(message.channel.id)) return;		

		// reaction count
		const count = message.reactions.get(poller_config['track_emoji']).count;

		if (count < poller_config['track_emoji_count'])
			return;

		// create message + react in order, async.
		const moveMessage = async (message) => {
			const sent = await client.channels.get(poller_config['target_channel']).send(`Suggested by: ${message.author}\`\`\` ${message.content} \`\`\``, message.attachments.array())
				.catch(_ => console.log('Error creating the new message.'));

			for (emoji of poller_config['add_emojis']){
				await sent.react(emoji)
					.catch(_ => console.log('Error adding reactions.'));
			}
		}

		moveMessage(message).then(_ => {
			if (!message.deleted){
				message.delete()
					.catch(_ => console.log('Error deleting the message ' + message.id))
			}
		});
	})
	.catch(_ => {
		console.log('Error fetching the message.')
	})
});

// onReady
client.once('ready', () => {
	console.log('Logged in!');
});

// login
client.login(client_id)