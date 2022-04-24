const {MessageEmbed, Options} = require("discord.js")
const isEmote = (str) => str.match(/<a?:.+?:\d{18}>|\p{Extended_Pictographic}/gu);

module.exports = {
    run:
        async (channel, message, args) => {     
            let arguments = args.join(' ').split(';')
            if(!args[0] || arguments.length < 2 || arguments.length % 2 != 0)
            {
                return message.channel.send("Incorrect argument count")
            }
            console.log(arguments)
            const description = arguments[0]
            const timeLimit = arguments[1]
            if(isNaN(timeLimit) || !arguments[1])
            {
                return message.channel.send("Incorrect time format")
            }
            let [options, emotes] = splitArgs(arguments)
            const areEmotes = 
                emotes.every(function(emote) {
                    return isEmote(emote)
                })
            if(!areEmotes) {
                return message.channel.send("Not following the option;emote format")
            }
            
            let date = Date.now()
            date = new Date(date + Number(timeLimit)).toLocaleString("lt-LT")
            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Poll")
                .setDescription(description + "\n" + argsToString([options, emotes]))
                .setFooter("Poll started by: " + message.author.username + "#" + message.author.discriminator + "\n" +
                            "Poll ends in " + date)

            await message.channel.send({embeds: [embed]})
                .then(m=>m.awaitReactions({time: timeLimit})
                    .then(collected => {
                        message.channel.send("Poll " + description + " results:\n")
                        collected
                            .forEach(reaction => {
                                if(emotes.includes(reaction._emoji.name)) {   
                                    message.channel.send(reaction._emoji.name + " " + reaction.count
                                )}
                        })}))
                        
        },
    help: {
        name: "poll",
        description: "Creates a poll"
    }
}

function splitArgs(arguments) {
    var options  = [],
        emotes = [];
    for(var i = 2; i < arguments.length; i++) {
        (i % 2 == 0 ? options : emotes).push((i % 2 == 0 ? arguments[i] : arguments[i].trim()));
    }
        
    return [options, emotes];
}

function argsToString([options, emotes]) {
    var text = ""
    for(var i = 0; i < options.length; i++) {
        text += emotes[i] + ": " + options[i] + "\n"
    }
    return text
}