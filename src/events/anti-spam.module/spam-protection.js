
let arr = [];

module.exports = {
    check:
        async (client, message, error) => {
            try {
                let channel = message.channel; 
                channel.messages.fetch({limit: 5 }).then((messages) => {
                    let notsame = 1;
            
                    for(let [key, value] of messages) {
                        arr.push(value);
                    }
                    
                    for(let i = 1; i < 5; i++) {
                        if(arr[i-1].content != arr[i].content || arr[i-1].author != arr[i].author) {
                            notsame = 0;
                        }
                    }

                    if(notsame == 1) {
                        let member = message.member;
                        if(member.manageable && !message.member.permissions.has("ADMINISTRATOR"))
                            member.timeout(5000);

                        message.channel.bulkDelete(5).then(() => {
                            message.channel.send(`:rage: No spam <@${message.author.id}>`);
                        });
                    }
                }).catch(e => {
                    return error(e);
                });
            } catch(e) {
                return error(e);
            }

        }
        
}