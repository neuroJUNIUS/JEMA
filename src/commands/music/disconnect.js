const { getVoiceConnection, destroy } = require('@discordjs/voice');

module.exports = {
    run: 
        async (client, message, args, error) => {
            try {
                const channel = message.member.voice.channel;

                if(!channel) {
                    return message.channel.send(":woman_facepalming: You need to be in voice channel first");
                }
    
                const connection = getVoiceConnection(channel.guild.id);
                connection.destroy();
            } catch(e) {
               return error(e);
            }
        },
    help:
    {
        name:"disconnect",
        description:"Disconnects from voice channel"
    }
}