let arr = [];
spamAmount= 5;

module.exports = {
    check:
        async (client, message, error) =>
        {
            try
            {
                let channel = message.channel;
                let checked = 0;
                let notsame = 1;
                let last = "";
                channel.messages.fetch({limit: spamAmount }).then((messages) => {
                        for(let [key, value] of messages)
                        {
                                
                            if(last === "")
                                {
                                    last = value.content;
                                }
                                else
                                {
                                    if(last != value.content)
                                    {
                                        notsame = 0;
                                        break;
                                    }
                                }
                        }
                            if(notsame == 1)
                            {
                                let member = message.member;
                                if(member.manageable && !message.member.permissions.has("ADMINISTRATOR"))
                                member.timeout(5*60*1000);

                                message.channel.bulkDelete(spamAmount).then(() => {
                                message.channel.send(`:rage: No spam <@${message.author.id}>`);
                        });
                            }
                    }).catch(e => {
                    console.log(`Error: ${e}`);
                    });
            }catch(e) {
                return error(e);
            }
        }
}