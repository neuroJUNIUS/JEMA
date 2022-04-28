const mongodb = require('../connection/connection.js');

module.exports = async (client, member) => {
    try {
        var id = member.guild.id;
        mongodb.check('jema_servers', 'statistics', {server_id : id}, (result) => {
            if(result) {
                mongodb.get('jema_servers', 'statistics', {server_id: id}, (value) => {
                    var member_channel = value[0].member_chan;
                    var bot_channel = value[0].bot_chan;
    
                    if(member == member.user.bot) {
                        client.channels.fetch(bot_channel).then( (channel) => {
                            var temp = channel.name.split(' ');
                            temp[temp.length-1] = `${parseInt(temp[temp.length-1]) + 1}`;
                            var newName = temp.join(" ");
                            client.channels.cache.find((c) => c.id == member_channel).setName(newName);
    
                        }).catch(e => {
                            `Error: ${e}`;
                        });
                    } else {
                        client.channels.fetch(member_channel).then( (channel) => {
                            var temp = channel.name.split(' ');
                            temp[temp.length-1] = `${parseInt(temp[temp.length-1]) + 1}`;
                            var newName = temp.join(" ");
                            client.channels.cache.find((c) => c.id == member_channel).setName(newName);
                        }).catch(e => {
                            console.log(`Error: ${e}`);
                        });
                    }
                });
            }
        });
    } catch(e) {
        console.log(`❌ GuildMemberAdd event doesn't work...`);
    }

}