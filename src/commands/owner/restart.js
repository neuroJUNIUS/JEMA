const child_process = require('child_process')

module.exports = {
    run:
        async (client, message, args, error) => {
            try {
                message.channel.send("Restarting...")
                child_process.exec('start restart.bat', {cwd: './commands/owner'})   
            } catch(e) {
                return error(e);
            }  
        },
    help: {
        name: "restart",
        description: "Restarts the bot"
    }
}