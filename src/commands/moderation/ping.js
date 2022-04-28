module.exports = {
    run:
        async (client,message,args, error) => {
            try {
                return message.send("Pong");
            } catch(e) {
                return error(e);
            }
        },
    help: {
        name:"ping",
        description:"Ping pong"
    }
}