const anti_spam = require('./anti-spam.module/spam-protection.js');
const anti_swears = require('./bad-word.module/bad-word.js');
const Discord  = require('discord.js');

module.exports = async(client, message) =>
{
    const [cmd, ...args] = message.content
    .trim()
    .substring(5)
    .split(/\s+/);

    let cmdfile = client.commands.get(cmd);
     if(message.author.bot) return;

     if(!message.content.startsWith("jema"))
     {
        anti_swears.check(client, message, (error) => {
            if(error) {
                console.log(`❌ There was an error with anti-swear word module...`);
            }
        });
        anti_spam.check(client, message, (error) => {
                if(error) {
                    console.log(`❌ There was an error with anti-spam module...`);
                }
            });
     } else {
        console.log(client.malifunctioned);
        if(client.malifunctioned.get(cmd)) {
            message.channel.send({
                content:`:pray: Command ${cmd} malifunctioned... Our team is working on a fix...`,
                files: [
                    'https://c.tenor.com/UzSDY8jEnw4AAAAC/are-we-there-yet-simpsons.gif'
                ]
            });
        }
        if(cmdfile) {
            cmdfile.run(client, message, args, (error) => {
                if(error) {
                    console.log(`❌ ${cmdfile.help.name} doesn't work! Turning this command off...`);
                    console.log(`Error ${error}`);
                    client.commands.delete(cmd);
                    message.channel.send(`:pray: This command malifunctioned... Turning it off...`);
                    client.malifunctioned.set(cmdfile.help.name, cmdfile);
                }
            });    
        }
    }
}