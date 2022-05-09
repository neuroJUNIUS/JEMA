const search = require("yt-search");
const queue = require("./queue/queue.js");

module.exports = {
    run: 
        async (client, message, args, error) => {
            try {
                if(!args[0]) {
                    return message.channel.send(":woman_facepalming: You need to provide a song name first...");
                }
                const channel = message.member.voice.channel;
                var server_id = message.guild.id;
    
                if(!channel) {
                    return message.channel.send(":woman_facepalming: You need to be in voice channel first");
                }
    
                const videoSearch = async (q) => {
                    const result = await search(q);
                    return result.videos.length > 1 ? result.videos[0] : null;
                }
    
                const video = await videoSearch(args.join("").toString());
               
                if(video != null) {
                    await message.channel.send(`:musical_note:  \`${video.title}\` was added to queue`);
                    await queue.playSong(message, channel.id, server_id,message.guild.voiceAdapterCreator, video, (e) => {
                        if(e) {
                            return error(e);
                        }
                    });
                }
                else {
                    message.channel.send(`:woman_facepalming: Nothing found`);
                }
            } catch(e) {
                return error(e);
            }


        },
    help:
    {
        name:"play",
        description:"Plays music from youtube",
        category:"Music"
    }
}