const child_process = require('child_process')

module.exports = {
    run:
        async (channel, message) => {     
            message.channel.send("Killing...")
            child_process.exec('start kill.bat', {cwd: './commands/owner'})                        
        },
    help: {
        name: "kill",
        description: "Kills the bot"
    }
}