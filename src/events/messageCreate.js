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

        const illegal_words = ["pavyzdys", "blogaszodis"];
        let channel = message.channel; 
        channel.messages.fetch({limit: 5 }).then(messages => {
        let notsame = 1;
        let arr = [];
        for(let [key, value] of messages)
            {
                arr.push(value);
            }
            let text = message.content;
            const splitMessage = text.split(/[ &()_+-={};':",.<>?@\r?\n]/);
        for (let i = 0; i < illegal_words.length; i++)
            {
            if(splitMessage.includes(illegal_words[i]))
            {
                message.channel.bulkDelete(1);
            }
        }   
        
        for(let i = 1; i < 5; i++)
        {
            if(arr[i-1].content != arr[i].content || arr[i-1].author != arr[i].author)
            {
                notsame = 0;

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

        
        })
        return;
     }
     else
     {
	 if(cmdfile && args == "help")
		{
			message.reply(cmdfile.help.name + ": " + cmdfile.help.description);
		}
		else if(!cmdfile && args == "help")
		{
			message.reply("entered command does not exist");
		}
         else if(cmdfile)
         {
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
		 else
		 {
			 message.reply("entered command does not exist");
		 }
     }
 }

