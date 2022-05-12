const {MessageEmbed} = require('discord.js');

module.exports = {
    run:
        async (client,message,args, error) => {
            try {

                let musicCommands = `:musical_note: **Music** commands: \n`;
                let triviaCommands = `\n :video_game: **Trivia** commands: \n`;
                let moderationCommands = ` \n :eyes: **Moderation** comamnds: \n`;
                let ownerCommands = `\n :hammer: **Owner** commands: \n`;
                let malifunctionedCommands = `\n :x: **Malifunctioned** commands \n`;
                let description;
                
                client.commands.forEach((entry) => {
                    if(entry.help.category) {
                        if(entry.help.category == "Music") {
                            musicCommands += `\`${entry.help.name}\` - ${entry.help.description} \n`;
                        }
                        if(entry.help.category == "Trivia") {
                            triviaCommands += `\`${entry.help.name}\` - ${entry.help.description} \n`;
                        }
                        if(entry.help.category == "Moderation") {

                            moderationCommands += `\`${entry.help.name}\` - ${entry.help.description} \n`;
                        }
                        if(entry.help.category == "Owner") {
                            ownerCommands += `\`${entry.help.name}\` - ${entry.help.description} \n`;
                        }
                    }

                });
                if(client.malifunctioned.size == 0) {
                    malifunctionedCommands += `\`Every command is currently marked as working\``;
                } else {
                    client.malifunctioned.forEach((entry) => {
                        malifunctionedCommands += ` \`${entry.help.name}\` - ${entry.help.description} :disappointed_relieved:\n`;
                    })
                }
                description = musicCommands + triviaCommands + moderationCommands + ownerCommands + malifunctionedCommands;
                let helpResult = new MessageEmbed().setTitle(`JEMA command list:`).setDescription(description).setThumbnail(`https://icons-for-free.com/download-icon-data+help+info+information+service+support+icon-1320086104445890290_512.png`).setTimestamp().setFooter(`jema help`);
                message.channel.send({embeds: [helpResult]});
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"help",
        description:"Displays every command with description"
    }
}