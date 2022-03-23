const { Collection } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer,createAudioResource, AudioPlayer, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const player = createAudioPlayer();

var servers = {};
module.exports = {
    playSong:
        async (message, channel, guild, adapter, song) => {

            if(!servers[guild])
            {
                servers[guild] = {
                    queue:[],
                    song_name:[],
                    status:[]
                };
            }

            var server = servers[guild];
            server.queue.push(song.url);
            server.song_name.push(song.title);

            if(server.status.length > 0)
            {
                server.status.push(false);
            }
            else
            {
                server.status.push(true);
            }

            const connection = joinVoiceChannel({
                channelId: channel,
                guildId: guild,
                adapterCreator: adapter
            });

            const stream = ytdl(server.queue[0], {filter: `audioonly`});
            const resource = createAudioResource(stream);

            if(server.status[0] == true)
            {
                await player.play(resource);
                connection.subscribe(player);
            }
            server.status[0] = false;
            skip = false;
            player.on(AudioPlayerStatus.Idle, async () => {
                if (skip == false) {
                    skip = true;
                    module.exports.skipSong(message,guild);
                } 
            })
        },
    skipSong:
        async (message, guild) => {
            const connection = getVoiceConnection(guild);
            if(servers[guild].queue.length == 1)
            {
                servers[guild].queue.shift();
                servers[guild].song_name.shift();
                servers[guild].status.shift();
                message.channel.send(`:microphone2: Queue is empty, disconnecting...`)
                connection.destroy();
            }
            else
            {
                if(servers[guild].queue.length == 0)
                {
                    message.channel.send(`:woman_facepalming: Nothing to skip`);
                }
                else
                {
                    servers[guild].queue.shift();
                    servers[guild].song_name.shift();
                    servers[guild].status.shift();
                    const stream = ytdl(servers[guild].queue[0].toString(), {filter: `audioonly`});
                    message.channel.send(`:notes: Now playing \`${servers[guild].song_name[0]}\``);
                    const resource = createAudioResource(stream);
                    await player.play(resource);
                    connection.subscribe(player);
                    skip = false;
                    player.on(AudioPlayerStatus.Idle, async () => {
                        if (skip == false) {
                            skip = true;
                            module.exports.skipSong(message,guild);
                        } 
                    })
                }
            }

        },
}

