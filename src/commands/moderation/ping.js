module.exports = {
    run:
        async (client,message,args) => {
            return message.channel.send("Pong");
        },
    help: {
        name:"ping",
        description:"Ping pong"
    }
}