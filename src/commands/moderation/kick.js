module.exports = {
    run:
        async (client,message,args) => {
            if (message.member.permissions.has('KICK_MEMBERS'))
            {
                let member = message.mentions.members.first();
                if(!member) return message.reply("Please mention a valid member of this server");
                if(!member.kickable) return message.reply("I cannot kick this member!");

                member.kick();
            }
            else
            return message.reply("No perms + L");
        },
    help: {
        name:"kick",
        description:"Kicks user from the server"
    }
}