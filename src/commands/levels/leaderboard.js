const mongodb = require('../../connection/connection')
const {MessageEmbed} = require('discord.js')

module.exports = {
    run:
        async (client, message, channel) => {     
            mongodb.Levels.fetchLeaderboard(message.guildId, 10)
                .then(result => {
                    if (result.length < 1) {
                        return reply("Nobody's in the leaderboard yet.")
                    } else {
                        const leaderboard = mongodb.Levels.computeLeaderboard(client, result)
                            .then(lb => {
                                const finalResult = lb.map(e => `**${e.position}. ${e.username}#${e.discriminator}**\n` + `Level: ${e.level}\nXP: ${e.xp.toLocaleString()}`) 

                                const embed = new MessageEmbed()
                                    .setColor("RANDOM")
                                    .setTitle("Leaderboard")
                                    .setDescription(finalResult.join('\n'))
                                message.channel.send({embeds: [embed]})
                            })
                       // const lb = Promise.all(leaderboard)
                       //     .then(map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`))
                        //const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`)
                       // console.log(lb)
                       // message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`)
                    }
                })         
        },
    help: {
        name: "leaderboard",
        description: "Shows your current level"
    }
}