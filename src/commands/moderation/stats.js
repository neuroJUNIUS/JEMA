const { joinVoiceChannel } = require('@discordjs/voice');
const Discord = require('discord.js');
const mongodb = require('../../connection/connection.js');

module.exports = {
    run:
        async (client, message, args) => {
            const dbname = "jema_servers";
            const collection = "statistics";

            var id = message.guild.id;
            const guild = client.guilds.cache.find((g) => g.id === id);

            if(!guild)
            {
                return message.channel.send(':woman_facepalming: Something is totaly wrong...?');
            }

            var guild_members = 0;
            var guild_bots = 0;

            mongodb.check(dbname,collection, {server_id: id}, (result) => {
                if(result) {
                    return message.channel.send(':woman_facepalming: You already have statistics in your server...');
                } else {
                    guild.members.fetch().then((members) => {
                        members.forEach(member => {
                            if(!member.user.bot) {
                                guild_members++;
                            } else {
                                guild_bots++;
                            }
                        });
                    })
        
                    var member_stats = "Members - ";
                    var bot_stats = "Bots - ";
                    message.channel.send(":grey_question: How do you want to name member statistics? (ex. Members - <member_count>)");
                    const msg_filter = (m) => m.author.id === message.author.id;
        
                  message.channel.awaitMessages({ msg_filter, max: 2}).then(collected => {
                        member_stats = collected.last().content; 
                        console.log(member_stats);
                    }).then(() => {
                        message.reply(':grey_question: How do you want to name bot statistics? (ex. Bots - <bot_count>) ');
                        message.channel.awaitMessages({msg_filter, max:2}).then(collected => {
                            bot_stats = collected.last().content;
                            console.log(bot_stats);
                        }).then(async () => {
        
                            member_stats = member_stats + " " + `${guild_members}`;
                            bot_stats = bot_stats + " " + `${guild_bots}`;
        
                            const members = await message.guild.channels.create(member_stats, {
                                type: "GUILD_VOICE", 
                                permissionOverwrites: [
                                {
                                    id: message.guild.roles.everyone.id,
                                    deny: ['CONNECT']
                                },
                            ],
                            });
        
                            const bots = await message.guild.channels.create(bot_stats, {
                                type: "GUILD_VOICE", 
                                permissionOverwrites: [
                                {
                                    id: message.guild.roles.everyone.id,
                                    deny: ['CONNECT']
                                },
                            ],
                            });
        
                            var value = ({
                                server_id: id,
                                member_chan: members.id,
                                bot_chan: bots.id
                            });
        
                            mongodb.insert(dbname, collection, value, {server_id: id});
                        });
                    });
                }
            });

        },
    help: {
        name:"stats",
        description:"Makes bot to track server stats"
    }
}