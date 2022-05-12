const mongodb = require('../../connection/connection')

module.exports = {
    run:
        async (channel, message) => {     
            const target = message.mentions.users.first() || message.author; 
            mongodb.Levels.fetch(target.id, message.guild.id)
                .then(result => {
                    if(!result) {
                        return message.channel.send("Seems like this user has not earned any xp so far.");
                    } else {
                        message.channel.send(`> **${target.tag}** is currently level ${result.level}.`);
                    }
                })                    
        },
    help: {
        name: "rank",
        description: "Shows your current level"
    }
}