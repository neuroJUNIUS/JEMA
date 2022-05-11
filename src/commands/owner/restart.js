const child_process = require('child_process')

module.exports = {
    run:
        async (channel, message) => {     
            message.channel.send("Restarting...")
            child_process.exec('start restart.bat', {cwd: './commands/owner'})                        
        },
    help: {
        name: "restart",
        description: "Restarts the bot"
    }
}