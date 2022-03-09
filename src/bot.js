const { Client, Collection, Intents } = require('discord.js');
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"], partials: ["CHANNEL"] });

["commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}.js`)(client));

client.login("OTQyNDUxNTMyODAzMjMxODE0.YgksYw.v1UI04LXbzWYI5-DqPgpB0q1aR0")