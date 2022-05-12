const anti_spam = require('./anti-spam.module/spam-protection.js');
const anti_swears = require('./bad-word.module/bad-word.js');
const xp_system = require('./xp-system.module/xp-system.js');
const Discord  = require('discord.js');
const mongodb = require('../connection/connection.js');

module.exports = async(client, message) => {
    const [cmd, ...args] = message.content
    .trim()
    .substring(5)
    .split(/\s+/);

    let cmdfile = client.commands.get(cmd);
    if(message.author.bot) return;



    try {
        const dbname = "jema_servers";
        const collection = "levels";
        const id = message.author.id;
        const guild_id = message.guild.id;

        mongodb.check(dbname, collection, {author_id: id}, (result) => {
            if(result) {
                mongodb.get(dbname, collection, {author_id: id}, (xp) => {
                    mongodb.insert(dbname, collection, xp + 100, {author_id: id, guild_id: guild_id})
                })
            } else {
                mongodb.insert(dbname, collection, 100, {author_id: id, guild_id: guild_id});
            }
        });
    } catch(e) {
        return error(e);
    }
    const dbname = "jema_servers";
    const collection = "levels";
    mongodb.addXP(dbname, collection, message)

   /* try {
        xp_system.addXp(client,message,1, (error) => {
            if(error) {
                console.log(`❌There was an error with xp system!`);
            }
        });
        xp_system.addLevel(client,message, (error) => {
            if(error) {
                console.log(`❌There was an error with xp system!`);
            }

        });
    } catch(e) {
        console.log(`❌There was an error with xp system!`);
    }*/



     if(!message.content.startsWith("jema"))
     {
        try {
            anti_swears.check(client, message, (error) => {
                if(error) {
                    console.log(`❌ There was an error with anti-swear word module...`);
                }
            });            
        } catch {
            console.log(`❌ There was an error with anti-swear word module...`);
        }

        try {
            anti_spam.check(client, message, (error) => {
                if(error) {
                    console.log(`❌ There was an error with anti-spam module...`);
                }
            });
        } catch {
            console.log(`❌ There was an error with anti-spam module...`);         
        }

     } else {

        /*try {
            xp_system.register(client, message, (error) => {
                if(error) {
                    console.log(`❌There was an error with xp system!`);
                }
            });
        } catch(e) {
            console.log(`❌There was an error with xp system!`);

        }*/


        if(client.malifunctioned.get(cmd)) {
            message.channel.send({
                content:`:pray: Command ${cmd} malifunctioned... Our team is working on a fix...`,
                files: [
                    'https://c.tenor.com/UzSDY8jEnw4AAAAC/are-we-there-yet-simpsons.gif'
                ]
            });
        }
	    if(cmdfile && args == "help") {
			message.reply(cmdfile.help.name + ": " + cmdfile.help.description);
		}
		else if(!cmdfile && args == "help") {
			message.reply("entered command does not exist");
		}
        else if(cmdfile) {
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
		 else {
			message.reply("entered command does not exist");
		}
     }
 }