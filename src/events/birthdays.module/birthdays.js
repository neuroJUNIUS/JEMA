const connection = require('../../connection/connection.js');

module.exports = {
    add:
        async (client, member, server, error) => {
            try {
                connection.check("jema_users", "birthdays", {user_id: member.id, user_server: server}, (result) => {
                    if(!result)
                    {
                        var insertion = ({
                            user_id: member,
                            user_server: server,
                            user_joined: Math.floor(Date.now() / 1000)
                        });

                        connection.insert("jema_users", "birthdays", insertion,(e) => {
                            if(e) {
                                return error(e);
                            }
                        });
                    }
                },(e) => {
                    if(e) {
                        return error(e);
                    }
                });
            } catch(e) {
                return error(e);
            }

        },
    check:
        async (member, server, age, error) => {
            try {
                connection.check("jema_users", "birthdays", {user_id: member, user_server: server}, (result) => {
                    if(result)
                    {
                        connection.get("jema_users","birthdays", {user_id: member, user_server: server}, (value) => {
                            var time = Math.floor(Date.now()/1000) - value[0].user_joined;
                            return age(time);
                        },(e) => {
                            if(e) {
                                return error(e);
                            }
                        });
                    } else {
                        var time = 0;
                        return age(time);
                    }
                }, (e) => {
                    if(e) {
                        return error(e);
                    }
                })
            } catch(e) {
                return error(e);
            }
        },
    die: 
        async(member,server, error) => {
            try {
                connection.remove("jema_users", "birthdays", {user_id: member, user_server: server}, (e) => {
                    if(e) {
                        return error(e);
                    }
                })
            } catch(e) {
                return error(e);
            }
        }
}