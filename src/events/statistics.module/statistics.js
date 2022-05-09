const mongodb = require('../../connection/connection.js');

module.exports = {
    increment:
        async (member, client, id, error) => {
            try {
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
                                    client.channels.cache.find((c) => c.id == bot_channel).setName(newName).catch((e) => {return error(e)});
            
                                }).catch(e => {
                                    return error(error);
                                });
                            } else {
                                client.channels.fetch(member_channel).then( (channel) => {
                                    var temp = channel.name.split(' ');
                                    temp[temp.length-1] = `${parseInt(temp[temp.length-1]) + 1}`;
                                    var newName = temp.join(" ");
                                    client.channels.cache.find((c) => c.id == member_channel).setName(newName).catch(e => {return error(e)});
                                }).catch(e => {
                                    return error(e);
                                });
                            }
                        });
                    }
                }, (e) => {
                    if(e) {
                        return error(e);
                    }
                });
            } catch (e) {
                return error(e);
            }
        },
    decrement:
        async (member, client, id, error) => {
            mongodb.check('jema_servers', 'statistics', {server_id : id}, (result) => {
                if(result) {
                    mongodb.get('jema_servers', 'statistics', {server_id: id}, (value) => {
                        var member_channel = value[0].member_chan;
                        var bot_channel = value[0].bot_chan;
        
                        if(member == member.user.bot) {
                            try {
                                client.channels.fetch(bot_channel).then( (channel) => {
                                    var temp = channel.name.split(' ');
                                    temp[temp.length-1] = `${parseInt(temp[temp.length-1]) - 1}`;
                                    var newName = temp.join(" ");
                                    client.channels.cache.find((c) => c.id == bot_channel).setName(newName).catch(e =>  {return error(e)} );
                            });
                            } catch(e) {
                                return error(e);
                            }
                        } else {
                            client.channels.fetch(member_channel).then( (channel) => {
                                try {
                                    var temp = channel.name.split(' ');
                                    temp[temp.length-1] = `${parseInt(temp[temp.length-1]) - 1}`;
                                    var newName = temp.join(" ");
                                    client.channels.cache.find((c) => c.id == member_channel).setName(newName).catch(e => { return error(e)});
                                } catch (e) {
                                    return error(e);
                                }
    
                            });
                        }
                    },(e) => {
                        if(e) {
                            return error(e);
                        }
                    });
                }
            }, (e) => {
                if(e) {
                    return error(e);
                }
            });
    
        }
}