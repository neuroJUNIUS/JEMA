const mongodb = require('../../connection/connection.js');

module.exports = {
    register:
        async (client, message, error) => {
            try {
                mongodb.check("jema_users", "levels", {user_id: message.author.id}, (result) => {
                    if(!result) {
                        var value = ({
                            user_id: message.author.id,
                            xp:0,
                            level:0
                        });
                        mongodb.insert("jema_users", "levels", value, (e) => {
                            if(e) {
                                return error(e);
                            }
                        });
                    } else {
                        return;
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
    addXp:
        async (client, message, xp, error) => {
            try {
                mongodb.check("jema_users", "levels", {user_id: message.author.id}, (result) => {
                    if(result) {
                        mongodb.get("jema_users","levels", {user_id: message.author.id}, (values) => {
                            var prevXp = values[0].xp
                            var newXp = prevXp + xp;
                            mongodb.increment("jema_users","levels",{user_id:message.author.id},{xp:newXp});
                        }, (e) => {
                            if(e) {
                                return error(e);
                            }
                        });
                    } else {
                        return;
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
    addLevel:
        async (client, message, error) => {
            try {
                mongodb.check("jema_users", "levels", {user_id: message.author.id}, (result) => {
                    if(result) {
                        mongodb.get("jema_users","levels", {user_id: message.author.id}, (values) => {
                            var xp = values[0].xp
                            var level = values[0].level;
                            
                            if(xp >= 2*(level+1)*100)
                            {
                                newLevel = level + 1;
                                mongodb.increment("jema_users","levels",{user_id:message.author.id},{level:newLevel},(e) => {
                                    if(e) {
                                        return error(e);                                     
                                    }

                                });
                                return message.channel.send(`Congratulations, ${message.author}, you have just level-ed up!`);
                            }
                        }, (e) => {
                            if(e) {
                                return error(e);
                            }

                        });
                    } else {
                        return;
                    }
                }, (e) => {
                    if(e) {
                        return error(e);
                    }
                });
            } catch (e) {
                return error(e);
            }
        }
    
}