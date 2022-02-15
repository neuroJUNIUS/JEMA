require('dotenv').config();

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "pazhalsta "
client.on('ready', () => {console.log('The bot has logged in.')});

client.on('message', (messageCreate) =>{
    if(messageCreate.author.bot === true) return;
    if (messageCreate.content === 'hello')
    {
        messageCreate.reply("sup")
    }
    if(messageCreate.content.startsWith(PREFIX))
    {
        const [CMD_NAME, ...args] = messageCreate.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        if (CMD_NAME === 'kick')
        {
            if (messageCreate.member.permissions.has('KICK_MEMBERS'))
            {
                let member = messageCreate.mentions.members.first();
                if(!member) return messageCreate.reply("Please mention a valid member of this server");
                if(!member.kickable) return messageCreate.reply("I cannot kick this member!");

                member.kick();
            }
            else
            return messageCreate.reply("No perms + L");
            
        }
        else if(CMD_NAME == 'ban')
        {
            if (messageCreate.member.permissions.has('BAN_MEMBERS')) 
            {
                let member = messageCreate.mentions.members.first();
                if(!member) return messageCreate.reply("Please mention a valid member of this server");
                if(!member.kickable) return messageCreate.reply("I cannot ban this member!");

                member.ban();
                }
                else {
                    messageCreate.reply("no perms to ban" + messageCreate.members.mentions.first());
                }
        }
    }
} )
client.login(process.env.DISCORDJS_BOT_TOKEN)
