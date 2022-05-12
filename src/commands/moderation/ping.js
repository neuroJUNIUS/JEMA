module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                return message.channel.send("Pong");
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"ping",
        description:"Ping pong",
        category:"Moderation"
    }
}