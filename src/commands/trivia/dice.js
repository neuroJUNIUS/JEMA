const dices = require("./dice.json");
const {MessageEmbed} = require('discord.js');
const xp_system = require('../../events/xp-system.module/xp-system.js');

module.exports = {
    run:
        async (client,message,args, error) => {
            try {

                if(!args[0]) {
                    return message.channel.send(`:woman_facepalming: You need to make a guess`);
                }
                if(args[0] < 0 || args[0] > 6) {
                    return message.channel.send(`:woman_facepalming: There is no ${args[0]} number on the dice?` );
                }

                let random = Math.floor(Math.random() * 6);

                let correct = dices[random].d;
                let embed = new MessageEmbed().setColor("RANDOM").setDescription("Rolling the dice...").setImage(`${dices[random].gif}`).setTimestamp();                message.channel.send({embeds: [embed]})
                .then((msg) => {
                    setTimeout( () => {
                        msg.delete(4400);
                    }, 4400);
                }).catch((e) => {
                    return error(e);
                }).then( () => {
                    setTimeout( () => {
                        if(args[0] == correct) {
                            return message.channel.send(`:earth_africa: Congratulations ${message.author}, your guess was correct!`);
                        } else {
                            return message.channel.send(`:disappointed_relieved: Bad luck, ${message.author}, your guess was wrong...`);
                        }
                    }, 5000);
                });
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"dice",
        description:"Roll the dice!",
        category:"Trivia"
    }
}