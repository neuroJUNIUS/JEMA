module.exports = {
    run:
        async (channel, message, args, error) => {
            try {
                if(!args[0] || args[0].split(";").length != 2)
                {
                    return message.channel.send("Incorrect argument count")
                }
    
                try
                {
                    await message.channel.messages.fetch(args[0].toLowerCase().split(";")[0]) 
                }
                catch
                {
                    return message.channel.send("That message ID doesn't exist")
                }
                const msg = message.channel.messages.fetch(args[0].toLowerCase().split(";")[0]) 
    
                const timeLimit = args[0].toLowerCase().split(";")[1]
                if(isNaN(timeLimit))
                {
                    return message.channel.send("Incorrect time format")
                }
    
                msg
                    .then(m=>m.awaitReactions({time: timeLimit})
                        .then(collected => collected
                            .forEach(reaction => 
                                message.channel.send(reaction._emoji.name + " " + reaction.count))))
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name: "getReactions",
        description: "Gets counts and names of reactions on some message"
    }
}