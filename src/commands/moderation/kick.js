module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                if (message.member.permissions.has('KICK_MEMBERS'))
                {
                    let member = message.mentions.members.first();
                    if(!member) return message.reply("Please mention a valid member of this server");
                    if(!member.kickable) return message("I cannot kick this member!");
    
                    member.kick();
                }
                else
                    return message("No perms + L");
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"kick",
        description:"Kicks user from the server"
    }
}