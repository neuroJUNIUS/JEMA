module.exports = {
    run:
        async (client,message,args) => {
            return message.channel.send("Ir vel Pong");
        },
    help: {
        name:"ping",
        description:"Kicks user from the server"
    }
}