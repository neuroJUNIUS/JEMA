module.exports = {
    run: 
        async (client, message, args, error) => {
            try {
                if (!args[0])
                {
                    return message.channel.send( `You need to provide specific command` );
                }
    
                let command = args[0].toLowerCase().split(";")[0];
                let category = args[0].toLowerCase().split(";")[1];
    
                try 
                {
                    delete require.cache [ require.resolve( `../${category}/${command}` ) ]; // delete required command from cache
                    client.commands.delete(command); // delete command
                    client.malifunctioned.delete(command);
                    console.log(client.malifunctioned);
                    const pull = require(`../${category}/${command}.js`); // require specific command
                    client.commands.set(command, pull); // set the command
                    return message.channel.send(`:white_check_mark: Command (\`${command.toUpperCase()}\`) was succesfully reloaded`)
                }
                catch(e)
                {
                    return message.channel.send( `:negative_squared_cross_mark: Could not reload: \`${command.toUpperCase()}\` `);
                }
            } catch(e) {
                return error(e);
            }

        },
    help:
    {
        name:"reload",
        description:`Reloads the specific command`,
        category:"Owner"
    }
}