module.exports = {
    run:
        async (client,message,args, error) => {

            try {
                if(!message.member.permissions.has("BAN_MEMBERS")) {
                    return message.channel.send(":woman_facepalming: Would be great, right?");
                }
    
                
    
                var user = message.mentions.users.first();
    
                if(user === undefined) {
                    return message.channel.send(":woman_facepalming: You have to mention user you want to grant role to...");
                }
    
                if(args[0] == " ") {
                    return message.channel.send(":woman_facepalming: You have to provide roles name first...");
                }
    
                var role = message.member.guild.roles.cache.find(r => 
                    r.name === args[0]);

                if(role) {
                    if(user.manageable || role.editable) {
                        message.guild.members.cache.get(user.id).roles.add(role);
                    } else {
                        return message.channel.send(":woman_facepalming: I don't have enough permission...");
                    }

                } else {
                    message.channel.send(":woman_facepalming: Cannot find given role");
                }
            } catch(e) {
                return error(e);
            }

        },
    help: {
        name:"grantRole",
        description:"Grants given role to user mentioned"
    }
}