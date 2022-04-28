module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                if (message.member.permissions.has('BAN_MEMBERS')) 
                {
                    let member = message.mentions.members.first();
                    if(!member) return message.reply("Please mention a valid member of this server");
                    if(!member.kickable) return message.reply("I cannot ban this member!");
    
                    member.ban();
                }
                else {
                    message.reply("no perms to ban" + message.mentions.members.first());
                }
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"ban",
        description:"Bans user from the server"
    }
}