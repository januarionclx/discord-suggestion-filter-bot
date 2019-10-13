# discord-suggestion-filter-bot
A simple Discord bot so Janitors don't have to work as much.

## How to

Edit the config

```
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
	add_emojis: ['✅', '❌']
}
```

Profit.
