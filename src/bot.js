require('dotenv').config();
const mongodb = require('./connection/connection.js');
global.__basedir = __dirname;
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({intents: ["GUILDS", "GUILD_MESSAGES","GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"], partials: ["CHANNEL", "GUILD_MEMBER"] });

["commands", "malifunctioned"].forEach(x => client[x] = new Collection());

["command", "event"].forEach(x => require(`./handlers/${x}.js`)(client));
client.login(process.env.token);

