require('dotenv').config();
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"], partials: ["CHANNEL"] });

["commands"].forEach(x => client[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}.js`)(client));

client.login(process.env.token);
