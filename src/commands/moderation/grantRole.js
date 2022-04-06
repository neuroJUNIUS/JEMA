module.exports = {
    run:
        async (client,message,args) => {

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
                message.guild.members.cache.get(user.id).roles.add(role);
            } else {
                message.channel.send(":woman_facepalming: Cannot find given role");
            }

        },
    help: {
        name:"grantRole",
        description:"Grants given role to user mentioned"
    }
}