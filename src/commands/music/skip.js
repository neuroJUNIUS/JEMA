const queue = require("./queue/queue.js");

module.exports = {
    run: 
        async (client, message, args) => {
            const channel = message.member.voice.channel;
            if(!channel)
            {
                return message.channel.send(":woman_facepalming: You need to be in voice channel first");
            }
            queue.skipSong(message, message.guild.id);

        },
    help:
    {
        name:"skip",
        description:"Skips current song"
    }
}