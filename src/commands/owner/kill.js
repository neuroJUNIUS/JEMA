const child_process = require('child_process')

module.exports = {
    run:

        async (client, message, args, error) => {     
            try {
                message.channel.send("Killing...")
                child_process.exec('start kill.bat', {cwd: './commands/owner'})     
            } catch(e) {
                return error(e);
            }
                   
        },
    help: {
        name: "kill",
        description: "Kills the bot"
    }
}