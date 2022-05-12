module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                if (message.member.permissions.has("ADMINISTRATOR"))
                {
                    let text = message.content;
					const array = text.split(" ");

                    if(array[2]<2)
                    {
                        return message.reply("The amount of messages for it to be considered spam can't be less than 2");
                    }
                    else
                    {
                        spamAmount=array[2];
                        return message.reply(`The amount of same messages allowed: ${spamAmount}`);
                    }
                }
                else
                    return message("No perms + L");
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"spamChange",
        description:"Changes the amount of same messages for it to be considered spam"
    }
}