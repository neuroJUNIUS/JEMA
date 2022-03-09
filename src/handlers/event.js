const { Console } = require("console");
const {readdirSync} = require("fs");

module.exports = (client) => {
    const events = readdirSync(`./events/`).filter(d => d.endsWith('.js'));
    for(let file of events)
    {
        const evt = require(`../events/${file}`);
        let eName = file.split(".")[0];
        console.log(eName)
        client.on(eName, evt.bind(null, client));
    }
}