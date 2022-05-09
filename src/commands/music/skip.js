const queue = require("./queue/queue.js");

module.exports = {
    run: 
        async (client, message, args, error) => {
            try {
                const channel = message.member.voice.channel;
                if(!channel)
                {
                    return message.channel.send(":woman_facepalming: You need to be in voice channel first");
                }
                queue.skipSong(message, message.guild.id, (e) => {
                    if(e) {
                        return error(e);
                    }
                });
            } catch(e) {
               return error(e);
            }


        },
    help:
    {
        name:"skip",
        description:"Skips current song",
        category:"Music"
    }
}