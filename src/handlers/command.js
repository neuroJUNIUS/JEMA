const {readdirSync} = require("fs");

module.exports = (client) => {

    const load = dirs => {

        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        
        for (let file of commands) {
            let pull = require(`../commands/${dirs}/${file}`);
            client.commands.set(pull.help.name, pull);
          };
        };

        ["moderation","owner", "music"].forEach(x => load(x));
};