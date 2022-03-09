const { joinVoiceChannel, createAudioPlayer,createAudioResource } = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const fs = require("fs");
const search = require("yt-search");

module.exports = {
    run: 
        async (client, message, args) => {

            const channel = message.member.voice.channel;

            if(!channel) {
                return message.channel.send(":woman_facepalming: You need to be in voice channel first");
            }

            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })

            const videoSearch = async (q) => {
                const result = await search(q);
                return result.videos.length > 1 ? result.videos[0] : null;
            }

            const video = await videoSearch(args.join("").toString());

            if(video) {
                const stream = ytdl(video.url.toString(), {filter: `audioonly`});
                const player = createAudioPlayer();
                const resource = createAudioResource(stream);
                play();
    
                async function play() {
                    await player.play(resource);
                    connection.subscribe(player);                
                }

                await message.channel.send(`Now playing *${video.title}*`);
            }
            else {
                message.channel.send(`Nothing found`);
            }


        },
    help:
    {
        name:"play",
        description:":microphone2: Plays music from youtube"
    }
}